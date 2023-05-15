import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "antd";
import { timeConvert } from "../Functions/TableHandlers";
import dayjs from "dayjs";
import { MyInput } from "../../../components";

interface IProps {
  dataToFiltr: any[] | undefined;
  objectKey: string;
}

interface QueryParams {
  [key: string]: string[];
}

export const FilterList: React.FC<IProps> = ({ dataToFiltr, objectKey }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<any[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const onCheck = (e: any) => {
    let value = e.target.value;
    if (
      (objectKey === "proform_number" && e.target.value === null) ||
      (objectKey === "inside_number" && e.target.value === null)
    )
      value = "[]";
    const before = searchParams.toString();
    if (before.includes(objectKey + "=" + encodeURIComponent(value))) {
      let after = before.replace(
        objectKey + "=" + encodeURIComponent(value),
        ""
      );
      if (after[after.length - 1] === "&") after = after.slice(0, -1);
      setSearchParams(after);
    } else {
      searchParams.append(objectKey, value);
      setSearchParams(searchParams);
    }
  };
  function resetFilters() {
    navigate(location.pathname, { replace: true });
  }
  useEffect(() => {
    if (dataToFiltr) {
      if (Array.isArray(dataToFiltr[0])) {
        const concatenatedArray = [].concat(...dataToFiltr);
        const unique = concatenatedArray.filter((element, index) => {
          return concatenatedArray.indexOf(element) === index && element !== "";
        });
        setData(unique);
      } else {
        const unique = dataToFiltr.filter((element, index) => {
          return dataToFiltr.indexOf(element) === index && element !== null;
        });
        setData(unique);
      }
    }
  }, [dataToFiltr, location.search]);

  function isChecked(el: string): boolean {
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

  return (
    <div className="filter-list">
      <b>Фильтрация</b>
      <MyInput label="" />
      <div className="filters">
        <Checkbox value={null} checked={isChecked("null")} onChange={onCheck}>
          Пусто
        </Checkbox>
        {data?.map((el, key) => {
          return (
            <Checkbox
              key={key}
              checked={isChecked(el)}
              value={el}
              onChange={onCheck}
            >
              {objectKey === "request_date" ? timeConvert(el) : el}
            </Checkbox>
          );
        })}
      </div>
      <Button onClick={resetFilters}>Сбросить фильтры</Button>
    </div>
  );
};
