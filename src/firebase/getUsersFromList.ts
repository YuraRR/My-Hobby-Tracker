import { getFirestore, doc, getDoc } from "firebase/firestore";
import getUserByUid from "./getUserByUid";

const db = getFirestore();

type ListType = "Following" | "Followers";

const getUsersFromList = async (uid: string, type: ListType) => {
  const userRef = doc(db, "usersData", uid);

  try {
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      const list = data[type] ?? [];

      const users = await Promise.all(list.map((uid: string) => getUserByUid(uid)));

      return users;
    } else {
      console.log("Документ не найден.");
      return [];
    }
  } catch (error) {
    console.error(`Ошибка при получении списка ${type}: `, error);
    return [];
  }
};

export default getUsersFromList;
