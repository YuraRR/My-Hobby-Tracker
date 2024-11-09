import axios from "axios";

const searchAnimeByTitle = async (title: string) => {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
      params: { q: title, limit: 1 },
    });
    return response.data.data[0];
  } catch (error) {
    console.error("Ошибка при поиске аниме по названию:", error);
    return null;
  }
};
export default searchAnimeByTitle;
