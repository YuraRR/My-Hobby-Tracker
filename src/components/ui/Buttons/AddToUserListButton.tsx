import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Button from "../Button";

interface AddToUserListButtonProps {
  type?: "favorite" | "bookmarks";
  icon: any;
  text: string;
  colorClass: string;
  buttonsType: "icon" | "text";
  buttonActive: { userStatus: string; favorite: boolean; bookmarks: boolean };
  addToList?: (type: "favorite" | "bookmarks") => void;
}

const AddToUserListButton = ({
  type,
  icon,
  text,
  colorClass,
  buttonsType,
  buttonActive,
  addToList,
}: AddToUserListButtonProps) => (
  <Button
    rounded={buttonsType == "icon" ? "full" : "sm"}
    className={buttonsType != "icon" ? "bg-gray-def text-gray-600" : ""}
    tooltipText={text}
    onClick={() => type && addToList?.(type)}
  >
    {buttonsType === "icon" ? (
      <FontAwesomeIcon
        icon={icon}
        className={clsx(
          "group-hover:text-" + colorClass,
          "size-4",
          type && buttonActive[type] && `text-${colorClass}`
        )}
      />
    ) : (
      text
    )}
  </Button>
);

export default AddToUserListButton;
