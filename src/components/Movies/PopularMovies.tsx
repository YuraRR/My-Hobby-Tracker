import { useEffect, useState } from "react"; // добавляем useCallback
import getContentByCategory from "../../api/tmdb/getContentByCategory";
import { ContentType } from "../../types/movieTypes";
import ContentCard from "./ContentCard";
import ContentCardSkeleton from "../Skeletons/ContentCardSkeleton";
import Button from "../ui/Button";
import AdaptiveCardsGrid from "../AdaptiveCardsGrid";

const PopularMovies = () => {
  const [movies, setMovies] = useState<ContentType[]>([]);
  const [pagesOpened, setPagesOpened] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchMovies = async () => {
    const popularMovies = await getContentByCategory("movie", "popular");
    setMovies(popularMovies);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const loadMoreMovies = async () => {
    setLoadingMore(true);
    const nextPageMovies = await getContentByCategory("movie", "popular", pagesOpened + 1);
    setPagesOpened((prev) => prev + 1);
    console.log(movies);

    console.log(nextPageMovies);

    setMovies((prevMovies) => [
      ...prevMovies,
      ...nextPageMovies.filter((movie: ContentType) => !prevMovies.some((prevMovie) => prevMovie.id === movie.id)),
    ]);

    setLoadingMore(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <nav className="flex w-full justify-between mt-3">
        <h2>Popular movies</h2>
      </nav>

      {movies.length === 0 ? (
        <span>No results</span>
      ) : (
        <>
          <AdaptiveCardsGrid content={movies} {...{ loading, loadingMore }}>
            No content found
          </AdaptiveCardsGrid>

          {
            <div className="flex justify-center mt-4">
              <Button onClick={loadMoreMovies} disabled={loadingMore}>
                Load More
              </Button>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default PopularMovies;
