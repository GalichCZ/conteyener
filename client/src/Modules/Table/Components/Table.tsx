import React, { useContext, useEffect, useRef, useState } from "react";
import { TableColNames, ShowDelivery } from "../../../components/index";
import * as Types from "../../../Types/Types";
import dayjs from "dayjs";
import * as ModalHandlers from "../Functions/TableHandlers";
import { useAppSelector } from "../../../hooks/hooks";
import { Item } from "../Functions/itemFuncs";
import ReDrawContext from "../../../store/redraw-context";
import TableUI from "../UI/TableUI";

const ItemFuncs = new Item();

export const Table: React.FunctionComponent = () => {
  const reDraw = useContext(ReDrawContext);
  const [items, setItems] = useState<Types.TableProps[]>();
  const [copyItems, setCopyItems] = useState<Types.TableProps[]>();
  const [widths] = useState<number[]>([]);

  const query = useAppSelector((state) => state.search.value);

  const headerRef = useRef(null);
  const dataRef = useRef<any>(null);

  const getItems = async () => {
    const data = await ItemFuncs.getItems();
    setItems(data.items);
    setCopyItems(data.items);
  };

  const docsCount = (item: Types.IsDocsType) => {
    let a = 0;
    if (item) {
      const values = Object.values(item);
      if (values[0] === true) a += 1;
      if (values[1] === true) a += 1;
      if (values[2] === true) a += 1;
      if (values[3] === true) a += 1;
      if (values[4] === true) a += 1;
      if (values[5] === true) a += 1;
      if (values[6] === true) a += 1;
      if (values[7] === true) a += 1;
      if (values[8] === true) a += 1;
      if (a === 9) return "+";
    }
    return a;
  };

  const timeConvert = (time: string) => {
    if (time === null) return "";
    else return dayjs(time).format("DD/MM/YYYY");
  };

  function checkTimeStyle(time: string, time_update: boolean) {
    const isExpired = new Date(time) < new Date();
    if (time_update) return "formula-date_update";
    if (!time_update && isExpired) return "formula-date red";
    return "formula-date";
  }

  const search = async () => {
    const filtered =
      items &&
      copyItems &&
      (await ModalHandlers.SearchHandler(query, copyItems));
    filtered && setItems(filtered);
  };

  useEffect(() => {
    getItems().catch((err) => console.log(err));
  }, [reDraw.reDraw]);

  useEffect(() => {
    if (dataRef.current) {
      for (let i = 0; i < dataRef.current.children.length; i++) {
        widths.push(dataRef.current.children[i].offsetWidth);
      }
    }
  }, []);

  useEffect(() => {
    search();
  }, [query]);

  return (
    <>
      <div className="table-page_table">
        <table>
          <TableColNames
            widthsArray={widths}
            data={copyItems}
            setItems={setItems}
          />

          <tbody>
            <TableUI
              items={items}
              timeConvert={timeConvert}
              docsCount={docsCount}
              tableUpdateHandler={ModalHandlers.tableUpdateHandler}
              uploadHandler={ModalHandlers.uploadHandler}
              tableStoreHandler={ModalHandlers.tableStoreHandler}
              dateChangeHandler={ModalHandlers.dateChangeHandler}
              tableDocsHandler={ModalHandlers.tableDocsHandler}
              declStatusHandler={ModalHandlers.declStatusHandler}
              tableCommentHandler={ModalHandlers.tableCommentHandler}
              checkTimeStyle={checkTimeStyle}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};
