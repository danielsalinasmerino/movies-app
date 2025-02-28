import { useQuery } from "@tanstack/react-query";

import { PersonsRestRepository } from "@/context/persons/infrastructure/persons-rest-repository";

interface GetPersonMovieCreditsUseCaseParams {
  personId: number;
}

// TODO: Assert better this useCase
export function useGetPersonMovieCredits({
  personId,
}: GetPersonMovieCreditsUseCaseParams) {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["getPersonMovieCreditsQuery", { personId }],
    queryFn: () => PersonsRestRepository.getMovieCredits(personId),
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
