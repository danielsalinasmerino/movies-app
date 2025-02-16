import { useQuery } from "@tanstack/react-query";

import { PersonsRestRepository } from "@/context/persons/infrastructure/persons-rest-repository";

interface GetPersonDetailsUseCaseParams {
  personId: number;
}

export function useGetPersonDetails({
  personId,
}: GetPersonDetailsUseCaseParams) {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["getPersonDetailsQuery", { personId }],
    queryFn: () => PersonsRestRepository.getDetails(personId),
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
