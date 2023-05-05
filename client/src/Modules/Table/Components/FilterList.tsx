import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "antd";

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
    const before = searchParams.toString();
    if (before.includes(objectKey + "=" + e.target.value)) {
      let after = before.replace(objectKey + "=" + e.target.value, "");
      if (after[after.length - 1] === "&") after = after.slice(0, -1);
      setSearchParams(after);
    } else {
      searchParams.append(objectKey, e.target.value);
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
          return concatenatedArray.indexOf(element) === index;
        });
        setData(unique);
      } else {
        const unique = dataToFiltr.filter((element, index) => {
          return (
            dataToFiltr.indexOf(element) === index && element !== undefined
          );
        });
        setData(unique);
      }
    }
  }, [dataToFiltr, location.search]);

  function isChecked(el: string, key: number): boolean {
    console.log("el " + el, "key " + key);
    const urlParams = searchParams.toString();
    return urlParams.includes(objectKey + "=" + el);
    // return checkedPoints && el === checkedPoints[key] ? true : false;
  }

  return (
    <div className="filter-list">
      <b>Фильтрация</b>
      <div className="filters">
        {data?.map((el, key) => {
          return (
            <Checkbox
              key={key}
              checked={isChecked(el, key)}
              value={el}
              onChange={onCheck}
            >
              {el}
            </Checkbox>
          );
        })}
      </div>
      <Button onClick={resetFilters}>Сбросить фильтры</Button>
    </div>
  );
};
