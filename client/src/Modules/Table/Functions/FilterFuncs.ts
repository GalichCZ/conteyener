import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { NavigateFunction } from "react-router-dom";
import { findByKeyValue } from "./itemFuncs";
import { timeConvert } from "./TableHandlers";
import { DateNames, DateNamesType } from "../utils/enums";

/* 
  TODO: make pagination to get filter values, 
  make search through getted values
*/

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
  if (before.includes(objectKey + "=" + customURLEncode(value))) {
    let after = before.replace(objectKey + "=" + customURLEncode(value), "");
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
    const arr = [].concat(...result);
    return setData(arr);
  }

  setData(searchedFilter);
};

export function resetFilters(navigate: NavigateFunction) {
  navigate(location.pathname, { replace: true });
}

function customURLEncode(str: string) {
  if (str === "+") {
    return str.replace("+", "%2B");
  }
  if (typeof str === "string") {
    // Replace spaces with '+'
    let encodedString = str.replace(/ /g, "+");

    // Replace specific characters with their literal forms
    encodedString = encodedString.replace(/\(/g, "%28");
    encodedString = encodedString.replace(/\)/g, "%29");
    encodedString = encodedString.replace(/,/g, "%2C");
    encodedString = encodedString.replace(/"/g, "%22");
    encodedString = encodedString.replace(/\r/g, "%0D");
    encodedString = encodedString.replace(/\//g, "%2F");
    encodedString = encodedString.replace(/:/g, "%3A");
    encodedString = encodedString.replace(/:/g, "%3A");

    encodedString = encodedString.replace(/[А-Яа-яЁё]/g, function (char) {
      return encodeURIComponent(char);
    });

    return encodedString;
  } else return str;
}

export function isChecked(
  el: string,
  objectKey: string,
  searchParams: URLSearchParams
): boolean {
  let value = typeof el === "string" ? el.replace(/ /g, "+") : el;
  const urlParams = searchParams.toString();
  if (
    (objectKey === "proform_number" && el === "null") ||
    (objectKey === "inside_number" && el === "null")
  ) {
    value = "[]";
    return urlParams.includes(objectKey + "=" + customURLEncode(value));
  } else if (DateNames[objectKey as DateNamesType] !== undefined) {
    return urlParams.includes(objectKey + "=" + customURLEncode(value));
  } else {
    return urlParams.includes(objectKey + "=" + customURLEncode(value));
  }
}
