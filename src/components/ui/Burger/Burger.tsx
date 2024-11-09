import styles from "./Burger.module.css";

interface BurgerProps {
  openMenu: Function;
  isActive: boolean;
}

const Burger = ({ openMenu, isActive }: BurgerProps) => {
  return (
    <>
      <button className={`${styles.burger_btn} ${isActive && styles.active}`} onClick={() => openMenu()}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
};

export default Burger;
