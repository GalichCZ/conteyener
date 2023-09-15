import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import { useGetItemFilters } from "@/hooks/useGetItemFilters";
import { useIsHidden } from "@/hooks/useIsHidden";

interface IProps {
  objectKey: string;
}

export const FilterList: React.FC<IProps> = ({ objectKey }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keySearchValue, setKeySearchValue] = useState<string>("");
  const isHidden = useIsHidden();
  const { values, error, isLoading } = useGetItemFilters(objectKey, isHidden);
  const [mapThrough, setMapThrough] = useState([]);

  const onCheckHandler = (e: CheckboxChangeEvent) => {
    onCheck(e, objectKey, searchParams, setSearchParams);
  };

  useEffect(() => {
    if (keySearchValue) {
      console.log(keySearchValue);
      setMapThrough(
        values.filter((val: string) =>
          val.toLowerCase().includes(keySearchValue.toLowerCase())
        )
      );
    } else {
      setMapThrough(values);
    }
  }, [keySearchValue, setMapThrough, values]);

  return (
    <div className="filter-list">
      <b>Фильтрация</b>
      <MyInput
        label=""
        value={keySearchValue}
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
        {mapThrough.map((el, key) => {
          return (
            <Checkbox
              key={key}
              checked={isChecked(el, objectKey, searchParams)}
              value={el}
              onChange={onCheckHandler}
            >
              {el === true && "+"}
              {el === false && "-"}
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
