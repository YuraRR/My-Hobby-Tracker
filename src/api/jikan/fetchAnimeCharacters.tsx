import axios from "axios";

const fetchAnimeCharacters = async (animeId: string | number) => {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
    return response.data.data;
  } catch (error) {
    console.error("Ошибка при получении персонажей аниме:", error);
    return [];
  }
};
export default fetchAnimeCharacters;
