import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import UserProfile from "./pages/UserProfile";

import ProtectedRoute from "./components/ProtectedRoute";
import ConnectedUsersList from "./components/Profile/ConnectedUsersList";
import { Toaster } from "sonner";
import Modal from "./components/Modals/ModalBase/Modal";
import ProfileContent from "./components/Profile/ProfileContent";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import StarryCanvas from "./components/ui/Animations/StarryCanvas";
import TvDetailsPage from "./pages/TvDetailsPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Toaster richColors />
      <Modal />
      <StarryCanvas />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
            <Route path="/tv/:tvId" element={<TvDetailsPage />} />
            <Route path="search/:searchType" element={<SearchPage />} />
            <Route path="/profile/:username" element={<ProtectedRoute element={<UserProfile />} />}>
              <Route path="following" element={<ConnectedUsersList listType="Following" />} />
              <Route path="followers" element={<ConnectedUsersList listType="Followers" />} />
              <Route path="Movies" element={<ProfileContent type={"movie"} />} />
              <Route path="TV Shows" element={<ProfileContent type={"tv"} />} />
            </Route>
            <Route path="/contact" element={""} />
            <Route path="*" element={""} /> {/* Страница 404 */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
