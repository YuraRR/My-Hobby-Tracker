import tmdb from "./tmdb";

export const getContentDetails = async (movieId: string | number, type: string) => {
  console.log(`${type}/${movieId}`);

  try {
    const response = await tmdb.get(`${type}/${movieId}`, {
      params: { append_to_response: "credits,videos,images" },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении детальной информации о фильме:", error);
    return null;
  }
};
