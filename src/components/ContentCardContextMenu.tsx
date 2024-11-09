import { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/shadcn/context-menu";
import RatingSlider from "./ui/RatingSlider";
import { ContentType } from "../types/movieTypes";
import PopoverElem from "./PopoverElem";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddToListsBlock from "./AddToListsBlock";

interface ContentCardContextMenuProps {
  children: ReactNode;
  content: ContentType;
}

const ContentCardContextMenu = ({ children, content }: ContentCardContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="p-2">
        <PopoverElem trigger={<span className="hover:text-orange-400">★ Rate</span>}>
          <RatingSlider itemId={content.id} type={content.type}></RatingSlider>
        </PopoverElem>
        <div className="*:flex-col">
          <AddToListsBlock item={content} buttonsType="text"></AddToListsBlock>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContentCardContextMenu;
