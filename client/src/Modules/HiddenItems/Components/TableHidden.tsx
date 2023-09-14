import { useContext, useEffect, useState } from "react";
import { TableColNames } from "../../../components";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooksRedux";
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
import useColorText from "../../../hooks/useColorText";
import AuthContext from "@/store/auth-context";
import { useLocation } from "react-router-dom";
import Search from "@/Modules/Search/Components/Search";

const ItemFuncs = new Item();

export const TableHidden = () => {
  const reDraw = useContext(ReDrawContext);
  const [items, setItems] = useState<TableProps[]>();
  const [copyItems, setCopyItems] = useState<TableProps[]>();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isHidden = location.pathname.includes("hidden");
  const query = useAppSelector((state) => state.search.value);
  const searchFilter = useAppSelector((state) => state.search.searchFilter);

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
      items &&
      copyItems &&
      (await SearchHandler(searchFilter, query, isHidden, copyItems));
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

  const authCtx = useContext(AuthContext);

  return (
    <>
      <div className="table-utils">
        <Search />
      </div>
      <div className="table-page_table">
        <table>
          <TableColNames userRole={authCtx.role} />
          <TableUI
            userRole={authCtx.role}
            useColorTextHook={useColorText}
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
    </>
  );
};
