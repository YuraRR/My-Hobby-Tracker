import { doc, updateDoc } from "firebase/firestore";
import { db } from ".";
import { UserData } from "../types/userTypes";

const addSelectedCategories = async (currentUser: UserData, categories: Record<string, boolean>) => {
  const currentUserRef = doc(db, "usersData", currentUser.uid);
  try {
    await updateDoc(currentUserRef, { Categories: categories });
    console.log(categories);
  } catch (error) {
    console.error("Ошибка при добавлении в массив Categories: ", error);
  }
};
export default addSelectedCategories;
