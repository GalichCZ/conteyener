import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { NavigateFunction } from "react-router-dom";
import { findByKeyValue } from "./itemFuncs";
import { timeConvert } from "./TableHandlers";

/* 
  TODO: make pagination to get filter values, 
  make search through getted values
*/
enum DateNames {
  "request_date",
  "ready_date",
  "load_date",
  "etd",
  "eta",
  "release",
  "date_do",
  "declaration_issue_date",
  "availability_of_ob",
  "answer_of_ob",
  "train_depart_date",
  "train_arrive_date",
  "store_arrive_date_update",
}

export const onCheck = (
  e: CheckboxChangeEvent,
  objectKey: string,
  searchParams: URLSearchParams,
  setSearchParams: (c: URLSearchParams | string) => void
) => {
  let value = e.target.value;
  if (
    (objectKey === "proform_number" && e.target.value === null) ||
    (objectKey === "inside_number" && e.target.value === null)
  )
    value = "[]";
  const before = searchParams.toString();
  if (before.includes(objectKey + "=" + encodeURIComponent(value))) {
    let after = before.replace(objectKey + "=" + encodeURIComponent(value), "");
    if (after[after.length - 1] === "&") after = after.slice(0, -1);
    setSearchParams(after);
  } else {
    searchParams.append(objectKey, value);
    setSearchParams(searchParams);
  }
};

export const onType = async <T>(
  value: string,
  filterValues: T[] | undefined,
  setData: (c: T[] | undefined) => void,
  prepareData: () => void,
  objectKey: string
) => {
  type DateNamesType = keyof typeof DateNames;
  const dateName = objectKey as DateNamesType;

  if (value.length === 0) return prepareData();
  const searchedFilter = filterValues?.filter((filterValue) => {
    const filter = filterValue as unknown as string;
    if (DateNames[dateName] !== undefined) {
      const convertedTime = timeConvert(filter);
      if (convertedTime.includes(value)) return filter;
    } else return filter.toLowerCase().includes(value);
  });

  if (searchedFilter?.length === 0) {
    const result = await findByKeyValue(objectKey, value);
    setData(result);
  }

  setData(searchedFilter);
};

export function resetFilters(navigate: NavigateFunction) {
  navigate(location.pathname, { replace: true });
}

export function isChecked(
  el: string,
  objectKey: string,
  searchParams: URLSearchParams
): boolean {
  let value = el;
  if (
    (objectKey === "proform_number" && el === "null") ||
    (objectKey === "inside_number" && el === "null")
  ) {
    value = "[]";
    const urlParams = searchParams.toString();
    return urlParams.includes(objectKey + "=" + encodeURI(value));
  } else if (objectKey === "request_date") {
    const urlParams = searchParams.toString();
    return urlParams.includes(
      objectKey + "=" + encodeURIComponent(value.toString())
    );
  } else {
    const urlParams = searchParams.toString();
    return urlParams.includes(objectKey + "=" + value);
  }
}
