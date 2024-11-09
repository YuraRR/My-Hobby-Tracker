import { useEffect, useState } from "react";
import { UserData } from "../../types/userTypes";
import { Link, useLocation } from "react-router-dom";
import getUsersFromList from "../../firebase/getUsersFromList";

interface UserListProps {
  listType: "Followers" | "Following";
}

const ConnectedUsersList = ({ listType }: UserListProps) => {
  const location = useLocation();
  const [userList, setUserList] = useState<UserData[]>([]);
  const user = location.state?.user;

  useEffect(() => {
    const fetchUserList = async () => {
      if (user?.uid) {
        const list = await getUsersFromList(user.uid, listType);
        setUserList(list);
      }
    };

    fetchUserList();
  }, [user, listType]);

  return (
    <div className="mt-4">
      <h2>{listType}</h2>
      <div className="flex">
        {userList.length > 0 ? (
          userList.map((user) => (
            <div key={user.uid} className="p-4 w-64">
              <Link to={`/profile/${user.displayName}`} className="w-full h-full flex items-center gap-3">
                {user.displayName}
                {user.photoURL && (
                  <img src={user.photoURL} alt="profile-photo" className="rounded-full w-9 h-9 object-cover " />
                )}
              </Link>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default ConnectedUsersList;
