import { createSlice } from "@reduxjs/toolkit";
import { Movie, Tv } from "../../types/movieTypes";

export interface SearchState {
  searchTerm: string;
  searchResult: Movie[] | Tv[];
  searchActive: boolean;
}

const initialState: SearchState = {
  searchTerm: "",
  searchResult: [],
  searchActive: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSearchResult(state, action) {
      state.searchResult = action.payload;
    },
    clearSearchTerm: () => initialState,
    setSearchActive(state, action) {
      state.searchActive = action.payload;
    },
  },
});

export const { setSearchTerm, setSearchResult, clearSearchTerm, setSearchActive } = searchSlice.actions;
export const selectSearchTerm = (state: { search: SearchState }) => state.search.searchTerm;
export const selectSearchResult = (state: { search: SearchState }) => state.search.searchResult;
export const selectSearchActive = (state: { search: SearchState }) => state.search.searchActive;
export default searchSlice.reducer;
