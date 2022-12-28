import React, { useState, useEffect, useContext } from "react";
import { Table, TableItemCreate } from "../components/index";
import { Item } from "../functions/itemFuncs";
import ReDrawContext from "../store/redraw-context";
import { setOpen, increment } from "../store/slices/testModalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const ItemFuncs = new Item();

export const TablePage = () => {
  const dispatch = useAppDispatch();

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
      <button
        onClick={() => {
          dispatch(setOpen());
          dispatch(increment(6));
        }}
      >
        redux test
      </button>
      <TableItemCreate setLoad={setLoad} />
      <Table data={items} />
    </section>
  );
};
