import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITableCreate {
  open: boolean;
}

const initialState: ITableCreate = {
  open: false,
};

export const tableItemCreateSlice = createSlice({
  name: "tableItemCreate",
  initialState,
  reducers: {
    setOpenItemCreate: (state) => {
      state.open = !state.open;
    },
  },
});

export const { setOpenItemCreate } = tableItemCreateSlice.actions;
export default tableItemCreateSlice.reducer;
