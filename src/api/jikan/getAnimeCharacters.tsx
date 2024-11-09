import fetchAnimeCharacters from "./fetchAnimeCharacters";
import searchAnimeByTitle from "./searchAnimeByTitle";

const getAnimeCharacters = async (title: string) => {
  const anime = await searchAnimeByTitle(title);
  if (anime) {
    const malId = anime.mal_id;
    const characters = await fetchAnimeCharacters(malId);
    return characters;
  } else {
    console.log("Аниме не найдено на MyAnimeList.");
    return [];
  }
};
export default getAnimeCharacters;
