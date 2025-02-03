"use client";

import isEqual from "lodash/isEqual";
import { useEffect, useState } from "react";

import MovieList from "@/components/movie-list/movie-list";
import { useSearchMoviesWithCredits } from "@/context/movies/application";
import { MovieWithCredits } from "@/context/movies/domain";
import { useDebouncedValue } from "@/utils/hooks";
import { useAppDispatch, useAppSelector } from "@/utils/react-redux";
import { setIsLoading } from "@/utils/react-redux/features/moviesSearchSlice";

import styles from "./page.module.css";

export default function Home() {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.moviesSearch.searchValue);

  const query = useDebouncedValue(searchValue, 300);

  const [page, setPage] = useState(1);
  const [cachedMovies, setCachedMovies] = useState<Array<MovieWithCredits>>([]);

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
    if (data?.movies && !isEqual(data.movies, cachedMovies)) {
      setCachedMovies(data.movies);
    }
  }, [cachedMovies, data, setCachedMovies]);

  return (
    <div className={styles.page}>
      {isError && (
        <div>
          <p>Error fetching data. Please try again later.</p>
          <button onClick={() => refetch()}>Retry</button>
        </div>
      )}

      <>
        <MovieList movies={cachedMovies} query={query} />
        {!!cachedMovies.length && (
          <div className={styles.pager}>
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1 || isLoading}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || isLoading}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === maxPages || isLoading}
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(maxPages)}
              disabled={page === maxPages || isLoading}
            >
              Last
            </button>
          </div>
        )}
      </>
    </div>
  );
}
