import React, { useState, useEffect, useContext } from "react";
import { Table } from "../components/index";
import { Item } from "../Modules/Table/Functions/itemFuncs";
import ReDrawContext from "../store/redraw-context";
import { setOpen, increment } from "../store/slices/testModalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { TableProps } from "../Types/Types";
import { TableItemCreate } from "../Modules/Table/Components/TableItemCreate";

const ItemFuncs = new Item();

export const TablePage = () => {
  return (
    <section className="table-page">
      <TableItemCreate />
      <Table />
    </section>
  );
};
