import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/shadcn/popover";

interface PopoverElemProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: any;
}

const PopoverElem = ({ trigger, children, className, isOpen, onOpenChange }: PopoverElemProps) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className={className}>{children}</PopoverContent>
    </Popover>
  );
};

export default PopoverElem;
