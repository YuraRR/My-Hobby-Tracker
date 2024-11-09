import { useState } from "react";
import { categoriesList } from "../../constants/mainCategories";
import { modalProps } from "../../redux/slices/modalSlice";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";
import FallAnimation from "../ui/FallAnimation";
import addSelectedCategories from "../../firebase/addSelectedCategories";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

const SelectHobbiesModal = ({ openModal, closeModal }: modalProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isFalling, setIsFalling] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user);

  const handleClick = async () => {
    setIsFalling(true);
    await addSelectedCategories(currentUser, checkedItems);
    setTimeout(() => {
      closeModal?.();
      openModal?.({ modalId: "loginModal", size: "xl" });
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center gap-12 h-full">
      <FallAnimation isFalling={isFalling}>
        <h2>Choose your hobbies</h2>
      </FallAnimation>

      <ul className="flex flex-wrap gap-3 center">
        {categoriesList.map((category) => (
          <div key={category.name}>
            <li>
              <FallAnimation isFalling={isFalling}>
                <Checkbox {...{ checkedItems, setCheckedItems }} name={category.name} icon={category.icon} />
              </FallAnimation>
            </li>
          </div>
        ))}
      </ul>

      <div className="flex mt-auto">
        <FallAnimation isFalling={isFalling}>
          <Button size="xl" onClick={handleClick}>
            Next
          </Button>
        </FallAnimation>
      </div>
    </div>
  );
};

export default SelectHobbiesModal;
