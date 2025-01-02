import {
  MoviesSearchResponse,
  MoviesSearchResponses,
} from "@/context/movies/domain";

import { mapMovie } from "./mapMovie";

// TODO: Do not use any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapMoviesSearchResponse = (data: any): MoviesSearchResponse => {
  return MoviesSearchResponses.create({
    page: data.page ?? 0,
    movies: data.results.map(mapMovie),
    totalPages: data.total_pages ?? 0,
    totalResults: data.total_results ?? 0,
  });
};
