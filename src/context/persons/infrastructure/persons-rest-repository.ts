import {
  Person,
  PersonMoviesCredits,
  PersonsRepository,
} from "@/context/persons/domain";
import { axiosTMDBClient, handleAxiosError } from "@/utils/axios";

import { mapPerson, mapPersonMoviesCredits } from "./mappers";

export const PersonsRestRepository: PersonsRepository = {
  getDetails: async (personId: number): Promise<Person> => {
    try {
      const { data } = await axiosTMDBClient.get(`/person/${personId}`);

      return mapPerson(data);
    } catch (error) {
      handleAxiosError(error, `Fetching person details for ID ${personId}`);
      throw new Error("Unable to fetch person details");
    }
  },
  getMoviesCredits: async (personId: number): Promise<PersonMoviesCredits> => {
    try {
      const { data } = await axiosTMDBClient.get(
        `/person/${personId}/movie_credits`
      );

      return mapPersonMoviesCredits(data);
    } catch (error) {
      handleAxiosError(
        error,
        `Fetching person movie credits for ID ${personId}`
      );
      throw new Error("Unable to fetch person movie credits");
    }
  },
};
