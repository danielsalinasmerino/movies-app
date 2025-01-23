import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { MovieCredits, MoviesSearchResponse } from "@/context/movies/domain";
import { MovieRestRepository } from "@/context/movies/infrastructure/movie-rest-repository";

interface SearchMoviesUseCaseParams {
  query?: string;
  page?: number;
}

export function useSearchMoviesWithCredits({
  query = "",
  page = 1,
}: SearchMoviesUseCaseParams) {
  const searchMoviesQuery = useQuery({
    queryKey: ["searchMovies", { query, page }],
    queryFn: () => MovieRestRepository.search(query, page),
    enabled: !!query,
  });

  const movieCreditsQueries = useQueries({
    queries:
      searchMoviesQuery.data?.movies.map((movie) => ({
        queryKey: ["getMovieCredits", { movie_id: movie.id }],
        queryFn: () => MovieRestRepository.getCredits(movie.id),
        enabled: !!searchMoviesQuery.data,
      })) || [],
  });

  const data: MoviesSearchResponse | undefined = useMemo(() => {
    if (!searchMoviesQuery.data) return undefined;

    const creditsMap = movieCreditsQueries.reduce<Record<number, MovieCredits>>(
      (acc, query) => {
        if (query.data) {
          acc[query.data.id] = query.data;
        }
        return acc;
      },
      {}
    );

    const moviesWithCredits = searchMoviesQuery.data.movies.map((movie) => ({
      ...movie,
      credits: creditsMap[movie.id] || null,
    }));

    return {
      ...searchMoviesQuery.data,
      movies: moviesWithCredits,
    };
  }, [searchMoviesQuery.data, movieCreditsQueries]);

  const isLoading =
    searchMoviesQuery.isLoading ||
    movieCreditsQueries.some((query) => query.isLoading);

  const isError =
    searchMoviesQuery.isError ||
    movieCreditsQueries.some((query) => query.isError);

  return {
    data,
    isError,
    isLoading,
    isFetching: searchMoviesQuery.isFetching,
    refetch: searchMoviesQuery.refetch,
  };
}
