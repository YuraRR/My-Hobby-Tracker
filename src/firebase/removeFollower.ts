import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from ".";
import { UserData } from "../types/userTypes";

const removeFollower = async (currentUser: UserData, user: UserData) => {
  const currentUserRef = doc(db, "usersData", currentUser.uid);
  const userRef = doc(db, "usersData", user.uid);
  try {
    await updateDoc(currentUserRef, { Following: arrayRemove(user.uid) });
    await updateDoc(userRef, { Followers: arrayRemove(currentUser.uid) });
    console.log("Элемент успешно удалён из массива.");
  } catch (error) {
    console.error("Ошибка при удалении элемента: ", error);
  }
};

export default removeFollower;
