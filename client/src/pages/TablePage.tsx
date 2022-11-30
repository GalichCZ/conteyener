import React, { useState, useEffect } from "react";
import { Table, TableItemCreate } from "../components/index";
import { Item } from "../functions/itemFuncs";

const ItemFuncs = new Item();

export const TablePage = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    const getItems = async () => {
      const data = await ItemFuncs.getItems();
      setItems(data.items);
    };

    getItems().catch((err) => console.log(err));
  }, []);

  return (
    <section className="table-page">
      <TableItemCreate />
      <Table data={items} />
    </section>
  );
};
