import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown-menu";
import Button from "./Button";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { userStatusType } from "../../types/commonTypes";
import AddToUserListButton from "./Buttons/addToUserListButton";

interface SelectListToAddProps {
  buttonActive: string;
  buttonsType: "icon" | "text";
  changeUserStatus: (userStatus: userStatusType) => void;
  userStatusesList: userStatusType[];
}

const SelectListToAdd = ({
  buttonActive,
  buttonsType,
  changeUserStatus,
  userStatusesList,
}: SelectListToAddProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-block">
          <AddToUserListButton
            icon={faList}
            text={"Add to List"}
            colorClass="blue-700"
            buttonsType={buttonsType}
            buttonActive={{ userStatus: buttonActive, favorite: false, bookmarks: false }} // Преобразуем в объект
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-36 rounded-md pl-2">
        {userStatusesList.map((userStatus: userStatusType) => (
          <button
            key={userStatus}
            onClick={() => changeUserStatus(userStatus)}
            className={`text-left p-1 hover:bg-gray-200 `}
          >
            {userStatus} {buttonActive == userStatus && "✔"}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectListToAdd;
