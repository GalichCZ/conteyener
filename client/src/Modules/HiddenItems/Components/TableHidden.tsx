import { useContext, useEffect, useState } from "react";
import { TableColNames } from "../../../components";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import ReDrawContext from "../../../store/redraw-context";
import { TableProps } from "../../../Types/Types";
import { Item } from "../../Table/Functions/itemFuncs";
import {
  checkTimeStyle,
  docsCount,
  SearchHandler,
  timeConvert,
} from "../../Table/Functions/TableHandlers";
import TableUI from "../../Table/UI/TableUI";
import { hideItem } from "../../Table/Functions/itemFuncs";
import { TableColNamesFixed } from "../../Table/UI/TableColNamesFixed";
import { TableUiFixed } from "../../Table/UI/TableUiFixed";
import { setHeights } from "../../../store/slices/heightHandlerSlice";

const ItemFuncs = new Item();

export const TableHidden = () => {
  const reDraw = useContext(ReDrawContext);
  const [items, setItems] = useState<TableProps[]>();
  const [copyItems, setCopyItems] = useState<TableProps[]>();
  const dispatch = useAppDispatch();

  const query = useAppSelector((state) => state.search.value);

  const getItems = async () => {
    const data = await ItemFuncs.getHiddenItems();
    setItems(data.items);
    setCopyItems(data.items);
  };

  const [heights1, setHeights1] = useState<Array<number | null | undefined>>(
    []
  );
  const [heights2, setHeights2] = useState<Array<number | null | undefined>>(
    []
  );

  useEffect(() => {
    dispatch(
      setHeights(
        heights1.map((num, index) =>
          Math.max(
            num ?? Number.MIN_SAFE_INTEGER,
            heights2[index] ?? Number.MIN_SAFE_INTEGER
          )
        )
      )
    );
  }, [heights1, heights2]);

  const search = async () => {
    const filtered =
      items && copyItems && (await SearchHandler(query, copyItems));
    filtered && setItems(filtered);
  };

  const hideItemHandler = async (_id: string, hidden: boolean) => {
    reDraw.reDrawHandler(true);
    const result = await hideItem(_id, hidden);
    if (result) reDraw.reDrawHandler(false);
  };

  useEffect(() => {
    getItems().catch((err) => console.log(err));
  }, [reDraw.reDraw]);

  useEffect(() => {
    search();
  }, [query]);

  return (
    <>
      <div className="table-page_table">
        <table className="table-page_fixed-table">
          <TableColNamesFixed data={copyItems} setItems={setItems} />
          <TableUiFixed
            setHeights1={setHeights1}
            items={items}
            timeConvert={timeConvert}
          />
        </table>
        <div className="table-page_unfixed-table">
          <table>
            <TableColNames setItems={setItems} data={copyItems} />
            <TableUI
              setHeights2={setHeights2}
              items={items}
              checkTimeStyle={checkTimeStyle}
              timeConvert={timeConvert}
              docsCount={docsCount}
              hideItem={hideItemHandler}
              hidden={true}
            />
          </table>
        </div>
      </div>
    </>
  );
};
