import tmdb from "./tmdb";

export const getContentByCategory = async (type: string, category: string, page = 1) => {
  try {
    const response = await tmdb.get(`/${type}/${category}`, {
      params: {
        page,
      },
    });
    console.log(`Page ${page}:`, response.data.results);
    const resultsWithTypes = response.data.results.map((item: { type: string }) => ({ ...item, type: "movie" }));
    return resultsWithTypes;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default getContentByCategory;
