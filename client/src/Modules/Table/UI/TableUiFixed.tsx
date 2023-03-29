import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { IItem, TableProps } from "../../../Types/Types";

interface ITableUi {
  items: TableProps[] | undefined;
  timeConvert: (time: string) => string;
  tableUpdateHandler?: (dispatch: any, item: IItem) => void;
  setHeights1?: (c: Array<number | null | undefined>) => void;
}

export const TableUiFixed: React.FC<ITableUi> = ({
  items,
  timeConvert,
  tableUpdateHandler,
  setHeights1,
}) => {
  const dispatch = useAppDispatch();
  const myRefs = useRef<Array<HTMLTableRowElement | null>>([]);
  const [height, setHeight] = useState<Array<number | null | undefined>>([]);
  const heights = useAppSelector((state) => state.heightHandler.heights);

  const getHeight = () => {
    if (myRefs.current) {
      setHeight(
        myRefs.current.map((ref) => {
          return ref?.clientHeight;
        })
      );
    }
  };

  useEffect(() => {
    if (height.length > 0 && setHeights1) setHeights1(height);
  }, [height]);

  useEffect(() => {
    getHeight();
  }, [items]);

  return (
    <tbody>
      {items?.map((item, key) => {
        return (
          <tr
            style={{ height: `${heights[key]}px` }}
            ref={(el) => (myRefs.current[key] = el)}
            key={key}
          >
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
