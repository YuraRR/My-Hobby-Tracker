import Button from "./ui/Button";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/Usebindcreators";
import { RootState } from "../redux/app/store";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import ThemeButton from "./ui/ThemeButton";
import getImageUrl from "../firebase/imagesActions/getImageUrl";

const LoginButtons = () => {
  const user = useSelector((state: RootState) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { clearUser, updateField, openModal } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.uid) {
      const fetchImageUrl = async () => {
        const imageRoute = `usersImages/${user.displayName}/userAvatar-${user.displayName}`;
        const existImage = await getImageUrl(imageRoute);
        existImage && updateField({ field: "photoURL", value: existImage });
      };

      fetchImageUrl();
    }
  }, [user]);
  return (
    <Link
      to={`/profile/${user.displayName}`}
      className="flex gap-3 items-center justify-end relative cursor-pointer"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      {!user.displayName ? (
        <>
          <Button modalId="registerModal" {...{ openModal }}>
            Sign up
          </Button>
          <Button modalId="loginModal" {...{ openModal }}>
            Login
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <span className="hidden sm:block">{user.displayName}</span>
          <img src={user.photoURL} alt="profile-photo" className="rounded-full w-9 h-9 object-cover" />

          <Dropdown {...{ dropdownOpen, setDropdownOpen }}>
            <span onClick={() => navigate(`/profile/${user.displayName}`)} className="cursor-pointer">
              Profile
            </span>
            <ThemeButton />
            <Button onClick={clearUser}>Logout</Button>
          </Dropdown>
        </div>
      )}
    </Link>
  );
};

export default LoginButtons;
