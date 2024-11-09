import Button from "../ui/Button";
import EditableImage from "./EditableImage";
import { UserData } from "../../types/userTypes";

const ProfileBanner = (user: UserData) => {
  const imageName = `userBanner-${user.displayName}`;
  const wrapperStyles = "w-full h-24 md:h-48 lg:h-64 relative group";
  const hoverEditText = "Edit your banner image";
  const type = "bannerURL";
  return (
    <EditableImage {...{ imageName, user, wrapperStyles, hoverEditText, type }}>
      {({ handleUpload, cancelUpload }) => (
        <div className="flex gap-2 absolute bottom-3 right-3">
          <Button onClick={handleUpload}>Save</Button>
          <Button onClick={cancelUpload}>Cancel</Button>
        </div>
      )}
    </EditableImage>
  );
};

export default ProfileBanner;
