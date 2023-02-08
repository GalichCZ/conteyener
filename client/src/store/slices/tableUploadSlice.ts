import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TableUpload {
  open: boolean;
  item_id: string;
}

const initialState: TableUpload = {
  open: false,
  item_id: "",
};

export const tableUploadSlice = createSlice({
  name: "tableUpload",
  initialState,
  reducers: {
    setOpenUpload: (state) => {
      state.open = !state.open;
    },
    setUploadItemId: (state, action: PayloadAction<string>) => {
      state.item_id = action.payload;
    },
  },
});

export const { setOpenUpload, setUploadItemId } = tableUploadSlice.actions;
export default tableUploadSlice.reducer;
