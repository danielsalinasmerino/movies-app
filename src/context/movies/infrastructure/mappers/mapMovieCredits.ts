import { MovieCredits, MovieCreditsTools } from "@/context/movies/domain";
import { mapPerson } from "@/context/persons/infrastructure/mappers";
import { CastMember, CrewMember } from "@/context/shared/domain";

// TODO: This to proper file
// TODO: Add CastMembers
const mapCastMember = (data: any): CastMember => ({
  ...mapPerson(data),
  castId: data.cast_id ?? 0,
  character: data.character || "",
  creditId: data.credit_id || "",
  order: data.order ?? 0,
});

// TODO: This to proper file
// TODO: Add CrewMembers
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
