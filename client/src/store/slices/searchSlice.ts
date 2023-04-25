import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISearch {
  open: boolean;
  value: string;
  searchFilter: "other" | "products";
}

const initialState: ISearch = {
  open: false,
  value: "",
  searchFilter: "other",
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
    setSearchFilter: (state, action: PayloadAction<"other" | "products">) => {
      state.searchFilter = action.payload;
    },
  },
});

export const { setOpenSearch, setValueSearch, setSearchFilter } =
  searchSlice.actions;

export default searchSlice.reducer;
