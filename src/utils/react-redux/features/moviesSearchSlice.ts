import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MoviesSearchState {
  isLoading: boolean;
  searchValue: string;
}

const initialState: MoviesSearchState = {
  isLoading: false,
  searchValue: "",
};

const moviesSearchSlice = createSlice({
  name: "moviesSearch",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setIsLoading, setSearchValue } = moviesSearchSlice.actions;

export default moviesSearchSlice.reducer;
