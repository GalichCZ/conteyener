import { FilterFilled } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { TableProps } from "../../../Types/Types";
import { FilterList } from "../Components/FilterList";
import { checkRole } from "@/utils/checkRole";

interface ITableColProps {
  widthsArray?: number[];
  data: TableProps[] | undefined;
  setItems: (c: TableProps[]) => void;
  userRole?: string;
}
interface IPopupData {
  td: HTMLTableCellElement;
  dataToFiltr: any[] | undefined;
  key: string;
}

export const TableColNamesFixed: React.FC<ITableColProps> = ({
  widthsArray,
  data,
  setItems,
  userRole,
}) => {
  const [popupData, setPopupData] = useState<IPopupData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
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

  useEffect(() => {
    if (popupData) {
      const tdRect = popupData.td.getBoundingClientRect();
      const popupEl = popupRef.current;

      if (popupEl) {
        popupEl.style.transform = `translateX(${tdRect.left - 100}px)`;
      }
    }
  }, [popupData]);

  return (
    <>
      <thead>
        <tr>
          {checkRole(userRole, "request_date") && (
            <td>
              Дата заявки
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "request_date");
                }}
              />
            </td>
          )}
          <td>
            Внутренний <br /> номер
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "inside_number");
              }}
            />
          </td>
          <td>
            Номер <br /> проформы
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "proform_number");
              }}
            />
          </td>
          <td>
            Номер заказа
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "order_number");
              }}
            />
          </td>
          <td>
            Номер <br /> контейнера
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "container_number");
              }}
            />
          </td>
        </tr>
      </thead>
      {popupData && (
        <div ref={popupRef} id="popup">
          <FilterList objectKey={popupData.key} />
        </div>
      )}
    </>
  );
};
