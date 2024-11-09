import { createPortal } from "react-dom";
import "./Modal.css";
import Animated from "../../../components/Animated";
import { MouseEvent } from "react";
import { useActions } from "../../../hooks/Usebindcreators";
import { RootState } from "../../../redux/app/store";
import { useSelector } from "react-redux";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import SelectHobbiesModal from "../SelectHobbiesModal";
import TrailerModal from "../TrailerModal";

const sizes = {
  sm: "max-w-[340px]",
  md: "max-w-[400px]",
  lg: "max-w-[470px]",
  xl: "max-w-[550px]",
  full: "max-w-[1300px]",
};
const Modal = () => {
  const { openModal, closeModal } = useActions();
  const { isOpen, modalId, size, trailerId } = useSelector((state: RootState) => state.modal);
  if (!isOpen) return null;

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "modal-overlay") {
      closeModal();
    }
  };

  const renderModalContent = () => {
    switch (modalId) {
      case "loginModal":
        return <LoginModal {...{ closeModal }} />;
      case "registerModal":
        return <RegisterModal {...{ openModal, closeModal }} />;
      case "selectHobbiesModal":
        return <SelectHobbiesModal {...{ openModal, closeModal }} />;
      case "trailerModal":
        return <TrailerModal {...{ openModal, closeModal, trailerId }} />;
      default:
        return null;
    }
  };

  return createPortal(
    <div id="modal-overlay" className="modal-overlay" onClick={handleOutsideClick}>
      <Animated initialY={0}>
        <div className={`modal-content ${size && sizes[size]}`}>
          <button className="modal-close" onClick={() => closeModal()}>
            &times;
          </button>

          {renderModalContent()}
        </div>
      </Animated>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
