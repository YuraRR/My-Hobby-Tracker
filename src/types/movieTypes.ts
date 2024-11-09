import { userStatusType } from "./commonTypes";

export interface MovieCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ContentType {
  type: "movie" | "tv" | "game";
  name: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  status: string;
  tagline: string | null;
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: MovieCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  original_language: string;
  origin_country: string[];
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: { name: string };
  revenue: number;
  video: boolean;
  userStatus?: userStatusType;
  userRating?: userStatusType;
  favorite?: boolean;
  bookmarks?: boolean;
  first_air_date: string;
  last_air_date: string;
  anime_characters: {}[];
  main_anime_characters: {}[];
}

export interface AnimeCharacter {
  favorite: string;
}
