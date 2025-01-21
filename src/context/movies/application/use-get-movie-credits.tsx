import { useQuery } from "@tanstack/react-query";

import { MovieRestRepository } from "@/context/movies/infrastructure/movie-rest-repository";

interface GetMovieCreditsUseCaseParams {
  movie_id: number;
}

export function useGetMovieCredits({ movie_id }: GetMovieCreditsUseCaseParams) {
  const { data, isError, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["getMovieCredits", { movie_id }],
    queryFn: () => MovieRestRepository.getCredits(movie_id),
  });

  return { data, isError, isLoading, isFetching, refetch };
}
