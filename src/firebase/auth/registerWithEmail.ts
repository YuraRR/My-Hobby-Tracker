// src/firebase/register.js
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "..";

const registerWithEmail = async (email: string, password: string): Promise<User | string> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User registered:", user);
    return user;
  } catch (error: any) {
    return error.message;
  }
};
export default registerWithEmail;
