import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/shadcn/tooltip";
import { HTMLAttributes, ReactNode } from "react";

interface TextTooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delayDuration?: number;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const TextTooltip: React.FC<TextTooltipProps> = ({
  children,
  content,
  delayDuration = 150,
  position = "top",
  className,
}) => {
  return (
    <Tooltip {...{ delayDuration, position }}>
      <TooltipTrigger asChild>
        <span>{children}</span>
      </TooltipTrigger>
      {content && <TooltipContent className={className}>{content}</TooltipContent>}
    </Tooltip>
  );
};

export default TextTooltip;
