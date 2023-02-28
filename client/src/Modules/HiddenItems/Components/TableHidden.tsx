import { useContext, useEffect, useState } from "react";
import { TableColNames } from "../../../components";
import { useAppSelector } from "../../../hooks/hooks";
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

const ItemFuncs = new Item();

export const TableHidden = () => {
  const reDraw = useContext(ReDrawContext);
  const [items, setItems] = useState<TableProps[]>();
  const [copyItems, setCopyItems] = useState<TableProps[]>();

  const query = useAppSelector((state) => state.search.value);

  const getItems = async () => {
    const data = await ItemFuncs.getHiddenItems();
    setItems(data.items);
    setCopyItems(data.items);
  };

  const search = async () => {
    const filtered =
      items && copyItems && (await SearchHandler(query, copyItems));
    filtered && setItems(filtered);
  };

  useEffect(() => {
    getItems().catch((err) => console.log(err));
  }, [reDraw.reDraw]);

  useEffect(() => {
    search();
  }, [query]);

  return (
    <div className="table-page_table">
      <table>
        <TableColNames setItems={setItems} data={copyItems} />
        <tbody>
          <TableUI
            items={items}
            checkTimeStyle={checkTimeStyle}
            timeConvert={timeConvert}
            docsCount={docsCount}
          />
        </tbody>
      </table>
    </div>
  );
};
