import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITableDateCalc {
  open: boolean;
  etd: string | null | undefined;
  delivery_channel: string;
  itemId: string;
}

const initialState: ITableDateCalc = {
  open: false,
  etd: null,
  delivery_channel: "",
  itemId: "",
};

export const tableDateCalcSlice = createSlice({
  name: "tableDateCalc",
  initialState,
  reducers: {
    setOpenDateCalc: (state) => {
      state.open = !state.open;
    },
    setCalcData: (
      state,
      action: PayloadAction<{
        etd: string | null | undefined;
        delivery_channel: string;
        itemId: string;
      }>
    ) => {
      state.delivery_channel = action.payload.delivery_channel;
      state.etd = action.payload.etd;
      state.itemId = action.payload.itemId;
    },
  },
});

export const { setOpenDateCalc, setCalcData } = tableDateCalcSlice.actions;
export default tableDateCalcSlice.reducer;
