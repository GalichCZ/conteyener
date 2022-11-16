import React from "react";
import { Table, TableItemCreate } from "../components/index";

export const TablePage = () => {
  return (
    <section className="table-page">
      <TableItemCreate />
      <Table />
    </section>
  );
};
