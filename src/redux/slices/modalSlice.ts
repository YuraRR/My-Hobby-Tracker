import { ActionCreatorWithPayload, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalState {
  isOpen: boolean;
  size?: ModalSize;
  trailerId?: string;
  modalId: string | null;
}

export interface modalProps {
  openModal?: ActionCreatorWithPayload<{ modalId: string; size?: ModalSize; trailerId?: string }, string>;

  closeModal?: () => void;
  modalId?: string | false;
}

const initialState: ModalState = {
  trailerId: "",
  isOpen: false,
  size: "md",
  modalId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ modalId: string; size?: ModalSize; trailerId?: string }> // Use the new type here
    ) => {
      const { modalId, size = "md", trailerId = "" } = action.payload;
      state.isOpen = true;
      state.modalId = modalId;
      state.size = size;
      state.trailerId = trailerId;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
