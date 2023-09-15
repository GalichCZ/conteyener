import React, { useContext, useEffect, useRef, useState } from "react";
import { TableColNames } from "../../../components/index";
import * as Types from "../../../Types/Types";
import * as TableHandlers from "../Functions/TableHandlers";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooksRedux";
import { getItemsFilter, Item } from "../Functions/itemFuncs";
import ReDrawContext from "../../../store/redraw-context";
import TableUI from "../UI/TableUI";
import { TableColNamesFixed } from "../UI/TableColNamesFixed";
import { TableUiFixed } from "../UI/TableUiFixed";
import { setHeights } from "../../../store/slices/heightHandlerSlice";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { createExcelFile, downloadFile } from "../Functions/ExcelApi";
import { useLocation } from "react-router-dom";
import useColorText from "../../../hooks/useColorText";
import { TableHints } from "../UI/TableHints";
import SideMenu from "../UI/SideMenu";
import Search from "../../Search/Components/Search";
import { UsersHandlerClass } from "@/Modules/UsersHandle/Functions/UsersHandler";
import AuthContext from "@/store/auth-context";
import useDebounce from "@/hooks/useDebounce";

const ItemFuncs = new Item();
const UsersHandler = new UsersHandlerClass();

export const Table: React.FunctionComponent = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const reDraw = useContext(ReDrawContext);
  const [user, setUser] = useState<Types.UserData | undefined>(
    {} as Types.UserData
  );
  const [items, setItems] = useState<Types.TableProps[]>();
  const [copyItems, setCopyItems] = useState<Types.TableProps[]>();
  const [downloading, setDownloading] = useState<boolean>(false);
  const [widths] = useState<number[]>([]);
  const [tableHeight, setTableHeight] = useState<number>();
  const tableRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchFilter = useAppSelector((state) => state.search.searchFilter);
  const isHidden = location.pathname.includes("hidden");

  const [heights1, setHeights1] = useState<Array<number | null | undefined>>(
    []
  );
  const [heights2, setHeights2] = useState<Array<number | null | undefined>>(
    []
  );

  const userHandler = async () => {
    const user = await UsersHandler.getMe(window.localStorage.getItem("_id"));
    setUser(user);
  };

  useEffect(() => {
    userHandler();
  }, []);

  const handleDownloadClick = async () => {
    setDownloading(true);
    const response = await createExcelFile();
    if (response.success) {
      await downloadFile(response.fileName);
      setDownloading(false);
    }
  };

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

  const query = useAppSelector((state) => state.search.value);

  const getItems = async (pagination?: boolean) => {
    const data = await ItemFuncs.getItems(page);
    if (pagination && items) setItems(data.items);
    setItems(data.items);
    setTotalPages(data.totalPages);
    setCopyItems(data.items);
  };

  const getFilteredItems = async () => {
    const data = await getItemsFilter(location.search, isHidden);
    setItems(data.items);
    setCopyItems(data.items);
  };

  const search = useDebounce(async () => {
    const filtered =
      items &&
      copyItems &&
      (await TableHandlers.SearchHandler(
        searchFilter,
        query,
        isHidden,
        copyItems
      ));
    filtered && setItems(filtered);
  }, 200);

  useEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.offsetHeight);
    }
  }, [items]);

  useEffect(() => {
    if (location.search.length === 0)
      getItems().catch((err) => console.log(err));
    else getFilteredItems();
  }, [reDraw.reDraw, location.search]);

  useEffect(() => {
    getItems(true);
  }, [page]);

  useEffect(() => {
    search();
  }, [query]);

  const userRole = user && user.role;
  const authCtx = useContext(AuthContext);

  return (
    <>
      <div className="table-utils">
        {authCtx.role === "manager_int" && (
          <SideMenu
            downloading={downloading}
            handleDownloadClick={handleDownloadClick}
          />
        )}
        <Search />
      </div>
      <TableHints />

      <div className="table-page_table">
        <table>
          <TableColNames userRole={userRole} />
          <TableUI
            setHeights2={setHeights2}
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
            tableUpdateHandler={TableHandlers.tableUpdateHandler}
            tableCalcDateHandler={TableHandlers.tableCalcDateHandler}
            tableDistanceHandler={TableHandlers.distanceHandler}
            tableStockHandler={TableHandlers.tableStockInfoHandler}
            useColorTextHook={useColorText}
            userRole={userRole}
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
