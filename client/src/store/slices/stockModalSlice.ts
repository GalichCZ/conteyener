import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IStockData } from "../../Modules/ContainerStock/Types";

export interface StockModalState {
  open: boolean;
  data: IStockData;
}

const initialState: StockModalState = {
  open: false,
  data: { name: "", address: "", _id: "", contact: "", note: "" },
};

export const stockModalSlice = createSlice({
  name: "stockModal",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = !state.open;
    },
    setData: (state, action: PayloadAction<IStockData>) => {
      state.data = action.payload;
    },
  },
});

export const { setOpen, setData } = stockModalSlice.actions;
export default stockModalSlice.reducer;
