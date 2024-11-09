import { userStatusType } from "../../types/commonTypes";
import { ContentType } from "../../types/movieTypes";

import { useEffect, useState } from "react";
import TextInput from "../ui/TextInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import AdaptiveCardsGrid from "../AdaptiveCardsGrid";

interface FiltersBlockProps {
  userStatusesList: userStatusType[];
  itemsList: ContentType[];
}

const FiltersBlock = ({ userStatusesList, itemsList }: FiltersBlockProps) => {
  const [filteredCards, setFilteredCards] = useState<ContentType[]>(itemsList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filterCards = () => {
    return itemsList.filter((card) => {
      const matchesSearch = searchTerm ? card.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const matchesStatus = selectedStatus ? card.userStatus === selectedStatus : true;
      return matchesSearch && matchesStatus;
    });
  };

  useEffect(() => {
    const results = filterCards();
    setFilteredCards(results);
  }, [searchTerm, selectedStatus, itemsList]);

  return (
    <div className="flex flex-col mt-4 gap-4">
      <nav>
        <ul className="flex gap-8 py-1 px-4 items-center">
          <li>
            <button onClick={() => setSelectedStatus(null)}>All</button>
          </li>
          {userStatusesList.map(
            (status) =>
              status != "Unwatched" && (
                <li key={status}>
                  <button onClick={() => setSelectedStatus(status)}>{status}</button>
                </li>
              )
          )}
          <li>
            <TextInput
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              icon={faSearch}
              className="w-48"
            />
          </li>
        </ul>
      </nav>
      <AdaptiveCardsGrid content={filteredCards} tilt={false} showUserRating={true}>
        <p className="flex">
          No content found.
          <button className="text-sky-700" onClick={() => setSelectedStatus(null)}>
            Reset filters
          </button>
        </p>
      </AdaptiveCardsGrid>
    </div>
  );
};

export default FiltersBlock;
