import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "antd";
import { timeConvert } from "../Functions/TableHandlers";
import { MyInput } from "../../../components";
import {
  isChecked,
  onCheck,
  onType,
  resetFilters,
} from "../Functions/FilterFuncs";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { DateNames, DateNamesType } from "../utils/enums";

interface IProps {
  dataToFiltr: any[] | undefined;
  objectKey: string;
}

export const FilterList: React.FC<IProps> = ({ dataToFiltr, objectKey }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[] | undefined>();
  const [fetched, setFetched] = useState<any[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keySearchValue, setKeySearchValue] = useState<string | null>(null);

  const onCheckHandler = (e: CheckboxChangeEvent) => {
    onCheck(e, objectKey, searchParams, setSearchParams);
  };

  const prepareData = () => {
    if (dataToFiltr && (fetched?.length === 0 || fetched === undefined)) {
      if (Array.isArray(dataToFiltr[0])) {
        const concatenatedArray = [].concat(...dataToFiltr);
        const unique = [...new Set(concatenatedArray)];
        if (keySearchValue !== "" && keySearchValue !== null) {
          return setData(
            unique.filter((string: string) => string.includes(keySearchValue))
          );
        }
        setData(unique);
      } else {
        const unique = dataToFiltr.filter((element, index) => {
          return dataToFiltr.indexOf(element) === index && element;
        });
        if (keySearchValue !== "" && keySearchValue !== null) {
          return setData(
            unique.filter((string: string) => string.includes(keySearchValue))
          );
        }
        setData(unique);
      }
    } else {
      if (keySearchValue !== "" && keySearchValue !== null) {
        return setData(
          fetched?.filter((string: string) => string.includes(keySearchValue))
        );
      }
      setData(fetched);
    }
  };

  useEffect(() => {
    prepareData();
  }, [dataToFiltr]);

  useEffect(() => {
    prepareData();
    if (keySearchValue !== null) {
      onType(keySearchValue, data, setFetched, prepareData, objectKey);
    } else {
      prepareData();
    }
  }, [keySearchValue]);

  return (
    <div className="filter-list">
      <b>Фильтрация</b>
      <MyInput
        label=""
        value={keySearchValue !== null ? keySearchValue : ""}
        onChange={(e) => setKeySearchValue(e.target.value)}
      />
      <div className="filters">
        <Checkbox
          value={null}
          checked={isChecked("null", objectKey, searchParams)}
          onChange={onCheckHandler}
        >
          Пусто
        </Checkbox>
        <Checkbox
          value={"not_null"}
          checked={isChecked("not_null", objectKey, searchParams)}
          onChange={onCheckHandler}
        >
          Не пустая
        </Checkbox>
        {[...new Set(data)]?.map((el, key) => {
          return (
            <Checkbox
              key={key}
              checked={isChecked(el, objectKey, searchParams)}
              value={el}
              onChange={onCheckHandler}
            >
              {}
              {DateNames[objectKey as DateNamesType] !== undefined
                ? timeConvert(el)
                : el}
            </Checkbox>
          );
        })}
      </div>
      <Button onClick={() => resetFilters(navigate)}>Сбросить фильтры</Button>
    </div>
  );
};
