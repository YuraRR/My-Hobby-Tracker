import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContentDetails } from "../api/tmdb/getContentDetails";
import { ContentType } from "../types/movieTypes";
import { apiUrl } from "../constants/baseUrls";
import { getHoursFromMinutes, getYearFromDate } from "../utils/formatStrings";
import DoughnutChart from "../components/ui/Charts/DoughnutChart";
import AddToListsBlock from "../components/AddToListsBlock";
import { getMovieTrailer } from "../api/tmdb/getMovieTrailer";
import { useActions } from "../hooks/Usebindcreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import Tilt from "react-parallax-tilt";
import RatingSlider from "../components/ui/RatingSlider";
import PopoverElem from "../components/PopoverElem";
import getPopularAnimeCharacters from "../api/jikan/getPopularAnimeCharacters";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PosterImageSkeleton from "../components/Skeletons/PosterImageSkeleton";

const TvDetailsPage = () => {
  const { tvId } = useParams<{ tvId: string }>();
  const [tvData, setTvData] = useState<ContentType | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const { openModal } = useActions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tvId) {
      const fetchTvDetails = async () => {
        setLoading(true);
        const tvDetails = await getContentDetails(tvId, "tv");
        setTvData(tvDetails);
        getPopularAnimeCharacters(tvDetails);
        const tvTrailer = await getMovieTrailer(tvId, "tv");
        setTrailer(tvTrailer);
        setLoading(false);
      };
      fetchTvDetails();
    }
  }, [tvId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tvData) {
    return <div>No tv data found.</div>;
  }

  return (
    <div
      className="bg-cover bg-top absolute w-full min-h-[650px] h-full"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), 
        url(${apiUrl.tmdbImageUrl}original${tvData.backdrop_path})`,
      }}
    >
      <div className="container ">
        <section className="flex pt-5">
          {/* POSTER */}
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={20} scale={1.045} transitionSpeed={500}>
            <LazyLoadImage
              alt={tvData.title}
              src={`${apiUrl.tmdbImageUrl}w500${tvData.poster_path}`}
              placeholder={<PosterImageSkeleton />}
              className="mt-4 min-w-64 *:rounded-xl"
            />
          </Tilt>
          {/* <PosterImageSkeleton /> */}
          <div className="flex flex-col pl-12 gap-y-4 max-w-[1000px]">
            {/* TITLE */}
            <h1>{`${tvData.name} (${getYearFromDate(tvData.first_air_date)})`}</h1>
            <div className="flex gap-2">
              {tvData.adult && <span className="border border-gray-500 rounded-md px-0.5">18+</span>}

              <ul className="flex gap-1">
                {tvData.genres.map((genre, index) => (
                  <li key={genre.id}>
                    {genre.name}
                    {index < tvData.genres.length - 1 && ","}
                  </li>
                ))}
              </ul>
              {tvData.runtime && <span>● {getHoursFromMinutes(tvData.runtime)}</span>}
            </div>

            {/* RATING CHART */}
            <div className="flex items-center gap-3">
              <DoughnutChart rating={tvData.vote_average * 10} />

              <PopoverElem
                trigger={
                  <span className="hover:text-orange-400">
                    <FontAwesomeIcon icon={faStar} title="Rate" /> Rate
                  </span>
                }
              >
                <RatingSlider itemId={tvData.id} type={"tv"} />
              </PopoverElem>
            </div>

            <div className="flex gap-5">
              <AddToListsBlock item={{ id: tvData.id, name: tvData.name, type: "tv" }} />

              {trailer && (
                <button
                  className="hover:opacity-80"
                  onClick={() => openModal({ modalId: "trailerModal", trailerId: trailer, size: "full" })}
                >
                  {<FontAwesomeIcon icon={faPlay} />} Watch trailer
                </button>
              )}
            </div>

            {/* TEXT INFO */}
            <div className="flex flex-col gap-3">
              <span className="italic opacity-80">{tvData.tagline}</span>
              <h2>Overview</h2>
              <p>{tvData.overview}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TvDetailsPage;
