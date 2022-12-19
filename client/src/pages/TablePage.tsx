import React, { useState, useEffect, useContext } from "react";
import { Table, TableItemCreate } from "../components/index";
import { Item } from "../functions/itemFuncs";
import ReDrawContext from "../store/redraw-context";

const ItemFuncs = new Item();

export const TablePage = () => {
  const reDraw = useContext(ReDrawContext);
  const [load, setLoad] = useState<boolean>(false);
  const [items, setItems] = useState();

  const getItems = async () => {
    const data = await ItemFuncs.getItems();
    setItems(data.items);
  };
  useEffect(() => {
    getItems().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (load || reDraw.reDraw) {
      getItems().catch((err) => console.log(err));
      setLoad(false);
      reDraw.reDrawHandler(false);
    }
  }, [load, reDraw.reDraw]);

  return (
    <section className="table-page">
      <TableItemCreate setLoad={setLoad} />
      <Table data={items} />
    </section>
  );
};
