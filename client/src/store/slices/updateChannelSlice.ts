import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChannelObject } from "../../Types/Types";

export interface IUpdateChannel {
  open: boolean;
  itemId: string | undefined;
  channel: IChannelObject;
}

const initialState: IUpdateChannel = {
  open: false,
  itemId: "",
  channel: {
    name: "",
    eta: 0,
    date_do: 0,
    train_arrive_date: 0,
    train_depart_date: 0,
    store_arrive_date: 0,
    declaration_issue_date: 0,
  },
};

export const updateChannelSlice = createSlice({
  name: "updateChannel",
  initialState,
  reducers: {
    setOpenUpdateChannel: (state) => {
      state.open = !state.open;
    },
    setItemId: (state, action: PayloadAction<string | undefined>) => {
      state.itemId = action.payload;
    },
    setChannel: (state, action: PayloadAction<IChannelObject>) => {
      state.channel = action.payload;
    },
  },
});

export const { setOpenUpdateChannel, setChannel, setItemId } =
  updateChannelSlice.actions;
export default updateChannelSlice.reducer;
