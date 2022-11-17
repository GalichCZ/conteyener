import React from "react";
import { TableHeaderProps } from "./Types";

export const TableHeader = <T, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    const style = {
      borderBottom: "2px solid black",
    };

    return (
      <th key={`headCell-${index}`} style={style}>
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};
