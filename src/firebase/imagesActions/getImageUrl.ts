import { storage } from "../";
import { ref, getDownloadURL } from "firebase/storage";

const getImageUrl = async (imageSrc: string): Promise<string | null> => {
  try {
    const imageRef = ref(storage, `images/${imageSrc}`);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return null;
  }
};

export default getImageUrl;
