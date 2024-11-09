import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { apiUrl } from "../../constants/baseUrls";
import { ContentType } from "../../types/movieTypes";

interface ContentCardProps {
  content: ContentType;
  size?: "sm" | "md";
  showInfo?: boolean;
}

const ContentSmallCard = ({ content, size = "sm", showInfo = false }: ContentCardProps) => {
  return (
    <Link to={`/${content.type}/${content.id}`} className="w-fit block">
      <div className="flex gap-2.5 relative text-center cursor-pointer">
        <figure className={`*:min-w-10 *:object-fill  ${size == "sm" ? "*:h-14" : "*:h-36"}`}>
          {content.poster_path ? (
            <img src={`${apiUrl.tmdbImageUrl}w200${content.poster_path}`} alt={content.title} />
          ) : (
            <div className="flex bg-gray-100 center">
              <FontAwesomeIcon icon={faFilm} />
            </div>
          )}
        </figure>

        <h4 className="text-start max-w-72 text-pretty ">{content.title || content.name}</h4>
        {showInfo && <p>{content.release_date || content.first_air_date}</p>}
      </div>
    </Link>
  );
};

export default ContentSmallCard;
