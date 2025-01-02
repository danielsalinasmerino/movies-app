import {
  Movie,
  MovieRepository,
  MoviesSearchResponse,
} from "@/context/movies/domain";
import { axiosTMDBClient, handleAxiosError } from "@/utils/axios";

import { mapMovie, mapMoviesSearchResponse } from "./mappers";

export const MovieRestRepository: MovieRepository = {
  getDetails: async (movie_id: number): Promise<Movie> => {
    try {
      const { data } = await axiosTMDBClient.get(`/movie/${movie_id}`);

      return mapMovie(data);
    } catch (error) {
      handleAxiosError(error, `Fetching movie details for ID ${movie_id}`);
      throw new Error("Unable to fetch movie details");
    }
  },

  search: async (
    query: string,
    page: number
  ): Promise<MoviesSearchResponse> => {
    try {
      const { data } = await axiosTMDBClient.get(`/search/movie`, {
        params: { query, page },
      });

      return mapMoviesSearchResponse(data);
    } catch (error) {
      handleAxiosError(error, `Searching for movie with query ${query}`);
      throw new Error("Unable to search movie");
    }
  },
};
