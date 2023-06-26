import { FilterFilled } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { TableProps } from "@/Types/Types";
import { FilterList } from "../Components/FilterList";
import { checkRole } from "@/utils/checkRole";
import { colNames } from "./colNames";

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

export const TableColNames: React.FC<ITableColProps> = ({
  widthsArray,
  data,
  setItems,
  userRole,
}) => {
  const [popupData, setPopupData] = useState<IPopupData | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  function getRequestDates<T>(arr: T[], key: keyof T): Array<T[keyof T]> {
    return arr?.map((obj) => obj[key]);
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
        popupEl.style.transform = `translateX(${tdRect.left - 650}px)`;
      }
    }
  }, [popupData]);

  return (
    <>
      <thead>
        <tr>
          {colNames.map((name) => {
            return (
              checkRole(userRole, name.key) && (
                <td>
                  {name.name}
                  {/* {name.hasFilter ? (
                    <FilterFilled
                      onClick={(
                        event: React.MouseEvent<HTMLTableCellElement>
                      ) => {
                        handleTdClick<TableProps>(
                          event,
                          name.key as keyof TableProps
                        );
                      }}
                    />
                  ) : (
                    ""
                  )} */}
                </td>
              )
            );
          })}
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
