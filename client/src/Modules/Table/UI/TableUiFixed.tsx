import React from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { IItem, TableProps } from "../../../Types/Types";

interface ITableUi {
  items: TableProps[] | undefined;
  timeConvert: (time: string) => string;
  tableUpdateHandler?: (dispatch: any, item: IItem) => void;
}

export const TableUiFixed: React.FC<ITableUi> = ({
  items,
  timeConvert,
  tableUpdateHandler,
}) => {
  const dispatch = useAppDispatch();

  return (
    <tbody>
      {items?.map((item, key) => {
        return (
          <tr key={key}>
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
