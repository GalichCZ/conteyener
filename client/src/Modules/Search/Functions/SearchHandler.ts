import {
  setOpenSearch,
  setValueSearch,
} from "../../../store/slices/searchSlice";

export const SearchHandler = (dispatch: any) => {
  dispatch(setOpenSearch());
};

export const SearchInputHandler = (dispatch: any, str: string) => {
  dispatch(setValueSearch(str));
};
