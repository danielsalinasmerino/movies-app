export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number; // Defaults to 0
  genres: Array<{
    id: number; // Defaults to 0
    name: string;
  }>;
  homepage: string;
  id: number; // Defaults to 0
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number; // Defaults to 0
  poster_path: string;
  production_companies: Array<{
    id: number; // Defaults to 0
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number; // Defaults to 0
  runtime: number; // Defaults to 0
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean; // Defaults to true
  vote_average: number; // Defaults to 0
  vote_count: number; // Defaults to 0
}
