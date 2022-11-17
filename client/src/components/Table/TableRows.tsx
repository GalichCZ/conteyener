import React from "react";
import { TableRowsProps } from "./Types";

export const TableRows = <T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, index2) => {
          return <td key={`cell-${index2}`}>{/* {row[column.key]} */}</td>;
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};
