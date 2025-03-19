import { useQuery } from "@tanstack/react-query";

import { PersonsRestRepository } from "@/context/persons/infrastructure/persons-rest-repository";

interface GetPersonMoviesCreditsUseCaseParams {
  personId: number;
}

export function useGetPersonMoviesCredits({
  personId,
}: GetPersonMoviesCreditsUseCaseParams) {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["getPersonMovieCreditsQuery", { personId }],
    queryFn: () => PersonsRestRepository.getMoviesCredits(personId),
    enabled: !!personId,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}
