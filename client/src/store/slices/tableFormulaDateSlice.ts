import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TableFormulaDate {
  open: boolean;
  _id: string;
  value: string;
  techStore: string;
  dateType: number;
}

const initialState: TableFormulaDate = {
  open: false,
  _id: "",
  value: "",
  techStore: "",
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
    setFormulaTechStore: (state, action: PayloadAction<string>) => {
      state.techStore = action.payload;
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
  setFormulaTechStore,
  setFormulaDateType,
} = tableFormulaDateSlice.actions;

export default tableFormulaDateSlice.reducer;
