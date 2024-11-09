import { faFilm, faGamepad, faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import { userStatusType } from "../types/commonTypes";

export const categoriesList = [
  { name: "Movies", icon: faFilm, type: "movie" },
  { name: "TV Shows", icon: faPlay, type: "tv" },
  { name: "Games", icon: faGamepad, type: "game" },
];
export const movieUserStatus: userStatusType[] = ["Unwatched", "Watched", "Plan to Watch"];
export const seriesUserStatus: userStatusType[] = [
  "Unwatched",
  "Watching",
  "Completed",
  "On-Hold",
  "Dropped",
  "Plan to Watch",
];
