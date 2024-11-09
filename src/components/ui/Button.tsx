import { ButtonHTMLAttributes, ReactNode } from "react";
import { modalProps } from "../../redux/slices/modalSlice";
import classNames from "classnames";
import TextTooltip from "./TextTooltip";

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement>, modalProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit";
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  tooltipText?: string;
}

const sizes = {
  sm: "text-sm py-[4px] px-2",
  md: "text-md py-[6px] px-4",
  lg: "text-lg py-[8px] px-6",
  xl: "text-xl py-[10px] px-8",
};
const roundedSizes = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full aspect-square",
};

const Button = ({
  children,
  onClick,
  openModal,
  modalId,
  size = "md",
  rounded = "lg",
  className = "",
  tooltipText,
  ...props
}: ButtonProps) => {
  const defaultClasses = `bg-gray-900 text-gray-50 border-0 hover:shadow-lg hover:scale-[1.03] transition-transform 
  duration-200 group 
  ${sizes[size]} ${roundedSizes[rounded]}`;

  const combinedClasses = classNames(defaultClasses, className);

  function handleClick() {
    onClick?.();
    if (openModal && modalId) {
      openModal({ modalId: modalId });
    }
  }

  return (
    <TextTooltip content={tooltipText}>
      <button {...props} className={combinedClasses} onClick={handleClick}>
        {children}
      </button>
    </TextTooltip>
  );
};

export default Button;
