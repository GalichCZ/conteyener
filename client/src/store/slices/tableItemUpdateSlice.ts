import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SingleItem } from "../../Types/Types";

export interface TableItemUpdate {
  open: boolean;
  item: SingleItem | null;
}

const initialState: TableItemUpdate = {
  open: false,
  item: null,
};

export const tableItemUpdateSlice = createSlice({
  name: "tableItemUpdate",
  initialState,
  reducers: {
    setOpenItemUpdate: (state) => {
      state.open = !state.open;
    },
    setItemUpdateItem: (state, action: PayloadAction<SingleItem>) => {
      state.item = action.payload;
    },
  },
});

export const { setOpenItemUpdate, setItemUpdateItem } =
  tableItemUpdateSlice.actions;
export default tableItemUpdateSlice.reducer;
