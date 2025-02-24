import { useEffect, useState } from "react";

import { useSearchMoviesWithCredits } from "@/context/movies/application";
import { MovieWithCredits } from "@/context/movies/domain";
import { useAppDispatch } from "@/utils/react-redux";
import { setIsLoading } from "@/utils/react-redux/features/moviesSearchSlice";

export function usePaginatedMovies(query: string) {
  const dispatch = useAppDispatch();

  const [cachedMovies, setCachedMovies] = useState<Array<MovieWithCredits>>([]);
  const [lastQuery, setLastQuery] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data, isError, isLoading, refetch } = useSearchMoviesWithCredits({
    query,
    page,
  });

  const maxPages = data?.totalPages || 1;

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

  return {
    cachedMovies,
    isError,
    isLoading,
    refetch,
    maxPages,
    page,
    setPage,
  };
}
