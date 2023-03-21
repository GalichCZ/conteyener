import { configureStore } from "@reduxjs/toolkit";
import testModalReducer from "./slices/testModalSlice";
import tableDeclStatusReducer from "./slices/tableDeclStatusSlice";
import tableStoreReducer from "./slices/tableStoreSlice";
import tableCommentReducer from "./slices/tableCommentSlice";
import tableUploadReducer from "./slices/tableUploadSlice";
import tableFormulaDateReducer from "./slices/tableFormulaDateSlice";
import tableItemUpdateReducer from "./slices/tableItemUpdateSlice";
import tableDocsReducer from "./slices/tableDocsSlice";
import searchReducer from "./slices/searchSlice";
import stockModalReducer from "./slices/stockModalSlice";
import tableDateCalcReducer from "./slices/tableDateCalcModal";

export const store = configureStore({
  reducer: {
    testModal: testModalReducer,
    tableDeclStatus: tableDeclStatusReducer,
    tableStore: tableStoreReducer,
    tableComment: tableCommentReducer,
    tableUpload: tableUploadReducer,
    tableFormulaDate: tableFormulaDateReducer,
    tableItemUpdate: tableItemUpdateReducer,
    tableDocs: tableDocsReducer,
    search: searchReducer,
    stockModal: stockModalReducer,
    tableDateCalc: tableDateCalcReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
