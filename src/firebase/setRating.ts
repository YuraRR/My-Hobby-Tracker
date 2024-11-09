import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from ".";
import { toast } from "sonner";
import { listItemType } from "../types/commonTypes";
import { UserData } from "../types/userTypes";

interface RatingProps {
  currentUser: UserData;
  itemId: string | number;
  type: string;
  userRating: number; // Изменили тип на number
}

const setRating = async ({ currentUser, itemId, type, userRating }: RatingProps) => {
  const currentUserRef = doc(db, "usersData", currentUser.uid);

  try {
    const userDoc = await getDoc(currentUserRef);

    if (!userDoc.exists()) return toast.error("User document does not exist.");

    const userData = userDoc.data();
    const userList = userData.userLists?.[type] || [];

    const itemIndex = userList.findIndex((existingItem: listItemType) => existingItem.id === itemId);

    if (itemIndex > -1) {
      userList[itemIndex] = { ...userList[itemIndex], userRating: userRating };
    } else {
      userList.push({ id: itemId, userRating: userRating });
    }

    await updateDoc(currentUserRef, { [`userLists.${type}`]: userList });

    toast.success(`Rate added`);
  } catch (error) {
    console.error("Error while adding or removing from user lists: ", error);
    toast.error("An error occurred. Please try again.");
  }
};

export default setRating;
