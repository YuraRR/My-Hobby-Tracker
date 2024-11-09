import { getFirestore, collection, query, getDocs, orderBy, startAt, endAt } from "firebase/firestore";
import { UserData } from "../types/userTypes";

const db = getFirestore();

const findUsersByName = async (partialName: string): Promise<UserData[]> => {
  try {
    const usersRef = collection(db, "usersData");

    const q = query(usersRef, orderBy("displayName"), startAt(partialName), endAt(partialName + "\uf8ff"));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No users found with this search term.");
      return [];
    }

    // Возвращаем массив объектов UserData
    const users: UserData[] = querySnapshot.docs.map((doc) => ({
      uid: doc.id,
      displayName: doc.data().displayName,
      email: doc.data().email,
      photoURL: doc.data().photoURL,
      bannerURL: doc.data().bannerURL,
    }));

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default findUsersByName;
