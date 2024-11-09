import PopularMovies from "../components/Movies/PopularMovies";
// import GameMap from "./MapGame";

interface MainPageProps {}

const MainPage = ({}: MainPageProps) => {
  return (
    <div className="container">
      <PopularMovies />
      {/* <GameMap></GameMap> */}
    </div>
  );
};

export default MainPage;
