import { ReactNode } from "react";

interface DropdownProps {
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const Dropdown = ({ dropdownOpen, setDropdownOpen, children }: DropdownProps) => {
  return (
    dropdownOpen && (
      <ul
        className="absolute top-9 right-0 flex flex-col gap-3 p-4 bg-gray-def rounded-b-xl overflow-auto z-999 w-48"
        onMouseEnter={() => setDropdownOpen(true)}
      >
        {children}
      </ul>
    )
  );
};

export default Dropdown;
