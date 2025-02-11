"use client";

import { useEffect, useState } from "react";

import Button from "@/components/button/button";
import MovieList from "@/components/movie-list/movie-list";
import { useSearchMoviesWithCredits } from "@/context/movies/application";
import { MovieWithCredits } from "@/context/movies/domain";
import { useDebouncedValue } from "@/utils/hooks";
import { useAppDispatch, useAppSelector } from "@/utils/react-redux";
import { setIsLoading } from "@/utils/react-redux/features/moviesSearchSlice";

import styles from "./search.module.css";

export default function Search() {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.moviesSearch.searchValue);

  const query = useDebouncedValue(searchValue, 300);

  const [cachedMovies, setCachedMovies] = useState<Array<MovieWithCredits>>([]);
  const [lastQuery, setLastQuery] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data, isError, isLoading, refetch } = useSearchMoviesWithCredits({
    query,
    page,
  });

  const maxPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) =>
    setPage(Math.min(Math.max(newPage, 1), maxPages));

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (query !== lastQuery) {
      setLastQuery(query);
      setCachedMovies([]);
    }
  }, [lastQuery, query]);

  useEffect(() => {
    if (!data?.movies) return;

    setCachedMovies((prev) => {
      const cachedMap = new Map(prev.map((movie) => [movie.id, movie]));
      let hasChanges = false;

      const updatedMovies = [...prev];

      data.movies.forEach((movie) => {
        const existingMovie = cachedMap.get(movie.id);

        if (!existingMovie) {
          updatedMovies.push({ ...movie, credits: movie.credits || undefined });
          hasChanges = true;
        } else if (!existingMovie.credits && movie.credits) {
          const index = updatedMovies.findIndex((m) => m.id === movie.id);
          updatedMovies[index] = { ...existingMovie, credits: movie.credits };
          hasChanges = true;
        }
      });

      return hasChanges ? updatedMovies : prev;
    });
  }, [data?.movies]);

  const showMoreResults = !!cachedMovies.length && page !== maxPages;

  return (
    <div className={styles.page}>
      {isError && (
        <div>
          <p>Error fetching data. Please try again later.</p>
          <button onClick={() => refetch()}>Retry</button>
        </div>
      )}

      <div className={styles.list}>
        <MovieList movies={cachedMovies} query={query} />
        {showMoreResults && (
          <div className={styles.showMore}>
            <Button
              label={"Show more results"}
              onClick={() => handlePageChange(page + 1)}
              disabled={isLoading}
              size="large"
            />
          </div>
        )}
      </div>
    </div>
  );
}
