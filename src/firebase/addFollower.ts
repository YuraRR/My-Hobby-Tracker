import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from ".";
import { UserData } from "../types/userTypes";

const addFollower = async (currentUser: UserData, user: UserData) => {
  const currentUserRef = doc(db, "usersData", currentUser.uid);
  const userRef = doc(db, "usersData", user.uid);

  try {
    await updateDoc(currentUserRef, { Following: arrayUnion(user.uid) });
    await updateDoc(userRef, { Followers: arrayUnion(currentUser.uid) });
    console.log("DisplayName добавлен в массив Following");
  } catch (error) {
    console.error("Ошибка при добавлении в массив Following: ", error);
  }
};
export default addFollower;
