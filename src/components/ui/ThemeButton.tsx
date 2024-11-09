import { useTheme } from "../ThemeProvider";
import Icon from "./Icon";

const ThemeButton: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-4" onClick={toggleTheme}>
      <span className="font-normal select-none cursor-pointer">Switch theme</span>
      <button
        className="hover:rotate-[360deg] transition-transform duration-1000 active:rotate-[-360deg] active:duration-200 active:translate-y-1 w-fit"
        aria-label="Toggle theme"
      >
        <Icon name="theme" />
      </button>
    </div>
  );
};

export default ThemeButton;
