import { Movie, Movies } from "@/context/movies/domain";
import ISO_639_1_CODES_JSONS from "@/utils/ISO-639-1";

const ISO_639_1_CODE_LANGUAGE = ISO_639_1_CODES_JSONS.ISO_639_1_CODE_LANGUAGE;
type ISO_639_1_CODE_LANGUAGE_KEYS = keyof typeof ISO_639_1_CODE_LANGUAGE;

const ISO_639_1_CODE_COUNTRY_CODE =
  ISO_639_1_CODES_JSONS.ISO_639_1_CODE_COUNTRY_CODE;
type ISO_639_1_CODE_COUNTRY_CODE_KEYS =
  keyof typeof ISO_639_1_CODE_COUNTRY_CODE;

// TODO: Do not use any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapMovie = (data: any): Movie => {
  const originalLanguageKey: ISO_639_1_CODE_LANGUAGE_KEYS =
    data.original_language;

  const originalCountryCodeKey: ISO_639_1_CODE_COUNTRY_CODE_KEYS =
    data.original_language;

  const originalLanguage = ISO_639_1_CODE_LANGUAGE[originalLanguageKey];

  // TODO: Take into account that some country code are objects
  const originalCountryCode = (
    ISO_639_1_CODE_COUNTRY_CODE[originalCountryCodeKey] ?? ""
  ).toString();

  const releaseYear = new Date(data.release_date).getFullYear();

  return Movies.create({
    adult: data.adult ?? true,
    backdropPath: data.backdrop_path,
    genreIds: data.genre_ids,
    id: data.id ?? 0,
    originalCountryCode,
    originalLanguage,
    originalTitle: data.original_title,
    overview: data.overview,
    popularity: data.popularity ?? 0,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    title: data.title,
    video: data.video ?? true,
    voteAverage: data.vote_average ?? 0,
    voteCount: data.vote_count ?? 0,
    releaseYear,
  });
};
