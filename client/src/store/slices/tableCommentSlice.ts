import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TableComment {
  open: boolean;
  _id: string;
  value: string;
}

const initialState: TableComment = {
  open: false,
  _id: "",
  value: "",
};

export const tableCommentSlice = createSlice({
  name: "tableComment",
  initialState,
  reducers: {
    setOpenComment: (state) => {
      state.open = !state.open;
    },
    setCommentId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setCommentValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setOpenComment, setCommentId, setCommentValue } =
  tableCommentSlice.actions;
export default tableCommentSlice.reducer;
