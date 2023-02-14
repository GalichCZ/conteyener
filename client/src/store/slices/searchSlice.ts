import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISearch {
  open: boolean;
  value: string;
}

const initialState: ISearch = {
  open: false,
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setOpenSearch: (state) => {
      state.open = !state.open;
    },
    setValueSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setOpenSearch, setValueSearch } = searchSlice.actions;

export default searchSlice.reducer;
