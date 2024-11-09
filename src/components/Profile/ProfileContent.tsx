import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { useEffect, useState } from "react";
import getUserList from "../../firebase/listActions/getUserList";
import { getContentDetails } from "../../api/tmdb/getContentDetails";
import { ContentType } from "../../types/movieTypes";
import FiltersBlock from "./FiltersBlock";
import { movieUserStatus } from "../../constants/mainCategories";

interface ProfileContentProps {
  type: "movie" | "tv" | "game";
}

const ProfileContent = ({ type }: ProfileContentProps) => {
  const [contentList, setContentList] = useState<ContentType[]>([]);
  const currentUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getContentList = async () => {
      const userList = await getUserList(currentUser, type);

      const contentDataList = await Promise.all(
        userList.map(async ({ id, userStatus, userRating, favorite, bookmarks }: ContentType) => {
          const contentData = await getContentDetails(id, type);
          return { ...contentData, ...{ userStatus, userRating, favorite, bookmarks, type } };
        })
      );
      setContentList(contentDataList);
    };

    getContentList();
  }, [currentUser, type]);

  return (
    <div className="container">
      <FiltersBlock userStatusesList={movieUserStatus} itemsList={contentList} />
    </div>
  );
};

export default ProfileContent;
