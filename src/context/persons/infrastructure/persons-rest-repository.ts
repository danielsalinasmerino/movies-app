import { Person, PersonsRepository } from "@/context/persons/domain";
import { axiosTMDBClient, handleAxiosError } from "@/utils/axios";

import { mapPerson } from "./mappers";

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
  getMovieCredits: async (personId: number): Promise<void> => {
    try {
      const { data } = await axiosTMDBClient.get(
        `/person/${personId}/movie_credits`
      );

      // TODO: Map this
      console.log(data);
    } catch (error) {
      handleAxiosError(
        error,
        `Fetching person movie credits for ID ${personId}`
      );
      throw new Error("Unable to fetch person movie credits");
    }
  },
};
