import * as Types from "../../../Types/Types";
import {
  setDeclNumber,
  setOpenDeclStatus,
} from "../../../store/slices/tableDeclStatusSlice";
import {
  setItemId,
  setOpenTableStore,
  setStoreData,
} from "../../../store/slices/tableStoreSlice";
import {
  setCommentId,
  setCommentValue,
  setOpenComment,
} from "../../../store/slices/tableCommentSlice";
import {
  setOpenUpload,
  setUploadItemId,
} from "../../../store/slices/tableUploadSlice";
import {
  setItemUpdateItem,
  setOpenItemUpdate,
} from "../../../store/slices/tableItemUpdateSlice";
import {
  setDeliveryChannel,
  setFormulaDateType,
  setFormulaId,
  setFormulaValue,
  setOpenFormula,
} from "../../../store/slices/tableFormulaDateSlice";
import {
  setDocs,
  setDocsId,
  setOpenDocs,
} from "../../../store/slices/tableDocsSlice";
import { findItemsBySearch } from "./itemFuncs";
import dayjs from "dayjs";

export const declStatusHandler = (
  dispatch: any,
  declaration_number: string
) => {
  dispatch(setOpenDeclStatus());
  dispatch(setDeclNumber(declaration_number));
};

export const tableStoreHandler = (
  dispatch: any,
  itemId: string,
  storeData: Types.Store
) => {
  dispatch(setOpenTableStore());
  dispatch(setItemId(itemId));
  dispatch(setStoreData(storeData));
};

export const tableCommentHandler = (
  dispatch: any,
  _id: string,
  value: string
) => {
  dispatch(setOpenComment());
  dispatch(setCommentId(_id));
  dispatch(setCommentValue(value));
};

export const uploadHandler = (dispatch: any, item_id: string) => {
  dispatch(setOpenUpload());
  dispatch(setUploadItemId(item_id));
};

export const tableUpdateHandler = (dispatch: any, item: Types.IItem) => {
  dispatch(setOpenItemUpdate());
  dispatch(setItemUpdateItem(item));
};

export const tableDocsHandler = (
  dispatch: any,
  _id: string,
  docs: Types.IsDocsType
) => {
  dispatch(setOpenDocs());
  dispatch(setDocsId(_id));
  dispatch(setDocs(docs));
};

export const dateChangeHandler = (
  dispatch: any,
  dateType: number,
  _itemId: string,
  delivery_channel: string,
  _defValue: string
) => {
  if (_defValue !== null) {
    dispatch(setOpenFormula());
    dispatch(setFormulaId(_itemId));
    dispatch(setFormulaValue(_defValue));
    dispatch(setDeliveryChannel(delivery_channel));
    dispatch(setFormulaDateType(dateType));
  }
};

export const SearchHandler = async (
  searchReq: string,
  itemsCopy: Types.TableProps[]
) => {
  if (searchReq.length === 0) return itemsCopy;
  const filtered = itemsCopy.filter((item) => {
    const itemValues = Object.values(item)
      .map((value) => (typeof value === "number" ? value.toString() : value))
      .join(" ")
      .toLowerCase();
    return itemValues.includes(searchReq.toLowerCase());
  });
  if (filtered.length === 0) {
    let items = await findItemsBySearch(searchReq);
    console.log(items);
    return items;
  }
  console.log(filtered.length);
  return filtered;
};

export const TableSortHandler = (
  key: keyof Types.TableProps,
  data: Types.TableProps[] | undefined,
  sortDirection: "asc" | "desc",
  setSortDirection: (c: "asc" | "desc") => void
) => {
  const sortedArray: Types.TableProps[] | undefined = data && [...data];
  sortedArray &&
    sortedArray.sort((a, b) => {
      if (sortDirection === "asc") {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      } else {
        if (a[key] > b[key]) {
          return -1;
        }
        if (a[key] < b[key]) {
          return 1;
        }
        return 0;
      }
    });
  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  console.log(sortDirection, sortedArray);
  return sortedArray;
};

export const docsCount = (item: Types.IsDocsType) => {
  let a = 0;
  if (item) {
    const values = Object.values(item);
    if (values[0] === true) a += 1;
    if (values[1] === true) a += 1;
    if (values[2] === true) a += 1;
    if (values[3] === true) a += 1;
    if (values[4] === true) a += 1;
    if (values[5] === true) a += 1;
    if (values[6] === true) a += 1;
    if (values[7] === true) a += 1;
    if (values[8] === true) a += 1;
    if (a === 9) return "+";
  }
  return a;
};

export const checkTimeStyle = (time: string, time_update: boolean) => {
  const isExpired = new Date(time) < new Date();
  if (time_update) return "formula-date_update";
  if (!time_update && isExpired) return "formula-date red";
  return "formula-date";
};

export const timeConvert = (time: string) => {
  if (time === null) return "";
  else return dayjs(time).format("DD/MM/YYYY");
};
