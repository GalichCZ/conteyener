import {
  setOpenSearch,
  setValueSearch,
  setSearchFilter,
} from "../../../store/slices/searchSlice";

export const SearchHandler = (dispatch: any) => {
  dispatch(setOpenSearch());
};

export const SearchInputHandler = (dispatch: any, str: string) => {
  dispatch(setValueSearch(str));
};

export const SearchFilterHandler = (
  dispatch: any,
  searchFilter: "other" | "products"
) => {
  dispatch(setSearchFilter(searchFilter));
};
