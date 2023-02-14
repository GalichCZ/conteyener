import React, { useState, useEffect, useContext } from "react";
import { Table, TableItemCreate } from "../components/index";
import { Item } from "../functions/itemFuncs";
import ReDrawContext from "../store/redraw-context";
import { setOpen, increment } from "../store/slices/testModalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { TableProps } from "../Types/Types";

const ItemFuncs = new Item();

export const TablePage = () => {
  const dispatch = useAppDispatch();

  const reDraw = useContext(ReDrawContext);
  const [load, setLoad] = useState<boolean>(false);
  const [items, setItems] = useState<TableProps[]>([
    {
      _id: "",
      request_date: "",
      order_number: [],
      container: {
        _id: "",
        container_number: "",
        container_type: "",
      },
      simple_product_name: "",
      delivery_method: "",
      providers: [],
      importers: [],
      conditions: "",
      store_name: "",
      store: {
        receiver: "",
        contact: "",
        note: "",
        techStore: "",
      },
      agent: "",
      place_of_dispatch: "",
      line: "",
      ready_date: "",
      load_date: "",
      etd: "",
      eta: "",
      eta_update: false,
      release: "",
      bl_smgs_cmr: false,
      td: false,
      date_do: "",
      date_do_update: false,
      port: "",
      is_ds: false,
      is_docs: {
        PI: false,
        CI: false,
        PL: false,
        SS_DS: false,
        contract_agrees: false,
        cost_agrees: false,
        instruction: false,
        ED: false,
        bill: false,
      },
      declaration_number: "",
      declaration_issue_date: "",
      declaration_issue_date_update: false,
      declaration_status: "",
      availability_of_ob: "",
      answer_of_ob: "",
      expeditor: "",
      destination_station: "",
      km_to_dist: 0,
      train_arrive_date: "",
      train_arrive_date_update: false,
      pickup: "",
      store_arrive_date: "",
      store_arrive_date_update: false,
      comment: "",
      fraht: "",
      bid: 0,
      note: "",
      creator: "",
    },
  ]);

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
