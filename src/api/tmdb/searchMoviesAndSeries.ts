import { ContentType } from "../../types/movieTypes";
import tmdb from "./tmdb"; // базовая настройка Axios с вашим ключом API

export const searchMoviesAndSeries = async (query: string, resultType?: string) => {
  try {
    const movieResponse = await tmdb.get("/search/movie", {
      params: { query, page: 1 },
    });

    const seriesResponse = await tmdb.get("/search/tv", {
      params: { query, page: 1 },
    });

    const movieList = movieResponse.data.results.map((movie: ContentType) => ({ ...movie, type: "movie" }));
    const seriesList = seriesResponse.data.results.map((series: ContentType) => ({ ...series, type: "tv" }));

    const combinedResults = [...movieList, ...seriesList];

    switch (resultType) {
      case "movie":
        return movieList;
      case "tv":
        return seriesList;
      default:
        return combinedResults;
    }
  } catch (error) {
    console.error("Error on searching movie and series:", error);
    return [];
  }
};
