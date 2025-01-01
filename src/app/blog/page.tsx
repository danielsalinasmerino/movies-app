"use client";

import { ChangeEvent, useState } from "react";

import { useSearchMovies } from "@/context/movies/application";
import { MovieResult } from "@/context/movies/domain";
import { useDebouncedValue } from "@/utils/hooks";

const MovieTable = ({ results }: { results: Array<MovieResult> }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Original Title</th>
      </tr>
    </thead>
    <tbody>
      {results.map((result) => (
        <tr key={result.id}>
          <td>{result.title}</td>
          <td>{result.original_title}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default function Blog() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const { data, isError, isLoading, refetch } = useSearchMovies({
    query: debouncedQuery,
    page,
  });

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

      {data && <MovieTable results={data.results} />}

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
