import {
  Movie,
  MovieCredits,
  MoviesSearchResponse,
} from "@/context/movies/domain";

export interface MoviesRepository {
  getCredits: (movieId: number) => Promise<MovieCredits>;
  getDetails: (movieId: number) => Promise<Movie>;
  search: (query: string, page: number) => Promise<MoviesSearchResponse>;
}
