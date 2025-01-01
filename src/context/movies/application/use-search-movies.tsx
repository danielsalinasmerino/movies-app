import { useQuery } from "@tanstack/react-query";

import { MovieRestRepository } from "@/context/movies/infrastructure/movie-rest-repository";

interface SearchMoviesUseCaseParams {
  query?: string;
  page?: number;
}

export function useSearchMovies({
  query = "",
  page = 1,
}: SearchMoviesUseCaseParams) {
  const { data, isError, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["searchMovies", { query, page }],
    queryFn: () => MovieRestRepository.search(query, page),
    enabled: !!query,
  });

  return { data, isError, isLoading, isFetching, refetch };
}
