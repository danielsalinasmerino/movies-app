import { Movie } from "@/context/movies/domain";

// TODO: Maybe delete this and create kind of a "searchResponse" general, using <T>
export interface MoviesSearchResponse {
  page: number;
  movies: Array<Movie>;
  totalPages: number;
  totalResults: number;
}

export const MoviesSearchResponses = {
  create: (param: Partial<MoviesSearchResponse>): MoviesSearchResponse =>
    param as MoviesSearchResponse,
};
