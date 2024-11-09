import { useCallback, useEffect, useState } from "react";
import Burger from "./ui/Burger/Burger";

import BurgerMenu from "./BurgerMenu";

import LoginButtons from "./LoginButtons";
import { Link } from "react-router-dom";
import SearchBlock from "./SearchBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useActions } from "../hooks/Usebindcreators";
import { selectSearchActive } from "../redux/slices/searchSlice";
import { useSelector } from "react-redux";

import PopoverElem from "./PopoverElem";

import TextTooltip from "./ui/TextTooltip";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { setSearchActive } = useActions();
  const searchActive = useSelector(selectSearchActive);

  const openMenu = () => {
    setIsActive((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };

  return (
    <div className="bg-gray-def fixed top-0 z-50 w-screen bg-transition">
      <header className="max-w-[1440px] flex center-between py-4 px-8 lg:px-24 mx-auto h-[68px]">
        <Burger {...{ openMenu, isActive }} />
        <Link to="/">
          <img
            src="/Icons/logo.png"
            alt="logo"
            className="hidden sm:block object-contain w-16 cursor-pointer hover:rotate-[360deg] transition-transform duration-1000 active:rotate-[-360deg] active:duration-200 active:translate-y-1"
          />
        </Link>

        <nav className="flex max-w-[533px] w-full text-gray-600 bg-transition items-center justify-end gap-3">
          <ul className="sm:flex justify-between w-full max-w-64 hidden">
            <li className="">
              <Link to="/movies">Movies</Link>
            </li>
            <li className="">
              <Link to="/tv">TV Shows</Link>
            </li>
            <li className="">
              <Link to="/games">Games</Link>
            </li>
          </ul>
          <TextTooltip content="Search">
            <PopoverElem
              className="w-screen rounded-none border-x-0"
              isOpen={searchActive}
              onOpenChange={setSearchActive}
              trigger={
                <FontAwesomeIcon
                  icon={!searchActive ? faSearch : faClose}
                  onClick={() => setSearchActive(!searchActive)}
                  className="w-8"
                />
              }
            >
              <div className="bg-gray-def px-8 md:px-16 lg:px-36 w-full">{<SearchBlock />}</div>
            </PopoverElem>
          </TextTooltip>
          <div className="pl-12">
            <LoginButtons />
          </div>
        </nav>
      </header>
      <BurgerMenu {...{ openMenu, isActive, setIsActive }} />
    </div>
  );
};

export default Header;
