export interface Movie {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  releaseYear?: number;
  originalCountryCode?: string;
}

export const Movies = {
  create: (param: Partial<Movie>): Movie => param as Movie,
  sortByPopularity: (movies: Movie[]): Movie[] => {
    return [...movies].sort(
      (movieA, movieB) => movieB.popularity - movieA.popularity
    );
  },
};
