import { useEffect } from "react";
import { searchMoviesAndSeries } from "../api/tmdb/searchMoviesAndSeries";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ContentType } from "../types/movieTypes";
import ContentCard from "../components/Movies/ContentCard";
import ContentCardSkeleton from "../components/Skeletons/ContentCardSkeleton";
import { useSelector } from "react-redux";
import { selectSearchResult } from "../redux/slices/searchSlice";
import { useActions } from "../hooks/Usebindcreators";
import SearchBlock from "../components/SearchBlock";
import FilterPanel from "../components/FilterPanel";
import useResize from "../hooks/useResize";
import ContentSmallCard from "../components/Movies/ContentSmallCard";

interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
  const searchResult = useSelector(selectSearchResult);
  const { setSearchTerm, setSearchResult } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const screenWidth = useResize();
  const { searchType } = useParams();

  useEffect(() => {
    handleSearch();
  }, [searchType, searchParams]);

  const handleSearch = async () => {
    const query = searchParams.get("query");

    if (query) {
      const results = await searchMoviesAndSeries(query, searchType);

      setSearchResult(
        results.sort(
          (a: ContentType, b: ContentType) => b.vote_average - a.vote_average && b.vote_count - a.vote_count
        )
      );
    } else {
      setSearchParams(new URLSearchParams());
    }
  };

  useEffect(() => {
    const search = searchParams.get("search");
    search && setSearchTerm(search);
  }, [searchParams]);

  return (
    <div className="container">
      <SearchBlock showResults={false} searchType={searchType} />
      <div className="flex flex-col sm:flex-row w-full">
        <FilterPanel />
        <div className="w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,max(210px))] justify-around sm:justify-between gap-y-10 gap-x-5">
          {screenWidth > 640 ? (
            <>
              {searchResult.length < 1
                ? Array.from({ length: 20 }).map((_, i) => <ContentCardSkeleton key={i} />)
                : searchResult.map((content: ContentType) => <ContentCard key={content.id} {...{ content }} />)}
            </>
          ) : (
            <>
              {searchResult.length < 1
                ? Array.from({ length: 20 }).map((_, i) => <ContentCardSkeleton key={i} />)
                : searchResult.map((content: ContentType) => (
                    <ContentSmallCard key={content.id} size="md" {...{ content }} />
                  ))}
            </>
          )}

          {/* {loadingMore && Array.from({ length: 20 }).map((_, i) => <MovieCardSkeleton key={`skeleton-${i}`} />)} */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
