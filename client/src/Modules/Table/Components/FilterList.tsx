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
  const [searchParams, setSearchParams] = useSearchParams();
  const [keySearchValue, setKeySearchValue] = useState<string | null>(null);

  const onCheckHandler = (e: CheckboxChangeEvent) => {
    onCheck(e, objectKey, searchParams, setSearchParams);
  };

  const prepareData = () => {
    if (dataToFiltr) {
      if (Array.isArray(dataToFiltr[0])) {
        const concatenatedArray = [].concat(...dataToFiltr);
        const unique = concatenatedArray.filter((element, index) => {
          return (
            concatenatedArray.indexOf(element) === index &&
            element !== "" &&
            element
          );
        });
        setData(unique);
      } else {
        const unique = dataToFiltr.filter((element, index) => {
          return dataToFiltr.indexOf(element) === index && element;
        });
        setData(unique);
      }
    }
  };

  useEffect(() => {
    prepareData();
  }, [dataToFiltr]);

  useEffect(() => {
    prepareData();
    if (keySearchValue !== null) {
      onType(keySearchValue, data, setData, prepareData, objectKey);
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
        {data?.map((el, key) => {
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
