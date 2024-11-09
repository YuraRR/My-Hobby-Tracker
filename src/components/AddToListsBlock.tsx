import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import updateUserList from "../firebase/listActions/updateUserList";
import { RootState } from "../redux/app/store";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import SelectListToAdd from "./ui/SelectListToAdd";
import { userStatusType } from "../types/commonTypes";
import getUserListItem from "../firebase/listActions/getUserListItem";
import { movieUserStatus, seriesUserStatus } from "../constants/mainCategories";
import AddToUserListButton from "./ui/Buttons/addToUserListButton";

interface AddToListsBlockProps {
  item: { id: number; name: string; type: string };
  buttonsType?: "icon" | "text";
}

const AddToListsBlock = ({ item, buttonsType = "icon" }: AddToListsBlockProps) => {
  const currentUser = useSelector((state: RootState) => state.user);
  const [buttonActive, setButtonActive] = useState({
    userStatus: "",
    favorite: false,
    bookmarks: false,
  });
  const [userStatusesList, setUserStatusesList] = useState<userStatusType[]>([]);

  useEffect(() => {
    setUserStatusesList(item.type === "movie" ? movieUserStatus : seriesUserStatus);
  }, [item.type]);

  useEffect(() => {
    const fetchUserListsData = async () => {
      const listItemData = await getUserListItem({ currentUser, item });
      if (listItemData) setButtonActive(listItemData);
    };
    fetchUserListsData();
  }, [currentUser, item]);

  const addToList = (list: "favorite" | "bookmarks") => {
    updateUserList({ currentUser, list, item });
    setButtonActive((prev) => ({ ...prev, [list]: !prev[list] }));
  };

  const changeUserStatus = useCallback(
    (userStatus: userStatusType) => {
      updateUserList({ currentUser, userStatus, item });
      setButtonActive((prev) => ({ ...prev, userStatus }));
    },
    [currentUser, item]
  );

  return (
    <div className="flex gap-4 svg:transition-colors duration-300">
      <SelectListToAdd
        buttonActive={buttonActive.userStatus}
        {...{ buttonsType, userStatusesList, changeUserStatus }}
      />
      <AddToUserListButton
        type={"favorite"}
        icon={faHeart}
        text={"Mark as favorite"}
        colorClass="red-700"
        {...{ buttonsType, buttonActive, addToList }}
      />
      <AddToUserListButton
        type={"bookmarks"}
        icon={faBookmark}
        text={"Add to your bookmarks"}
        colorClass="green-700"
        {...{ buttonsType, buttonActive, addToList }}
      />
    </div>
  );
};

export default AddToListsBlock;
