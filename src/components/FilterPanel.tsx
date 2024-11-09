import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectSearchResult, selectSearchTerm } from "../redux/slices/searchSlice";
import { searchMoviesAndSeries } from "../api/tmdb/searchMoviesAndSeries";
import { ContentType } from "../types/movieTypes";

import { categoriesList } from "../constants/mainCategories";

const FilterPanel = () => {
  const [contentAmount, setContentAmount] = useState({ movie: 0, tv: 0 });
  const searchTerm = useSelector(selectSearchTerm);
  const searchResult = useSelector(selectSearchResult);
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  const getContentAmount = async () => {
    const query = searchParams.get("query");
    if (!query) return;
    const results = await searchMoviesAndSeries(query);

    const moviesAmount = results.filter((item: ContentType) => item.type === "movie").length;
    const tvShowsAmount = results.filter((item: ContentType) => item.type === "tv").length;
    setContentAmount({ movie: moviesAmount || 0, tv: tvShowsAmount || 0 });
  };
  useEffect(() => {
    getContentAmount();
  }, [searchResult]);

  const handleNavigate = (type: string) => {
    navigate(`/search/${type}/?query=${searchTerm}`);
  };

  return (
    <div className="flex flex-col w-full sm:w-64 mr-8 pb-2 mb-3 border border-gray-100 rounded-xl h-fit bg-gray-50 ">
      <h4 className="p-2 bg-blue-950 rounded-t-xl">Search Results</h4>
      <ul className="flex sm:flex-col mt-2 *:p-2 *:bg-gray-50 *:w-full *:flex *:justify-between *:px-2 *:cursor-pointer">
        {categoriesList.map((category) => (
          <button
            onClick={() => handleNavigate(category.type)}
            className="hover:bg-gray-200 max-w-32 rounded-lg sm:max-w-full"
            key={category.type}
          >
            {category.name}
            <span>{contentAmount[category.type as keyof typeof contentAmount]}</span>
          </button>
        ))}
      </ul>
    </div>
  );
};
export default FilterPanel;
