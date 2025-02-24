"use client";

import Button from "@/components/button/button";
import MovieList from "@/components/movie-list/movie-list";
import { useDebouncedValue } from "@/utils/hooks";
import { useI18Translation } from "@/utils/i18next";
import { useRouteId } from "@/utils/navigation";

import { usePaginatedMovies } from "./hooks/usePaginatedMovies";
import styles from "./search.module.css";

export default function Search() {
  const searchValue = useRouteId();

  const query = useDebouncedValue(searchValue, 300);

  const translate = useI18Translation("page.search");

  const { cachedMovies, isError, isLoading, refetch, maxPages, page, setPage } =
    usePaginatedMovies(query);

  const handlePageChange = (newPage: number) =>
    setPage(Math.min(Math.max(newPage, 1), maxPages));

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
              label={translate("showMoreResults")}
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
