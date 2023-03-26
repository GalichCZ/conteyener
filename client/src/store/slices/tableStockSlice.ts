import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IStockData } from "../../Modules/ContainerStock/Types";

export interface ITableStock {
  open: boolean;
  info: string;
}

const initialState: ITableStock = {
  open: false,
  info: "",
};

export const tableStockSlice = createSlice({
  name: "tableStock",
  initialState,
  reducers: {
    setOpenTableStock: (state) => {
      state.open = !state.open;
    },
    setTableStockInfo: (state, action: PayloadAction<string>) => {
      state.info = action.payload;
    },
  },
});

export const { setOpenTableStock, setTableStockInfo } = tableStockSlice.actions;
export default tableStockSlice.reducer;
