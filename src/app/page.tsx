"use client";

import { useEffect, useState } from "react";

import MovieList from "@/components/movie-list/movie-list";
import { useSearchMoviesWithCredits } from "@/context/movies/application";
import { useDebouncedValue } from "@/utils/hooks";
import { useAppDispatch, useAppSelector } from "@/utils/react-redux";
import { setIsLoading } from "@/utils/react-redux/features/moviesSearchSlice";

import styles from "./page.module.css";

export default function Home() {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.moviesSearch.searchValue);

  const query = useDebouncedValue(searchValue, 300);

  const [page, setPage] = useState(1);

  const { data, isError, isLoading, refetch } = useSearchMoviesWithCredits({
    query,
    page,
  });

  const maxPages = data?.totalPages || 1;

  useEffect(() => {
    setPage(1);
  }, [query]);

  const handlePageChange = (newPage: number) =>
    setPage(Math.min(Math.max(newPage, 1), maxPages));

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  return (
    <div className={styles.page}>
      {isError && (
        <div>
          <p>Error fetching data. Please try again later.</p>
          <button onClick={() => refetch()}>Retry</button>
        </div>
      )}

      {data && (
        <>
          <MovieList movies={data.movies} query={query} />
          <div>
            <p>
              Page {page} of {maxPages}
            </p>
            <div>
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
          </div>
        </>
      )}
    </div>
  );
}
