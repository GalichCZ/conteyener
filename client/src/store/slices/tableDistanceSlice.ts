import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITableDistance {
  open: boolean;
  distance: number | null;
  _id: string;
}

const initialState: ITableDistance = {
  open: false,
  distance: 0,
  _id: "",
};

export const tableDistanceSlice = createSlice({
  name: "tableDistance",
  initialState,
  reducers: {
    setOpenDistance: (state) => {
      state.open = !state.open;
    },
    setDistance: (state, action: PayloadAction<number | null>) => {
      state.distance = action.payload;
    },
    setDistanceId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
  },
});

export const { setOpenDistance, setDistance, setDistanceId } =
  tableDistanceSlice.actions;
export default tableDistanceSlice.reducer;
