import {
  Movie,
  MovieCredits,
  MoviesRepository,
  MoviesSearchResponse,
} from "@/context/movies/domain";
import { axiosTMDBClient, handleAxiosError } from "@/utils/axios";

import { mapMovie, mapMovieCredits, mapMoviesSearchResponse } from "./mappers";

export const MoviesRestRepository: MoviesRepository = {
  getCredits: async (movieId: number): Promise<MovieCredits> => {
    try {
      const { data } = await axiosTMDBClient.get(`/movie/${movieId}/credits`);

      return mapMovieCredits(data);
    } catch (error) {
      handleAxiosError(error, `Fetching movie credits for ID ${movieId}`);
      throw new Error("Unable to fetch movie credits");
    }
  },

  getDetails: async (movieId: number): Promise<Movie> => {
    try {
      const { data } = await axiosTMDBClient.get(`/movie/${movieId}`);

      return mapMovie(data);
    } catch (error) {
      handleAxiosError(error, `Fetching movie details for ID ${movieId}`);
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
