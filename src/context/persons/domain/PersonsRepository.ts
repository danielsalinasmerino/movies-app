import { Person, PersonMoviesCredits } from "@/context/persons/domain";

export interface PersonsRepository {
  getDetails: (personId: number) => Promise<Person>;
  getMoviesCredits: (personId: number) => Promise<PersonMoviesCredits>;
}
