import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TableFormulaDate {
  open: boolean;
  _id: string;
  value: string;
  delivery_channel: string;
  dateType: number;
}

const initialState: TableFormulaDate = {
  open: false,
  _id: "",
  value: "",
  delivery_channel: "",
  dateType: 0,
};

export const tableFormulaDateSlice = createSlice({
  name: "tableFormulaDate",
  initialState,
  reducers: {
    setOpenFormula: (state) => {
      state.open = !state.open;
    },
    setFormulaId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setFormulaValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setDeliveryChannel: (state, action: PayloadAction<string>) => {
      state.delivery_channel = action.payload;
    },
    setFormulaDateType: (state, action: PayloadAction<number>) => {
      state.dateType = action.payload;
    },
  },
});

export const {
  setOpenFormula,
  setFormulaId,
  setFormulaValue,
  setDeliveryChannel,
  setFormulaDateType,
} = tableFormulaDateSlice.actions;

export default tableFormulaDateSlice.reducer;
