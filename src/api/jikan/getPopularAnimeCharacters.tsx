import { Tv } from "../../types/movieTypes";
import getAnimeCharacters from "./getAnimeCharacters";

const getPopularAnimeCharacters = async (tvDetails: Tv) => {
  const anime_characters = await getAnimeCharacters(tvDetails.name);
  if (anime_characters.length == 0) return console.log("no");

  const main_anime_characters = anime_characters
    .sort((a: { favorites: number }, b: { favorites: number }) => b.favorites - a.favorites)
    .slice(0, 10);

  return { ...tvDetails, anime_characters, main_anime_characters };
};
export default getPopularAnimeCharacters;
