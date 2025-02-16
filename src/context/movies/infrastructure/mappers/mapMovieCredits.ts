import { MovieCredits, MovieCreditsTools } from "@/context/movies/domain";
import { Gender, Person } from "@/context/persons/domain";
import { CastMember, CrewMember } from "@/context/shared/domain";

const mapGender = (data: number): Gender => {
  const genderMap: Record<number, Gender> = {
    1: Gender.FEMALE,
    2: Gender.MALE,
    3: Gender.NON_BINARY,
  };

  return genderMap[data] ?? Gender.NOT_SPECIFIED;
};

// TODO: This to proper file
const mapPerson = (data: any): Person => ({
  adult: data.adult ?? true,
  gender: mapGender(data.gender ?? 0),
  id: data.id ?? 0,
  knownForDepartment: data.known_for_department || "",
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

// TODO: This to proper file
const mapCastMember = (data: any): CastMember => ({
  ...mapPerson(data),
  castId: data.cast_id ?? 0,
  character: data.character || "",
  creditId: data.credit_id || "",
  order: data.order ?? 0,
});

// TODO: This to proper file
const mapCrewMember = (data: any): CrewMember => ({
  ...mapPerson(data),
  creditId: data.credit_id || "",
  department: data.department || "",
  job: data.job || "",
});

// TODO: Do not use any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapMovieCredits = (data: any): MovieCredits => {
  return MovieCreditsTools.create({
    id: data.id,
    cast: Array.isArray(data.cast) ? data.cast.map(mapCastMember) : [],
    crew: Array.isArray(data.crew) ? data.crew.map(mapCrewMember) : [],
  });
};
