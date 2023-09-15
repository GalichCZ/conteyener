import { useContext, useEffect, useState } from "react";
import { TableColNames } from "../../../components";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooksRedux";
import ReDrawContext from "../../../store/redraw-context";
import { TableProps } from "../../../Types/Types";
import { Item, getItemsFilter } from "../../Table/Functions/itemFuncs";
import {
  checkTimeStyle,
  docsCount,
  SearchHandler,
  timeConvert,
  uploadHandler,
} from "../../Table/Functions/TableHandlers";
import TableUI from "../../Table/UI/TableUI";
import { hideItem } from "../../Table/Functions/itemFuncs";
import { setHeights } from "../../../store/slices/heightHandlerSlice";
import useColorText from "../../../hooks/useColorText";
import AuthContext from "@/store/auth-context";
import { useLocation } from "react-router-dom";
import Search from "@/Modules/Search/Components/Search";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import useDebounce from "@/hooks/useDebounce";
import { useIsHidden } from "@/hooks/useIsHidden";

const ItemFuncs = new Item();

export const TableHidden = () => {
  const reDraw = useContext(ReDrawContext);
  const [items, setItems] = useState<TableProps[]>();
  const [copyItems, setCopyItems] = useState<TableProps[]>();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isHidden = useIsHidden();
  const query = useAppSelector((state) => state.search.value);
  const searchFilter = useAppSelector((state) => state.search.searchFilter);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);

  const getItems = async (pagination?: boolean) => {
    const data = await ItemFuncs.getHiddenItems(page);
    if (pagination && items) setItems(data.items);
    setItems(data.items);
    setTotalPages(data.totalPages);
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

  const getFilteredItems = async () => {
    const data = await getItemsFilter(location.search, isHidden);
    setItems(data.items);
    setCopyItems(data.items);
  };

  useEffect(() => {
    if (location.search.length === 0)
      getItems().catch((err) => console.log(err));
    else getFilteredItems();
  }, [reDraw.reDraw, location.search]);

  const search = useDebounce(async () => {
    const filtered =
      items &&
      copyItems &&
      (await SearchHandler(searchFilter, query, isHidden, copyItems));
    filtered && setItems(filtered);
  }, 200);

  const hideItemHandler = async (_id: string, hidden: boolean) => {
    reDraw.reDrawHandler(true);
    const result = await hideItem(_id, hidden);
    if (result) reDraw.reDrawHandler(false);
  };

  useEffect(() => {
    getItems(true);
  }, [page]);

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
            uploadHandler={uploadHandler}
            hidden={true}
          />
        </table>
      </div>

      <div className="page-counter">
        <LeftCircleOutlined
          onClick={() => setPage((p) => (p > 1 ? p - 1 : 1))}
        />
        {page}/{totalPages}{" "}
        <RightCircleOutlined
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : totalPages))}
        />
      </div>
    </>
  );
};
