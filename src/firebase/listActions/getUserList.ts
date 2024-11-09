import { doc, getDoc } from "firebase/firestore";
import { db } from "..";
import { toast } from "sonner";

import { UserData } from "../../types/userTypes";

const getUserList = async (currentUser: UserData, type: string) => {
  const currentUserRef = doc(db, "usersData", currentUser.uid);
  try {
    const userDoc = await getDoc(currentUserRef);

    if (!userDoc.exists()) return toast.error("User document does not exist.");

    const userData = userDoc.data();
    const userList = userData.userLists?.[type] || [];

    return userList;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default getUserList;
