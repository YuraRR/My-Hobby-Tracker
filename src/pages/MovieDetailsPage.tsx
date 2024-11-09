import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContentDetails } from "../api/tmdb/getContentDetails";
import { ContentType } from "../types/movieTypes";
import { apiUrl } from "../constants/baseUrls";
import { formatDate, getHoursFromMinutes, getYearFromDate } from "../utils/formatStrings";
import DoughnutChart from "../components/ui/Charts/DoughnutChart";
import AddToListsBlock from "../components/AddToListsBlock";
import { getMovieTrailer } from "../api/tmdb/getMovieTrailer";
import { useActions } from "../hooks/Usebindcreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import Tilt from "react-parallax-tilt";
import RatingSlider from "../components/ui/RatingSlider";
import PopoverElem from "../components/PopoverElem";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PosterImageSkeleton from "../components/Skeletons/PosterImageSkeleton";

const MovieDetailsPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieData, setMovieData] = useState<ContentType | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const { openModal, clearSearchTerm } = useActions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movieId) {
      const fetchMovieDetails = async () => {
        setLoading(true);
        const movieDetails = await getContentDetails(movieId, "movie");
        setMovieData(movieDetails);
        setLoading(false);
        const movieTrailer = await getMovieTrailer(movieId, "movie");
        setTrailer(movieTrailer);
      };
      fetchMovieDetails();
      clearSearchTerm();
    }
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieData) {
    return <div>No movie data found.</div>;
  }

  console.log(movieData);

  return (
    <div
      className="bg-cover bg-top absolute w-full min-h-[550px]"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4)), 
        url(${apiUrl.tmdbImageUrl}original${movieData.backdrop_path})`,
      }}
    >
      <div className="container ">
        <section className="flex p-5">
          {/* POSTER */}
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={20} scale={1.045} transitionSpeed={500}>
            <LazyLoadImage
              alt={movieData.title}
              src={`${apiUrl.tmdbImageUrl}w500${movieData.poster_path}`}
              placeholder={<PosterImageSkeleton />}
              className="mt-4 w-64 *:rounded-xl"
            />
          </Tilt>

          <div className="flex flex-col pl-12 gap-y-4 max-w-[950px]">
            {/* TITLE */}
            <h1>{`${movieData.title} (${getYearFromDate(movieData.release_date)})`}</h1>
            <div className="flex gap-2">
              {movieData.adult && <span className="border border-gray-500 rounded-md px-0.5">18+</span>}
              <span>{formatDate(movieData.release_date)} ● </span>
              <ul className="flex gap-1">
                {movieData.genres.map((genre, index) => (
                  <li key={genre.id}>
                    {genre.name}
                    {index < movieData.genres.length - 1 && ","}
                  </li>
                ))}
              </ul>
              {movieData.runtime && <span>● {getHoursFromMinutes(movieData.runtime)}</span>}
            </div>

            {/* RATING CHART */}
            <div className="flex items-center gap-3">
              <DoughnutChart rating={movieData.vote_average * 10} />

              <PopoverElem
                trigger={
                  <span className="hover:text-orange-400">
                    <FontAwesomeIcon icon={faStar} title="Rate" /> Rate
                  </span>
                }
              >
                <RatingSlider itemId={movieData.id} type={"movie"} />
              </PopoverElem>
            </div>

            <div className="flex gap-5">
              <AddToListsBlock item={{ id: movieData.id, name: movieData.title, type: "movie" }} />

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
            <div className="flex flex-col gap-3 mt-8">
              <span className="italic opacity-80">{movieData.tagline}</span>
              <h2>Overview</h2>
              <p>{movieData.overview}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
