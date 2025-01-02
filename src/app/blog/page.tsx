"use client";

import { ChangeEvent, useEffect, useState } from "react";

import MovieList from "@/components/movie-list/movie-list";
import { useSearchMovies } from "@/context/movies/application";
import { useDebouncedValue } from "@/utils/hooks";

export default function Blog() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const { data, isError, isLoading, refetch } = useSearchMovies({
    query: debouncedQuery,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleNextPage = () => setPage((prev) => prev + 1);

  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <input
        type="text"
        id="query"
        name="query"
        value={query}
        onChange={handleOnChange}
        placeholder="Search here..."
      />

      {isLoading && <div>Loading...</div>}

      {isError && (
        <div>
          Error fetching data. Please try again later.
          <button onClick={() => refetch()}>Retry</button>
        </div>
      )}

      {data && <MovieList movies={data.movies} />}

      <div>
        <button onClick={handlePreviousPage} disabled={page === 1 || isLoading}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={isLoading}>
          Next Page
        </button>
      </div>
    </div>
  );
}
