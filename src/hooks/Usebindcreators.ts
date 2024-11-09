// src/hooks/useActions.ts
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { setUser, clearUser, updateField } from "../redux/slices/userSlice";
import { closeModal, openModal } from "../redux/slices/modalSlice";
import { clearSearchTerm, setSearchActive, setSearchResult, setSearchTerm } from "../redux/slices/searchSlice";

const allActions = {
  setUser,
  clearUser,
  updateField,
  openModal,
  closeModal,
  setSearchTerm,
  setSearchResult,
  clearSearchTerm,
  setSearchActive,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
