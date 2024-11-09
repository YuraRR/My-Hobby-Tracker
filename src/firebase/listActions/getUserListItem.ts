import { doc, getDoc } from "firebase/firestore";
import { db } from "..";
import { toast } from "sonner";
import { listItemType, UserListProps } from "../../types/commonTypes";

const getUserListItem = async ({ currentUser, item }: UserListProps) => {
  const currentUserRef = doc(db, "usersData", currentUser.uid);
  try {
    const userDoc = await getDoc(currentUserRef);

    if (!userDoc.exists()) return toast.error("User document does not exist.");

    const userData = userDoc.data();
    const userList = userData.userLists?.[item.type] || [];

    const itemIndex = userList.findIndex((existingItem: listItemType) => existingItem.id === item.id);
    return userList[itemIndex];
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default getUserListItem;
