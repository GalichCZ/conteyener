import { useAppDispatch } from "../../hooks/hooks";
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
