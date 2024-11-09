import { useTheme } from "../ThemeProvider";

interface IconProps {
  name: string;
  styles?: string;
  onClick?: () => void;
}

const Icon = ({ name, styles, onClick }: IconProps) => {
  const { theme } = useTheme();
  return (
    <img onClick={onClick} src={`/Icons/${theme}Theme/icon-${name}-${theme}.svg`} alt={name} className={styles} />
  );
};

export default Icon;
