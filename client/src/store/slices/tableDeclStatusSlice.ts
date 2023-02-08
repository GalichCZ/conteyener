import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TableDeclStatus {
  open: boolean;
  declaration_number: string;
}

const initialState: TableDeclStatus = {
  open: false,
  declaration_number: "",
};

export const tableDeclStatusSlice = createSlice({
  name: "tableDeclStatus",
  initialState,
  reducers: {
    setOpenDeclStatus: (state) => {
      state.open = !state.open;
    },
    setDeclNumber: (state, action: PayloadAction<string>) => {
      state.declaration_number = action.payload;
    },
  },
});

export const { setOpenDeclStatus, setDeclNumber } =
  tableDeclStatusSlice.actions;
export default tableDeclStatusSlice.reducer;
