import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { MovieCredits, MoviesSearchResponse } from "@/context/movies/domain";
import { MoviesRestRepository } from "@/context/movies/infrastructure/movies-rest-repository";

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
    queryFn: () => MoviesRestRepository.search(query, page),
    enabled: !!query,
  });

  const movieCreditsQueries = useQueries({
    queries:
      searchMoviesQuery.data?.movies.map((movie) => ({
        queryKey: ["getMovieCredits", { movie_id: movie.id }],
        queryFn: () => MoviesRestRepository.getCredits(movie.id),
        enabled: searchMoviesQuery.data?.movies.length > 0,
      })) || [],
  });

  const isLoading =
    searchMoviesQuery.isLoading ||
    (movieCreditsQueries.length > 0 &&
      movieCreditsQueries.some((query) => query.isLoading));

  const isFetching =
    searchMoviesQuery.isFetching ||
    movieCreditsQueries.some((query) => query.isFetching);

  const isError =
    searchMoviesQuery.isError ||
    movieCreditsQueries.some((query) => query.isError);

  const data: MoviesSearchResponse | undefined = useMemo(() => {
    if (!searchMoviesQuery.data) return undefined;

    const creditsMap = movieCreditsQueries.reduce<Record<number, MovieCredits>>(
      (acc, query) => {
        if (query.data) acc[query.data.id] = query.data;
        return acc;
      },
      {}
    );

    return {
      ...searchMoviesQuery.data,
      movies: searchMoviesQuery.data.movies.map((movie) => ({
        ...movie,
        credits: creditsMap[movie.id] || null,
      })),
    };
  }, [searchMoviesQuery.data, movieCreditsQueries]);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    refetch: searchMoviesQuery.refetch,
  };
}
