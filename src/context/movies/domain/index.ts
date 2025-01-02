import { Movie, Movies } from "@/context/movies/domain/Movie";
import { MovieRepository } from "@/context/movies/domain/MovieRepository";
import {
  MoviesSearchResponse,
  MoviesSearchResponses,
} from "@/context/movies/domain/MoviesSearchResponse";

export { Movies, MoviesSearchResponses };
export type { Movie, MovieRepository, MoviesSearchResponse };
