import { Movie, Movies } from "@/context/movies/domain/Movie";
import {
  MovieCredits,
  MovieCreditsTools,
} from "@/context/movies/domain/MovieCredits";
import { MovieRepository } from "@/context/movies/domain/MovieRepository";
import {
  MoviesSearchResponse,
  MoviesSearchResponses,
} from "@/context/movies/domain/MoviesSearchResponse";
import {
  MovieWithCredits,
  MoviesWithCredits,
} from "@/context/movies/domain/MovieWithCredits";

export { MovieCreditsTools, Movies, MoviesSearchResponses, MoviesWithCredits };
export type {
  Movie,
  MovieCredits,
  MovieRepository,
  MoviesSearchResponse,
  MovieWithCredits,
};
