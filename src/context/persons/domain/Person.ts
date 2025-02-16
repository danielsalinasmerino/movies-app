import { Gender } from "@/context/persons/domain";

export type Person = {
  adult: boolean;
  gender: Gender;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string;
  alsoKnownAs?: Array<string>;
  biography?: string;
  birthday?: string;
  deathday?: string;
  homepage?: string;
  imdbId?: string;
  placeOfBirth?: string;
};

export const Persons = {
  create: (param: Partial<Person>): Person => param as Person,
};
