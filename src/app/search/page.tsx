"use client";

import { ChangeEvent, useEffect, useState } from "react";

import MovieList from "@/components/movie-list/movie-list";
import { useSearchMovies } from "@/context/movies/application";
import { useDebouncedValue } from "@/utils/hooks";

export default function Search() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const { data, isError, isLoading, refetch } = useSearchMovies({
    query: debouncedQuery,
    page,
  });

  const maxPages = data?.totalPages || 1;

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handlePageChange = (newPage: number) =>
    setPage(Math.min(Math.max(newPage, 1), maxPages));

  return (
    <div>
      <div>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={handleInputChange}
          placeholder="Search here..."
        />
      </div>

      {isLoading && <div>Loading...</div>}

      {isError && (
        <div>
          <p>Error fetching data. Please try again later.</p>
          <button onClick={() => refetch()}>Retry</button>
        </div>
      )}

      {data && (
        <>
          <MovieList movies={data.movies} />
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
