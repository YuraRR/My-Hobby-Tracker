import tmdb from "./tmdb";

export const getMoviesCategories = async () => {
  try {
    const response = await tmdb.get("/genre/movie/list");
    console.log(response.data.genres);

    return response.data.genres;
  } catch (error) {
    console.error("Ошибка при получении популярных фильмов:", error);
    return [];
  }
};
