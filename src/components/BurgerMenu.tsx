import ThemeButton from "./ui/ThemeButton";
import { useTheme } from "./ThemeProvider";

interface BurgerMenuProps {
  openMenu: Function;
  isActive: boolean;
  setIsActive: Function;
}

const BurgerMenu = ({ openMenu, isActive, setIsActive }: BurgerMenuProps) => {
  const { toggleTheme } = useTheme();
  function handleClick() {
    openMenu();
    setIsActive(false);
  }

  return (
    <section
      className={`absolute w-full h-screen bg-gray-def  transition-all ease-in-out duration-300 z-50 sm:hidden ${
        isActive ? "translate-y-0 opacity-100" : "translate-y-[450px] opacity-0 pointer-events-none"
      }`}
    >
      <span className="w-[700px] h-1 border-b border-gray-100 absolute top-2 -left-32 bg-transition"> </span>

      <nav className="flex flex-col h-full w-full justify-between text-gray-600 gap-4 max-h-72 p-8 mx-auto max-w-md *:font-medium">
        <a className="link w-fit" href="#about" onClick={() => handleClick()}>
          About
        </a>
        <a className="link w-fit" href="#projects" onClick={() => handleClick()}>
          Projects
        </a>
        <a className="link w-fit" href="#contact" onClick={() => openMenu()}>
          Contact
        </a>

        <div className="flex  items-center justify-between relative">
          <span className="w-[700px] h-1 border-b border-gray-100 absolute -top-2 -left-32 bg-transition"> </span>
          <span className="font-normal" onClick={toggleTheme}>
            Switch theme
          </span>
          <ThemeButton />
        </div>
      </nav>
    </section>
  );
};

export default BurgerMenu;
