import React, { useContext, useEffect, useRef, useState } from "react";
import { TableColNames } from "../../../components/index";
import * as Types from "../../../Types/Types";
import * as TableHandlers from "../Functions/TableHandlers";
import { useAppSelector } from "../../../hooks/hooks";
import { Item } from "../Functions/itemFuncs";
import ReDrawContext from "../../../store/redraw-context";
import TableUI from "../UI/TableUI";
import { TableColNamesFixed } from "../UI/TableColNamesFixed";
import { TableUiFixed } from "../UI/TableUiFixed";

const ItemFuncs = new Item();

export const Table: React.FunctionComponent = () => {
  const reDraw = useContext(ReDrawContext);
  const [items, setItems] = useState<Types.TableProps[]>();
  const [copyItems, setCopyItems] = useState<Types.TableProps[]>();
  const [widths] = useState<number[]>([]);

  const [height, setHeight] = useState<number>(0);

  const query = useAppSelector((state) => state.search.value);

  const headerRef = useRef(null);
  const dataRef = useRef<any>(null);

  const getItems = async () => {
    const data = await ItemFuncs.getItems();
    setItems(data.items);
    setCopyItems(data.items);
  };

  const search = async () => {
    const filtered =
      items &&
      copyItems &&
      (await TableHandlers.SearchHandler(query, copyItems));
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
    console.log(height, "final");
  }, [height]);

  useEffect(() => {
    search();
  }, [query]);

  return (
    <>
      <div className="table-page_table">
        <table className="table-page_fixed-table">
          <TableColNamesFixed
            widthsArray={widths}
            data={copyItems}
            setItems={setItems}
          />
          <TableUiFixed
            height={height}
            setHeight={setHeight}
            items={items}
            timeConvert={TableHandlers.timeConvert}
            tableUpdateHandler={TableHandlers.tableUpdateHandler}
          />
        </table>
        <div className="table-page_unfixed-table">
          <table>
            <TableColNames
              widthsArray={widths}
              data={copyItems}
              setItems={setItems}
            />
            <TableUI
              height={height}
              setHeight={setHeight}
              items={items}
              timeConvert={TableHandlers.timeConvert}
              docsCount={TableHandlers.docsCount}
              uploadHandler={TableHandlers.uploadHandler}
              tableStoreHandler={TableHandlers.tableStoreHandler}
              dateChangeHandler={TableHandlers.dateChangeHandler}
              tableDocsHandler={TableHandlers.tableDocsHandler}
              declStatusHandler={TableHandlers.declStatusHandler}
              tableCommentHandler={TableHandlers.tableCommentHandler}
              checkTimeStyle={TableHandlers.checkTimeStyle}
              tableCalcDateHandler={TableHandlers.tableCalcDateHandler}
              tableDistanceHandler={TableHandlers.distanceHandler}
              tableStockHandler={TableHandlers.tableStockInfoHandler}
            />
          </table>
        </div>
      </div>
    </>
  );
};
