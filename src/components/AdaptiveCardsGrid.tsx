import { ContentType } from "../types/movieTypes";
import ContentCardSkeleton from "./Skeletons/ContentCardSkeleton";
import ContentCard from "./Movies/ContentCard";
import { ReactNode } from "react";

interface AdaptiveCardsGridProps {
  loading?: boolean;
  loadingMore?: boolean;
  content: ContentType[];
  children: ReactNode;
  tilt?: boolean;
  showUserRating?: boolean;
}

const AdaptiveCardsGrid = ({
  loading = false,
  loadingMore,
  content,
  tilt,
  showUserRating,
  children,
}: AdaptiveCardsGridProps) => {
  console.log(content);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,max(210px))] justify-around sm:justify-between gap-y-10 gap-x-5">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => <ContentCardSkeleton key={`loading-skeleton-${i}`} />)
          : content.map((content: ContentType) => (
              <ContentCard key={content.id} {...{ content, tilt, showUserRating }} />
            ))}

        {loadingMore &&
          Array.from({ length: 20 }).map((_, i) => <ContentCardSkeleton key={`loading-more-${i}`} />)}
      </div>
      {!loading && content.length === 0 && children}
    </>
  );
};

export default AdaptiveCardsGrid;
