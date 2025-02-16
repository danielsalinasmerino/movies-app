import { Person } from "@/context/persons/domain";

export interface PersonsRepository {
  getDetails: (person_id: number) => Promise<Person>;
}
