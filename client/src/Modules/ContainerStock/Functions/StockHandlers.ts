import { IStockData } from "../Types";

export function dropInput(setData: (c: IStockData) => void) {
  setData({ name: "", address: "", contact: "", note: "", _id: "" });
}
