import { MovieCredits, MovieCreditsTools } from "@/context/movies/domain";
import { CastMember, CrewMember, Person } from "@/context/shared/domain";

// TODO: This to proper file
const mapPerson = (data: any): Person => ({
  adult: data.adult ?? true,
  gender: data.gender ?? 0,
  id: data.id ?? 0,
  knownForDepartment: data.known_for_department || "",
  name: data.name || "",
  originalName: data.original_name || "",
  popularity: data.popularity ?? 0,
  profilePath: data.profile_path || "",
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
