import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

interface CheckboxProps {
  checkedItems: Record<string, boolean>;
  setCheckedItems: Dispatch<SetStateAction<Record<string, boolean>>>;
  name: string;
  icon?: IconDefinition;
}

const Checkbox = ({ checkedItems, setCheckedItems, name, icon }: CheckboxProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  return (
    <div
      className={`flex center py-2 px-10 relative gap-1 border-2 rounded-xl cursor-pointer select-none transition-colors ease-in-out duration-200 ${
        checkedItems[name] ? "border-blue-700" : "border-white"
      }`}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="transition-colors ease-in-out duration-200"
          color={checkedItems[name] ? "#1d4ed8" : "white"}
        />
      )}

      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        type="checkbox"
        name={name}
        checked={checkedItems[name] || false}
        onChange={handleCheckboxChange}
        className="absolute h-full w-full opacity-0"
      />
    </div>
  );
};

export default Checkbox;
