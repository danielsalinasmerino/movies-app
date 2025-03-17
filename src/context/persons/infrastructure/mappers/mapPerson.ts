import { Gender, Person, Persons } from "@/context/persons/domain";

const mapGender = (data: number): Gender => {
  const genderMap: Record<number, Gender> = {
    1: Gender.Female,
    2: Gender.Male,
    3: Gender.NonBinary,
  };

  return genderMap[data] ?? Gender.NotSpecified;
};

// TODO: Do not use any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapPerson = (data: any): Person =>
  Persons.create({
    adult: data.adult ?? true,
    gender: mapGender(data.gender ?? 0),
    id: data.id ?? 0,
    knownForDepartment: data.known_for_department || 3,
    name: data.name || "",
    originalName: data.original_name || "",
    popularity: data.popularity ?? 0,
    profilePath: data.profile_path || "",
    alsoKnownAs: data.also_known_as || undefined,
    biography: data.biography || undefined,
    birthday: data.birthday || undefined,
    deathday: data.deathday || undefined,
    homepage: data.homepage || undefined,
    imdbId: data.imdb_id || undefined,
    placeOfBirth: data.place_of_birth || undefined,
  });
