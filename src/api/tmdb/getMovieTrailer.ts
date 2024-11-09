import tmdb from "./tmdb";

export const getMovieTrailer = async (movieId: string, type: string) => {
  try {
    const response = await tmdb.get(`${type}/${movieId}/videos`);
    const trailer = response.data.results.find(
      (video: { site: string; type: string }) => video.site === "YouTube" && video.type === "Trailer"
    );

    return trailer.key;
  } catch (error) {
    console.error("Ошибка при получении детальной информации о фильме:", error);
    return null;
  }
};
