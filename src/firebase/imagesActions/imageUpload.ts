// imageUpload.ts
import { db, storage } from "..";
import { ref, uploadBytes } from "firebase/storage";
import getImageUrl from "./getImageUrl";
import { UserData } from "../../types/userTypes";
import { doc, updateDoc } from "firebase/firestore";

interface HandleUploadProps {
  imageFile: File | null;
  imageRoute: string;
  currentUser: UserData;
  type: "photoURL" | "bannerURL";
}

const imageUpload = async ({
  imageFile,
  imageRoute,
  currentUser,
  type,
}: HandleUploadProps): Promise<string | null> => {
  if (!imageFile) {
    return "Please select an image.";
  }

  const imageRef = ref(storage, `images/${imageRoute}`);
  try {
    await uploadBytes(imageRef, imageFile);
    const existImage = await getImageUrl(imageRoute);
    const currentUserRef = doc(db, "usersData", currentUser.uid);
    await updateDoc(currentUserRef, { [type]: existImage });

    return existImage;
  } catch (error) {
    console.error("Error uploading image:", error);
    return "Error uploading image.";
  }
};

export default imageUpload;
