import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../../Types/Types";

export interface TableStore {
  open: boolean;
  itemId: string;
  storeData: Store;
}

const initialState: TableStore = {
  open: false,
  itemId: "",
  storeData: {
    receiver: "",
    contact: "",
    note: "",
    techStore: "",
  },
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
    setStoreData: (state, action: PayloadAction<Store>) => {
      state.storeData = action.payload;
    },
  },
});

export const { setOpenTableStore, setItemId, setStoreData } =
  tableStoreSlice.actions;
export default tableStoreSlice.reducer;
