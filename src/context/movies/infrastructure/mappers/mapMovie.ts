import { Movie, Movies } from "@/context/movies/domain";

// TODO: Do not use any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapMovie = (data: any): Movie => {
  return Movies.create({
    adult: data.adult ?? true,
    backdropPath: data.backdrop_path,
    genreIds: data.genre_ids,
    id: data.id ?? 0,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    popularity: data.popularity ?? 0,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    title: data.title,
    video: data.video ?? true,
    voteAverage: data.vote_average ?? 0,
    voteCount: data.vote_count ?? 0,
  });
};
