import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { UserData } from "../../types/userTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import addFollower from "../../firebase/addFollower";
import { useEffect, useState } from "react";
import getUsersFromList from "../../firebase/getUsersFromList";
import removeFollower from "../../firebase/removeFollower";

interface ConnectionsProps {
  user: UserData;
}

const Connections = ({ user }: ConnectionsProps) => {
  const currentUser = useSelector((state: RootState) => state.user);
  const isMyProfile = currentUser.uid === user.uid;

  const [following, setFollowing] = useState<UserData[]>([]);
  const [followers, setFollowers] = useState<UserData[]>([]);

  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const [followingList, followersList] = await Promise.all([
      getUsersFromList(user.uid, "Following"),
      getUsersFromList(user.uid, "Followers"),
    ]);
    setFollowing(followingList);
    setFollowers(followersList);
    console.log("get");
  };

  useEffect(() => {
    fetchData();
  }, [user.uid]);

  useEffect(() => {
    setIsFollowed(followers.some((follower) => follower.uid === currentUser.uid));
  }, [followers]);

  const handleFollow = async () => {
    setLoading(true);
    await addFollower(currentUser, user);
    fetchData();
    setIsFollowed(true);
    setLoading(false);
  };

  const handleUnfollow = async () => {
    setLoading(true);
    await removeFollower(currentUser, user);
    fetchData();
    setIsFollowed(false);
    setLoading(false);
  };

  return (
    <div className="flex flex-col py-5 gap-3 absolute right-12 w-24 center">
      {!isMyProfile && !isFollowed && (
        <button onClick={handleFollow} disabled={loading}>
          <FontAwesomeIcon icon={faUserFriends} className="pr-1" />
          Follow
        </button>
      )}
      {isFollowed && (
        <button onClick={handleUnfollow} disabled={loading}>
          <FontAwesomeIcon icon={faUserFriends} className="pr-1" />
          Unfollow
        </button>
      )}
      <Link to={"following"} state={{ user }}>
        {following.length} Following
      </Link>
      <Link to={"followers"} state={{ user }}>
        {followers.length} Followers
      </Link>
    </div>
  );
};

export default Connections;
