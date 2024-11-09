import { Dispatch, SetStateAction, ChangeEvent } from "react";

interface ImageUploaderProps {
  setImageUrl: Dispatch<SetStateAction<string | null>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  setImageSaved: Dispatch<SetStateAction<boolean>>;
}
const ImageUploader = ({ setImageUrl, setImageFile, setImageSaved }: ImageUploaderProps) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setImageFile(file);
        setImageSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default ImageUploader;
