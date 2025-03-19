import { Movie } from "@/context/movies/domain";
import { Job } from "@/context/shared/domain/Job";

type MoviesWhereIsCast = (Movie & {
  character: string;
  creditId: string;
  order: number;
})[];

type MoviesWhereIsCrew = (Movie & {
  creditId: string;
  department: string;
  job: string;
})[];

export type PersonMoviesCredits = {
  id: number;
  moviesWhereIsCast: MoviesWhereIsCast;
  moviesWhereIsCrew: MoviesWhereIsCrew;
};

export const PersonMoviesCreditsTools = {
  create: (param: Partial<PersonMoviesCredits>): PersonMoviesCredits =>
    param as PersonMoviesCredits,
  getMoviesWhereIsCrewByJob: (
    personMoviesCredits: PersonMoviesCredits,
    job: Job
  ) =>
    personMoviesCredits.moviesWhereIsCrew.filter(
      (movieWhereIsCrew) => movieWhereIsCrew.job === job
    ),
};
