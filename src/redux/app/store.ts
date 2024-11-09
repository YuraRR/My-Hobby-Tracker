import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/localStorage"; // Ensure this is the correct path
import userReducer from "../slices/userSlice"; // Adjusted import path
import modalReducer from "../slices/modalSlice"; // Adjusted import path
import searchReducer from "../slices/searchSlice";
const preloadedState = {
  user: loadState(),
};

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    search: searchReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState().user);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
