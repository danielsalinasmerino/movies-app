import {
  Movie,
  MovieCredits,
  MoviesSearchResponse,
} from "@/context/movies/domain";

export interface MoviesRepository {
  getCredits: (movie_id: number) => Promise<MovieCredits>;
  getDetails: (movie_id: number) => Promise<Movie>;
  search: (query: string, page: number) => Promise<MoviesSearchResponse>;
}
