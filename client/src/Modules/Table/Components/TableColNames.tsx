import { FilterFilled } from "@ant-design/icons";
import { TableSortHandler } from "../Functions/TableHandlers";
import React, { useState } from "react";
import { TableProps } from "../../../Types/Types";

interface ITableColProps {
  widthsArray: number[];
  data: TableProps[] | undefined;
  setItems: (c: TableProps[]) => void;
}

export const TableColNames: React.FC<ITableColProps> = ({
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
  // console.log(widthsArray);
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
          Номер заказа
          <FilterFilled
            onClick={() => {
              sort("order_number");
            }}
          />
        </td>
        <td>
          Номер контейнера
          <FilterFilled
            onClick={() => {
              sort("container");
            }}
          />
        </td>
        <td>
          Товар
          <FilterFilled
            onClick={() => {
              sort("simple_product_name");
            }}
          />
        </td>
        <td>
          Способ доставки
          <FilterFilled
            onClick={() => {
              sort("delivery_method");
            }}
          />
        </td>
        <td>
          Поставщик
          <FilterFilled
            onClick={() => {
              sort("providers");
            }}
          />
        </td>
        <td>
          Импортер
          <FilterFilled
            onClick={() => {
              sort("importers");
            }}
          />
        </td>
        <td>
          Условия поставки
          <FilterFilled
            onClick={() => {
              sort("conditions");
            }}
          />
        </td>
        <td>
          Склад
          <FilterFilled
            onClick={() => {
              sort("store_name");
            }}
          />
        </td>
        <td>
          Агент
          <FilterFilled
            onClick={() => {
              sort("agent");
            }}
          />
        </td>
        <td>
          Тип контейенра
          <FilterFilled
            onClick={() => {
              sort("order_number");
            }}
          />
        </td>
        <td>
          Место отправки
          <FilterFilled
            onClick={() => {
              sort("place_of_dispatch");
            }}
          />
        </td>
        <td>
          Линия
          <FilterFilled
            onClick={() => {
              sort("line");
            }}
          />
        </td>
        <td>
          Дата готовности
          <FilterFilled
            onClick={() => {
              sort("ready_date");
            }}
          />
        </td>
        <td>
          Дата загрузки
          <FilterFilled
            onClick={() => {
              sort("load_date");
            }}
          />
        </td>
        <td>
          ETD
          <FilterFilled
            onClick={() => {
              sort("etd");
            }}
          />
        </td>
        <td>
          ETA
          <FilterFilled
            onClick={() => {
              sort("eta");
            }}
          />
        </td>
        <td>
          Релиз
          <FilterFilled
            onClick={() => {
              sort("release");
            }}
          />
        </td>
        <td>
          BL/СМГС/CMR
          <FilterFilled
            onClick={() => {
              sort("bl_smgs_cmr");
            }}
          />
        </td>
        <td>
          ТД
          <FilterFilled
            onClick={() => {
              sort("td");
            }}
          />
        </td>
        <td>
          Дата ДО
          <FilterFilled
            onClick={() => {
              sort("date_do");
            }}
          />
        </td>
        <td>
          Порт
          <FilterFilled
            onClick={() => {
              sort("port");
            }}
          />
        </td>
        <td>
          Д/С для подачи
          <FilterFilled
            onClick={() => {
              sort("is_ds");
            }}
          />
        </td>
        <td>
          Документы для подачи
          <FilterFilled
            onClick={() => {
              sort("is_docs");
            }}
          />
        </td>
        <td>
          Номер декларации
          <FilterFilled
            onClick={() => {
              sort("declaration_number");
            }}
          />
        </td>
        <td>
          Дата выпуска декларации
          <FilterFilled
            onClick={() => {
              sort("declaration_issue_date");
            }}
          />
        </td>
        <td>
          Наличие ОБ
          <FilterFilled
            onClick={() => {
              sort("availability_of_ob");
            }}
          />
        </td>
        <td>
          Ответ ОБ
          <FilterFilled
            onClick={() => {
              sort("answer_of_ob");
            }}
          />
        </td>
        <td>
          Экспедитор
          <FilterFilled
            onClick={() => {
              sort("expeditor");
            }}
          />
        </td>
        <td>
          Станци прибытия
          <FilterFilled
            onClick={() => {
              sort("destination_station");
            }}
          />
        </td>
        <td>
          Осталось км до ст. назначения
          <FilterFilled
            onClick={() => {
              sort("km_to_dist");
            }}
          />
        </td>
        <td>
          Дата прибытия по ЖД
          <FilterFilled
            onClick={() => {
              sort("train_arrive_date");
            }}
          />
        </td>
        <td>
          Автовывоз
          <FilterFilled
            onClick={() => {
              sort("pickup");
            }}
          />
        </td>
        <td>
          Дата прибытия на склад
          <FilterFilled
            onClick={() => {
              sort("store_arrive_date");
            }}
          />
        </td>
        <td>Комментарий</td>
        {/* <td>Фрахт</td>
        <td>Ставка</td>
        <td>Примечания</td> */}
      </tr>
    </thead>
  );
};
