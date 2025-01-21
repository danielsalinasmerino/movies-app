export type Person = {
  adult: boolean;
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string;
};

export const Persons = {
  create: (param: Partial<Person>): Person => param as Person,
};
