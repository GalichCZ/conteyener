import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IsDocsType } from "../../Types/Types";

export interface ITableDocs {
  open: boolean;
  _id: string;
  docs: IsDocsType;
}

const initialState: ITableDocs = {
  open: false,
  _id: "",
  docs: {
    PI: false,
    PL: false,
    CI: false,
    SS_DS: false,
    contract_agrees: false,
    cost_agrees: false,
    instruction: false,
    ED: false,
    bill: false,
  },
};

export const tableDocsSlice = createSlice({
  name: "tableDocs",
  initialState,
  reducers: {
    setOpenDocs: (state) => {
      state.open = !state.open;
    },
    setDocsId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setDocs: (state, action: PayloadAction<IsDocsType>) => {
      state.docs = action.payload;
    },
  },
});

export const { setOpenDocs, setDocsId, setDocs } = tableDocsSlice.actions;

export default tableDocsSlice.reducer;
