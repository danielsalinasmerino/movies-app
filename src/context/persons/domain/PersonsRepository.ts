import { Person } from "@/context/persons/domain";

export interface PersonsRepository {
  getDetails: (personId: number) => Promise<Person>;
  getMovieCredits: (personId: number) => Promise<void>;
}
