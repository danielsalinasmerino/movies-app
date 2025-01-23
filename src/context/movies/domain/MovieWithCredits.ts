import { Movie, MovieCredits } from "@/context/movies/domain";

export interface MovieWithCredits extends Movie {
  credits?: MovieCredits;
}

export const MoviesWithCredits = {
  create: (param: Partial<MovieWithCredits>): MovieWithCredits =>
    param as MovieWithCredits,
};
