import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TableStore {
  open: boolean;
  itemId: string;
  store: string;
}

const initialState: TableStore = {
  open: false,
  itemId: "",
  store: "",
};

export const tableStoreSlice = createSlice({
  name: "tableStore",
  initialState,
  reducers: {
    setOpenTableStore: (state) => {
      state.open = !state.open;
    },
    setItemId: (state, action: PayloadAction<string>) => {
      state.itemId = action.payload;
    },
    setStoreData: (state, action: PayloadAction<string>) => {
      state.store = action.payload;
    },
  },
});

export const { setOpenTableStore, setItemId, setStoreData } =
  tableStoreSlice.actions;
export default tableStoreSlice.reducer;
