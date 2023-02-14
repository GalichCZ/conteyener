import * as Types from "../../Types/Types";
import {
  setDeclNumber,
  setOpenDeclStatus,
} from "../../store/slices/tableDeclStatusSlice";
import {
  setItemId,
  setOpenTableStore,
  setStoreData,
} from "../../store/slices/tableStoreSlice";
import {
  setCommentId,
  setCommentValue,
  setOpenComment,
} from "../../store/slices/tableCommentSlice";
import {
  setOpenUpload,
  setUploadItemId,
} from "../../store/slices/tableUploadSlice";
import {
  setItemUpdateItem,
  setOpenItemUpdate,
} from "../../store/slices/tableItemUpdateSlice";
import {
  setFormulaDateType,
  setFormulaId,
  setFormulaTechStore,
  setFormulaValue,
  setOpenFormula,
} from "../../store/slices/tableFormulaDateSlice";
import {
  setDocs,
  setDocsId,
  setOpenDocs,
} from "../../store/slices/tableDocsSlice";

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
  _defValue: string,
  _techStoreId: string
) => {
  if (_defValue !== null) {
    dispatch(setOpenFormula());
    dispatch(setFormulaId(_itemId));
    dispatch(setFormulaTechStore(_techStoreId));
    dispatch(setFormulaValue(_defValue));
    dispatch(setFormulaDateType(dateType));
  }
};

export const SearchHandler = (
  searchReq: string,
  items: Types.TableProps[],
  itemsCopy: Types.TableProps[]
) => {
  if (searchReq.length === 0) return itemsCopy;
  const filtered = items.filter((item) => {
    const itemValues = Object.values(item)
      .map((value) => (typeof value === "number" ? value.toString() : value))
      .join(" ")
      .toLowerCase();
    return itemValues.includes(searchReq.toLowerCase());
  });
  console.log(filtered);
  return filtered;
};

export const TableSortHandler = () => {};
