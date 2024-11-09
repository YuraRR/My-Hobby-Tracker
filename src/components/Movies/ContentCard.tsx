import { faFilm, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import { ContentType } from "../../types/movieTypes";
import { apiUrl } from "../../constants/baseUrls";
import TextTooltip from "../ui/TextTooltip";
import ContentCardContextMenu from "../ContentCardContextMenu";

interface contentCardProps {
  content: ContentType;
  tilt?: boolean;
  showUserRating?: boolean;
}

const ContentCard = ({ content, tilt = true, showUserRating }: contentCardProps) => {
  const contentRating = showUserRating ? content.userRating : content.vote_average.toFixed(1);
  const tiltSettings = {
    tiltMaxAngleX: 4,
    tiltMaxAngleY: 13,
    scale: tilt ? 1.045 : 1.025,
    glareMaxOpacity: 0,
    transitionSpeed: 500,
    tiltEnable: tilt,
    className: "w-fit",
  };

  return (
    <ContentCardContextMenu {...{ content }}>
      <Tilt key={content.id} {...tiltSettings}>
        <Link to={`/${content.type}/${content.id}`} className="w-fit block">
          <div className="flex flex-col gap-2 relative rounded-2xl text-center cursor-pointer">
            <figure className="*:w-full *:object-cover *:h-80">
              {content.poster_path ? (
                <img src={`${apiUrl.tmdbImageUrl}w300${content.poster_path}`} alt={content.title} />
              ) : (
                <div className="flex bg-gray-100 w-full center">
                  <FontAwesomeIcon icon={faFilm} size="2xl" />
                </div>
              )}
            </figure>

            <h4>{content.title || content.name}</h4>

            <span className="absolute top-0 right-0 bg-gray-50 py-1 px-2 rounded-bl-xl">
              <TextTooltip content={showUserRating ? "User rating" : "TMDB rating"}>
                {contentRating}
                {(content.userRating || !showUserRating) && (
                  <FontAwesomeIcon icon={faStar} color="orange" className="pl-0.5" />
                )}
              </TextTooltip>
            </span>

            {content.favorite && (
              <span className="absolute top-0 left-0 bg-gray-50 py-1 px-2 rounded-br-xl">
                {<FontAwesomeIcon icon={faHeart} className="text-red-700" />}
              </span>
            )}
          </div>
        </Link>
      </Tilt>
    </ContentCardContextMenu>
  );
};

export default ContentCard;
