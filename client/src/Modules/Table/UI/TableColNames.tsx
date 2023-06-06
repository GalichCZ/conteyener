import { FilterFilled } from "@ant-design/icons";
import { TableSortHandler } from "../Functions/TableHandlers";
import React, { useEffect, useRef, useState } from "react";
import { TableProps } from "../../../Types/Types";
import { FilterList } from "../Components/FilterList";

interface ITableColProps {
  widthsArray?: number[];
  data: TableProps[] | undefined;
  setItems: (c: TableProps[]) => void;
}
interface IPopupData {
  td: HTMLTableCellElement;
  dataToFiltr: any[] | undefined;
  key: string;
}

export const TableColNames: React.FC<ITableColProps> = ({
  widthsArray,
  data,
  setItems,
}) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [popupData, setPopupData] = useState<IPopupData | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  function getRequestDates<T>(arr: T[], key: keyof T): Array<T[keyof T]> {
    return arr.map((obj) => obj[key]);
  }

  function handleTdClick<T extends Record<string, any>>(
    event: React.MouseEvent<HTMLTableCellElement>,
    key: keyof T & keyof TableProps
  ) {
    if (popupData === null) {
      const td = event.target as HTMLTableCellElement;

      const dataToFiltr = data && getRequestDates<TableProps>(data, key);

      const keyProp = key.toString();

      setPopupData({ td, dataToFiltr, key: keyProp });
    } else setPopupData(null);
  }
  function sort(key: keyof TableProps) {
    const sortedArray = TableSortHandler(
      key,
      data,
      sortDirection,
      setSortDirection
    );
    sortedArray && setItems(sortedArray);
  }

  useEffect(() => {
    if (popupData) {
      const tdRect = popupData.td.getBoundingClientRect();
      const popupEl = popupRef.current;

      if (popupEl) {
        popupEl.style.transform = `translateX(${tdRect.left - 650}px)`;
      }
    }
  }, [popupData]);
  return (
    <>
      <thead>
        <tr>
          <td>
            Товар
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "simple_product_name");
              }}
            />
          </td>
          <td>
            Способ доставки
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "delivery_method");
              }}
            />
          </td>
          <td>
            Поставщик
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "providers");
              }}
            />
          </td>
          <td>
            Импортер
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "importers");
              }}
            />
          </td>
          <td>
            Условия поставки
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "conditions");
              }}
            />
          </td>
          <td>Направление</td>
          <td>
            Склад
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "store_name");
              }}
            />
          </td>
          <td>
            Агент
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "agent");
              }}
            />
          </td>
          <td>
            Тип контейенра
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "order_number");
              }}
            />
          </td>
          <td>
            Место отправки
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "place_of_dispatch");
              }}
            />
          </td>
          <td>
            Линия
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "line");
              }}
            />
          </td>
          <td>
            Дата готовности
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "ready_date");
              }}
            />
          </td>
          <td>
            Дата загрузки
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "load_date");
              }}
            />
          </td>
          <td>
            ETD
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "etd");
              }}
            />
          </td>
          <td>
            ETA
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "eta");
              }}
            />
          </td>
          <td>
            Релиз
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "release");
              }}
            />
          </td>
          <td>
            BL/СМГС/CMR
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "bl_smgs_cmr");
              }}
            />
          </td>
          <td>
            ТД
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "td");
              }}
            />
          </td>
          <td>
            Дата ДО
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "date_do");
              }}
            />
          </td>
          <td>
            Порт
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "port");
              }}
            />
          </td>
          <td>
            Д/С для подачи
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "is_ds");
              }}
            />
          </td>
          <td>
            Фрахтовый счет
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "fraht_account");
              }}
            />
          </td>
          <td>Документы для подачи</td>
          <td>
            Номер декларации
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "declaration_number");
              }}
            />
          </td>
          <td>
            Дата выпуска декларации
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "declaration_issue_date");
              }}
            />
          </td>
          <td>
            Наличие ОБ
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "availability_of_ob");
              }}
            />
          </td>
          <td>
            Ответ ОБ
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "answer_of_ob");
              }}
            />
          </td>
          <td>
            Экспедитор
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "expeditor");
              }}
            />
          </td>
          <td>
            Станция прибытия
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "destination_station");
              }}
            />
          </td>
          <td>
            Осталось км до ст. назначения
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "km_to_dist");
              }}
            />
          </td>
          <td>
            Дата отправки по ЖД
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "train_depart_date");
              }}
            />
          </td>
          <td>
            Дата прибытия по ЖД
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "train_arrive_date");
              }}
            />
          </td>
          <td>
            Автовывоз
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "pickup");
              }}
            />
          </td>
          <td>
            Дата прибытия на склад
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "store_arrive_date");
              }}
            />
          </td>
          <td
            onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
              handleTdClick<TableProps>(event, "stock_place_name");
            }}
          >
            Сток Сдачи
          </td>
          <td>Комментарий</td>
        </tr>
      </thead>
      {popupData && (
        <div ref={popupRef} id="popup">
          <FilterList
            dataToFiltr={popupData.dataToFiltr}
            objectKey={popupData.key}
          />
        </div>
      )}
    </>
  );
};
