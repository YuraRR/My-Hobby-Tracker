import ProfileBanner from "../components/Profile/ProfileBanner";
import ProfileUserImage from "../components/Profile/ProfileUserImage";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoriesList } from "../constants/mainCategories";

import { Link, Outlet, useParams } from "react-router-dom";
import getUserByName from "../firebase/getUserByName";
import { useEffect, useState } from "react";
import { UserData } from "../types/userTypes";
import Connections from "../components/Profile/Connections";

interface UserProfileProps {}

const UserProfile = ({}: UserProfileProps) => {
  const username = useParams().username;
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        try {
          const userDoc = await getUserByName(username);

          if (userDoc) {
            const userData: UserData = {
              displayName: userDoc.displayName,
              email: userDoc.email,
              photoURL: userDoc.photoURL,
              bannerURL: userDoc.bannerURL,
              uid: userDoc.uid,
            };
            setUser(userData);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.error("Username is undefined");
      }
    };
    fetchUser();
  }, [username]);

  if (loading) return <div>Loading...</div>;

  return user ? (
    <div className="h-[2000px]">
      <div>
        <ProfileBanner {...user} />
        <div className="relative flex flex-col xs:flex-row">
          <div className="p-5 flex gap-4 flex-col xs:flex-row">
            <ProfileUserImage {...user} />
            <div>
              <span className="pr-3 text-2xl sm:text-4xl">{user.displayName}</span>
              <FontAwesomeIcon icon={faPen} color="white" className="mt-4" />
            </div>
          </div>

          <Connections user={user} />
        </div>

        <nav>
          <ul className="flex gap-8 bg-blue-950 py-1 px-4 center max-w-[1440px] mx-auto">
            {categoriesList.map(({ name }) => (
              <li key={name}>
                <Link to={name}>{name.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  ) : (
    <span>User not found</span>
  );
};

export default UserProfile;
