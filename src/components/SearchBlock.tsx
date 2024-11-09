import { useCallback, useEffect, useRef, useState } from "react";
import TextInput from "./ui/TextInput";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/Usebindcreators";
import { selectSearchActive, selectSearchResult, selectSearchTerm } from "../redux/slices/searchSlice";
import { searchMoviesAndSeries } from "../api/tmdb/searchMoviesAndSeries";
import { debounce } from "lodash";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContentSmallCard from "./Movies/ContentSmallCard";
import { ContentType } from "../types/movieTypes";
import { motion } from "framer-motion";
import useResize from "../hooks/useResize";

interface SearchBlockProps {
  showResults?: boolean;
  searchType?: string;
}

const SearchBlock = ({ showResults = true, searchType }: SearchBlockProps) => {
  const searchTerm = useSelector(selectSearchTerm);
  const searchResult = useSelector(selectSearchResult);
  const { setSearchTerm, setSearchResult, setSearchActive } = useActions();
  const [searchBlockResult, setSearchBlockResult] = useState<ContentType[]>([]);
  const [_, setSearchParams] = useSearchParams();
  const screenWidth = useResize();

  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce(async (inputText: string) => {
      if (inputText !== "") {
        const results = await searchMoviesAndSeries(inputText, searchType);
        const filteredResults = results.sort(
          (a: ContentType, b: ContentType) => b.vote_average - a.vote_average && b.vote_count - a.vote_count
        );
        setSearchBlockResult(filteredResults);
        setSearchParams({ query: inputText });
        return filteredResults;
      }
    }, 250),
    []
  );

  const filterSearch = (type: string) => {
    const filteredSearchResult = searchResult.filter((e) => e.type == type);
    setSearchResult(filteredSearchResult);
    setSearchActive(false);
    navigate(`search/${type}?query=${searchTerm}`);
  };

  useEffect(() => {
    debouncedSearch(searchTerm);

    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const firstMovie = searchBlockResult.find((item) => item.type === "movie")?.title;
  const firstTv = searchBlockResult.find((item) => item.type === "tv")?.name;

  return (
    <div className="flex flex-col w-full py-3 transition-transform ease-in-out container">
      <TextInput
        placeholder="Search for a movie, tv show"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        icon={faSearch}
        className="w-full"
      />

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: showResults && searchBlockResult.length > 0 ? "auto" : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex flex-col items-start gap-2 mt-3 w-full overflow-hidden"
      >
        <div className="flex flex-col items-start">
          {firstMovie && <button onClick={() => filterSearch("movie")}>{`${firstMovie} in Movies`}</button>}
          {firstTv && <button onClick={() => filterSearch("tv")}>{`${firstTv} in Tv Shows`}</button>}
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 justify-between w-full mt-2"
          onClick={() => setSearchActive(false)}
        >
          {searchBlockResult.slice(0, screenWidth > 1024 ? 12 : 8).map((content) =>
            screenWidth > 768 ? (
              <ContentSmallCard key={content.id} {...{ content }} />
            ) : (
              <span key={content.id} className="text-balance">
                {content.title || content.name}
              </span>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchBlock;
