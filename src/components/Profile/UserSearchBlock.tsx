import React, { useState } from "react";
import Input from "../ui/TextInput";
import Button from "../ui/Button";
import { UserData } from "../../types/userTypes";
import findUsersByName from "../../firebase/findUsersByName";
import { Link } from "react-router-dom";

interface UserSearchBlockProps {
  user: UserData;
}

const UserSearchBlock = ({ user }: UserSearchBlockProps) => {
  const [userName, setUserName] = useState("");
  const [results, setResults] = useState<UserData[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() === "") return;

    if (user.displayName) {
      const users = await findUsersByName(user.displayName);
      setResults(users);
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch} className="mt-4 flex w-fit">
        <Input onChange={(e) => setUserName(e.target.value)} placeholder={"Search by username"} value={userName} />
        <Button type="submit">Search</Button>
      </form>
      <div>
        {results.length > 0 ? (
          results.map((user) => (
            <div key={user.uid} className="p-4 border w-64">
              <Link to={`/profile/${user.displayName}`} className="w-full h-full">
                {user.displayName}
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

export default UserSearchBlock;
