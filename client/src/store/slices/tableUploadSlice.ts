import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TableUpload {
  open: boolean;
  item_id: string;
  simple_product_name: string;
}

const initialState: TableUpload = {
  open: false,
  item_id: "",
  simple_product_name: "",
};

export const tableUploadSlice = createSlice({
  name: "tableUpload",
  initialState,
  reducers: {
    setOpenUpload: (state) => {
      state.open = !state.open;
    },
    setUploadItemId: (
      state,
      action: PayloadAction<{ item_id: string; simple_product_name: string }>
    ) => {
      state.item_id = action.payload.item_id;
      state.simple_product_name = action.payload.simple_product_name;
    },
  },
});

export const { setOpenUpload, setUploadItemId } = tableUploadSlice.actions;
export default tableUploadSlice.reducer;
