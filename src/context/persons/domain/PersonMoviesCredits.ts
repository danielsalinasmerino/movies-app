import { Movie } from "@/context/movies/domain";

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
};
