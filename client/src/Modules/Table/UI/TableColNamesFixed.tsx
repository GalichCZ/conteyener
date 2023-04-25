import { FilterFilled } from "@ant-design/icons";
import { TableSortHandler } from "../Functions/TableHandlers";
import React, { useState } from "react";
import { TableProps } from "../../../Types/Types";

interface ITableColProps {
  widthsArray?: number[];
  data: TableProps[] | undefined;
  setItems: (c: TableProps[]) => void;
}

export const TableColNamesFixed: React.FC<ITableColProps> = ({
  widthsArray,
  data,
  setItems,
}) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  function sort(key: keyof TableProps) {
    const sortedArray = TableSortHandler(
      key,
      data,
      sortDirection,
      setSortDirection
    );
    sortedArray && setItems(sortedArray);
  }
  return (
    <thead>
      <tr>
        <td>
          Дата заявки
          <FilterFilled
            onClick={() => {
              sort("request_date");
            }}
          />
        </td>
        <td>
          Внутренний <br /> номер
        </td>
        <td>
          Номер <br /> проформы
        </td>
        <td>
          Номер заказа
          <FilterFilled
            onClick={() => {
              sort("order_number");
            }}
          />
        </td>
        <td>
          Номер <br /> контейнера
          <FilterFilled
            onClick={() => {
              sort("container_number");
            }}
          />
        </td>
      </tr>
    </thead>
  );
};
