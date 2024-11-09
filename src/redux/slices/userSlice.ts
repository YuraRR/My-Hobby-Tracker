import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  displayName: string;
  email: string;
  photoURL: string;
  bannerURL: string;
  uid: string;
}

const initialState: UserState = {
  displayName: "",
  email: "",
  photoURL: "",
  bannerURL: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    clearUser() {
      return initialState;
    },
    updateField(state, action: PayloadAction<{ field: keyof UserState; value: any }>) {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { setUser, clearUser, updateField } = userSlice.actions;
export default userSlice.reducer;
