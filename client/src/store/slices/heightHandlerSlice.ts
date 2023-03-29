import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface heightHandler {
  heights: number[];
}

const initialState: heightHandler = {
  heights: [],
};

export const heightHandlerSlice = createSlice({
  name: "heightHandler",
  initialState,
  reducers: {
    setHeights: (state, action: PayloadAction<number[]>) => {
      state.heights = action.payload;
    },
  },
});

export const { setHeights } = heightHandlerSlice.actions;
export default heightHandlerSlice.reducer;
