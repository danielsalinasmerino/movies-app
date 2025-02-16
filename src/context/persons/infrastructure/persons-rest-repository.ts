import { Person, PersonsRepository } from "@/context/persons/domain";
import { axiosTMDBClient, handleAxiosError } from "@/utils/axios";

import { mapPerson } from "./mappers";

export const PersonsRestRepository: PersonsRepository = {
  getDetails: async (person_id: number): Promise<Person> => {
    try {
      const { data } = await axiosTMDBClient.get(`/person/${person_id}`);

      return mapPerson(data);
    } catch (error) {
      handleAxiosError(error, `Fetching person details for ID ${person_id}`);
      throw new Error("Unable to fetch person details");
    }
  },
};
