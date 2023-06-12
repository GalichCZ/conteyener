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
import { debounce } from "lodash";
import { RightCircleOutlined } from "@ant-design/icons";
import { TableNamesFixed } from "../UI/TableNamesFixed";
import { TableNamesUnfixed } from "../UI/TableNamesUnfixed";
import { createExcelFile, downloadFile } from "../Functions/ExcelApi";
import { useLocation } from "react-router-dom";
import useColorText from "../../../hooks/useColorText";
import { TableHints } from "../UI/TableHints";
import SideMenu from "../UI/SideMenu";
import Search from "../../Search/Components/Search";

const ItemFuncs = new Item();

export const Table: React.FunctionComponent = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const reDraw = useContext(ReDrawContext);
  const [items, setItems] = useState<Types.TableProps[]>();
  const [copyItems, setCopyItems] = useState<Types.TableProps[]>();
  const [downloading, setDownloading] = useState<boolean>(false);
  const [widths] = useState<number[]>([]);
  const [tableHeight, setTableHeight] = useState<number>();
  const tableRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchFilter = useAppSelector((state) => state.search.searchFilter);

  const [heights1, setHeights1] = useState<Array<number | null | undefined>>(
    []
  );
  const [heights2, setHeights2] = useState<Array<number | null | undefined>>(
    []
  );

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
    if (pagination && items) setItems([...items, data.items]);
    setItems(data.items);
    setTotalPages(data.totalPages);
    setCopyItems(data.items);
  };

  const getFilteredItems = async () => {
    const data = await getItemsFilter(location.search);
    setItems(data.items);
    setCopyItems(data.items);
  };

  const search = debounce(async () => {
    const filtered =
      items &&
      copyItems &&
      (await TableHandlers.SearchHandler(searchFilter, query, copyItems));
    filtered && setItems(filtered);
  }, 1000);

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
    console.log("f");
    getItems(true);
  }, [page]);

  useEffect(() => {
    search();
  }, [query]);

  return (
    <>
      <div className="table-utils">
        <SideMenu
          downloading={downloading}
          handleDownloadClick={handleDownloadClick}
        />
        <Search />
      </div>
      <TableHints />

      <div className="table-page_table">
        {/* <TableNamesFixed /> */}
        <table className="table-page_fixed-table">
          <TableColNamesFixed
            widthsArray={widths}
            data={copyItems}
            setItems={setItems}
          />
          <TableUiFixed
            setHeights1={setHeights1}
            items={items}
            timeConvert={TableHandlers.timeConvert}
            tableUpdateHandler={TableHandlers.tableUpdateHandler}
            useColorTextHook={useColorText}
          />
        </table>
        <div ref={tableRef} className="table-page_unfixed-table">
          {/* <TableNamesUnfixed /> */}
          <table>
            <TableColNames
              widthsArray={widths}
              data={copyItems}
              setItems={setItems}
            />
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
              tableCalcDateHandler={TableHandlers.tableCalcDateHandler}
              tableDistanceHandler={TableHandlers.distanceHandler}
              tableStockHandler={TableHandlers.tableStockInfoHandler}
              useColorTextHook={useColorText}
            />
          </table>
        </div>
      </div>

      <div className="page-counter">
        <input
          type="text"
          value={page}
          min={0}
          onChange={(e) =>
            setPage(parseInt(e.target.value ? e.target.value : "0"))
          }
        />
        /{totalPages}{" "}
        <RightCircleOutlined onClick={() => setPage((p) => p + 1)} />
      </div>
    </>
  );
};
