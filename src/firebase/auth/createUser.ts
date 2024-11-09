import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "..";
import { UserData } from "../../types/userTypes";

const createUser = async (userData: UserData) => {
  const userId = userData.uid;

  const userDocRef = doc(db, "usersData", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    await setDoc(userDocRef, userData, { merge: true });
    console.log("User data updated.");
  } else {
    await setDoc(userDocRef, { ...userData, userLists: [] });
    console.log("Document successfully written with ID: ", userId);
  }
};

export default createUser;
