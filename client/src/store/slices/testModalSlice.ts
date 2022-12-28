import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface TestModalState {
  open: boolean;
  number: number;
}

const initialState: TestModalState = {
  open: false,
  number: 0,
};

export const testModalSlice = createSlice({
  name: "testModal",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = !state.open;
    },
    increment: (state, action: PayloadAction<number>) => {
      state.number = action.payload;
    },
  },
});

export const { setOpen, increment } = testModalSlice.actions;
export const selectCount = (state: RootState) => state.testModal.open;
export default testModalSlice.reducer;
