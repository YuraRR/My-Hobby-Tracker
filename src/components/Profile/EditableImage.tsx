import { ReactNode, useEffect, useState } from "react";

import imageUpload from "../../firebase/imagesActions/imageUpload";

import { UserData } from "../../types/userTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../ImageUploader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

import { useActions } from "../../hooks/Usebindcreators";

interface EditableImageProps {
  imageName: string;
  user: UserData;
  wrapperStyles: string;
  hoverEditText?: string;
  type: "photoURL" | "bannerURL";
  children: (props: { handleUpload: () => Promise<void>; cancelUpload: () => void }) => ReactNode;
}

const EditableImage = ({ children, imageName, user, wrapperStyles, hoverEditText, type }: EditableImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSaved, setImageSaved] = useState<boolean>(true);

  const imageRoute = `usersImages/${user.displayName}/${imageName}`;
  const currentUser = useSelector((state: RootState) => state.user);

  const { updateField } = useActions();

  useEffect(() => {
    const fetchImageUrl = async () => {
      const existImage = user[type];
      existImage && setImageUrl(existImage);
      setImageSaved(true);
    };

    fetchImageUrl();
  }, [imageRoute]);

  const handleUpload = async () => {
    const imageLink = await imageUpload({ imageFile, imageRoute, currentUser, type });
    setImageSaved(true);
    imageLink && updateField({ field: type, value: imageLink });
  };

  const cancelUpload = () => {
    setImageUrl(null);
    setImageSaved(false);
  };

  const canEdit = (!imageUrl || imageSaved) && currentUser.uid == user.uid;

  return (
    <div className={wrapperStyles}>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={`w-full h-full bg-gray-500 bg-cover bg-center 
        ${canEdit ? "group-hover:brightness-50" : ""}`}
      />

      {canEdit ? (
        <div className="absolute inset-0 hidden group-hover:flex justify-center items-center">
          <div className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex flex-col gap-1">
            <FontAwesomeIcon icon={faCamera} color="white" size="2x" />
            <span className="text-white text-xs">{hoverEditText}</span>
          </div>
          <ImageUploader {...{ setImageUrl, setImageFile, setImageSaved }} />
        </div>
      ) : !imageSaved ? (
        children({ handleUpload, cancelUpload })
      ) : null}
    </div>
  );
};

export default EditableImage;
