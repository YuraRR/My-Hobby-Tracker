import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

const getUserByName = async (displayName: string) => {
  try {
    const usersRef = collection(db, "usersData");

    const q = query(usersRef, where("displayName", "==", displayName));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("User is not found.");
      return null;
    }

    const userData = querySnapshot.docs[0].data();
    return userData;
  } catch (error) {
    return null;
  }
};

export default getUserByName;
