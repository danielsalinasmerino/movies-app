import { CastMember, CrewMember } from "@/context/shared/domain";
import { Job } from "@/context/shared/domain/Job";

export type MovieCredits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export const MovieCreditsTools = {
  create: (param: Partial<MovieCredits>): MovieCredits => param as MovieCredits,
  getDirectors: (movieCredits: MovieCredits): Array<CrewMember> =>
    movieCredits.crew.filter((crewMember) => crewMember.job === Job.Director),
};
