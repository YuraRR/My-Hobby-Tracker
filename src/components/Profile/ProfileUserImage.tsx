import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

import EditableImage from "./EditableImage";
import { UserData } from "../../types/userTypes";

const ProfileUserImage = (user: UserData) => {
  const imageName = `userAvatar-${user.displayName}`;
  const wrapperStyles =
    "relative group xs:-translate-y-12 md:ml-8 border-gray-def xs:border-8 size-28 md:size-36 aspect-square";
  const hoverEditText = "Edit avatar";
  const type = "photoURL";
  return (
    <EditableImage {...{ imageName, user, wrapperStyles, hoverEditText, type }}>
      {({ handleUpload, cancelUpload }) => (
        <div className="flex gap-3 absolute -bottom-9 right-1/2 translate-x-1/2 bg-gray-def px-2 rounded-md ">
          <button onClick={handleUpload}>
            <FontAwesomeIcon icon={faCheck} color="green" size="2x" />
          </button>
          <button onClick={cancelUpload}>
            <FontAwesomeIcon icon={faClose} color="red" size="2x" />
          </button>
        </div>
      )}
    </EditableImage>
  );
};

export default ProfileUserImage;
