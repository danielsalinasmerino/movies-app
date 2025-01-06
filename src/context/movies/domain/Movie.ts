export interface Movie {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalCountryCode: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  releaseYear: number;
}

export const Movies = {
  create: (param: Partial<Movie>): Movie => param as Movie,
};
