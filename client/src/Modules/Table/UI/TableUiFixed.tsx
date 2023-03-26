import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { IItem, TableProps } from "../../../Types/Types";

interface ITableUi {
  items: TableProps[] | undefined;
  timeConvert: (time: string) => string;
  tableUpdateHandler?: (dispatch: any, item: IItem) => void;
  height: number;
  setHeight: (c: number) => void;
}

export const TableUiFixed: React.FC<ITableUi> = ({
  items,
  timeConvert,
  tableUpdateHandler,
  height,
  setHeight,
}) => {
  const dispatch = useAppDispatch();
  const myRefs = useRef<Array<HTMLTableRowElement | null>>([]);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const getHeight = () => {
    if (myRefs.current) {
      myRefs.current.map((ref) => {
        if (ref?.clientHeight) {
          if (ref?.clientHeight > height) {
            setHeight(ref?.clientHeight);
            console.log(ref?.clientHeight, "bigger left");
          }
        }
      });
    }
  };

  useEffect(() => {
    if (maxHeight > height) setHeight(maxHeight);
  }, [maxHeight, height]);

  useEffect(() => {
    getHeight();
  }, [items]);

  return (
    <tbody>
      {items?.map((item, key) => {
        return (
          <tr ref={(el) => (myRefs.current[key] = el)} key={key}>
            <td
              style={{ cursor: "pointer" }}
              onClick={() =>
                tableUpdateHandler && tableUpdateHandler(dispatch, item)
              }
            >
              {timeConvert(item.request_date)}
            </td>
            <td>
              <table className="table-importers">
                <tbody>
                  <tr>
                    {item.order_number.map((num, key) => {
                      return <td key={key}>{num}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </td>
            <td> {item.container?.container_number} </td>
          </tr>
        );
      })}
    </tbody>
  );
};
