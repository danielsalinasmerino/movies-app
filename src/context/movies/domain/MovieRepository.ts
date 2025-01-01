import { Movie, MovieResponse } from "@/context/movies/domain";

export interface MovieRepository {
  getDetails: (movie_id: number) => Promise<Movie>;
  search: (query: string, page: number) => Promise<MovieResponse>;
}
