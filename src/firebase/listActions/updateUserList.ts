import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "..";
import { toast } from "sonner";
import { listItemType, UserListProps } from "../../types/commonTypes";

const updateUserList = async ({ currentUser, userStatus, list, item }: UserListProps) => {
  const currentUserRef = doc(db, "usersData", currentUser.uid);
  console.log(item);

  try {
    const userDoc = await getDoc(currentUserRef);

    if (!userDoc.exists()) return toast.error("User document does not exist.");

    const userData = userDoc.data();
    const userList = userData.userLists?.[item.type] || [];

    const itemIndex = userList.findIndex((existingItem: listItemType) => existingItem.id === item.id);

    const updatedItem = {
      ...item,
      ...(userStatus ? { userStatus } : {}),
      ...(list ? { [list]: itemIndex > -1 ? !userList[itemIndex][list] : true } : {}),
    };

    if (itemIndex > -1) {
      userList[itemIndex] = { ...userList[itemIndex], ...updatedItem };
    } else {
      userList.push(updatedItem);
    }

    await updateDoc(currentUserRef, { [`userLists.${item.type}`]: userList });

    toast.success(`${item.name || item.title} ${itemIndex > -1 ? "updated" : "added"} to ${userStatus || list}`);
  } catch (error) {
    console.error("Error while adding or removing from user lists: ", error);
    toast.error("An error occurred. Please try again.");
  }
};

export default updateUserList;
