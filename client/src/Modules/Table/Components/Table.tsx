import React, { useContext, useEffect, useRef, useState } from "react";
import { TableColNames } from "../../../components/index";
import * as Types from "../../../Types/Types";
import * as TableHandlers from "../Functions/TableHandlers";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { Item } from "../Functions/itemFuncs";
import ReDrawContext from "../../../store/redraw-context";
import TableUI from "../UI/TableUI";
import { TableColNamesFixed } from "../UI/TableColNamesFixed";
import { TableUiFixed } from "../UI/TableUiFixed";
import { Alert, Button } from "antd";
import { setHeights } from "../../../store/slices/heightHandlerSlice";

const ItemFuncs = new Item();

export const Table: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const reDraw = useContext(ReDrawContext);
  const [items, setItems] = useState<Types.TableProps[]>();
  const [copyItems, setCopyItems] = useState<Types.TableProps[]>();
  const [widths] = useState<number[]>([]);

  const [heights1, setHeights1] = useState<Array<number | null | undefined>>(
    []
  );
  const [heights2, setHeights2] = useState<Array<number | null | undefined>>(
    []
  );

  function downloadFile(url: string) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "April 5, 2023 5:24 PM.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
  }

  const handleDownloadClick = () => {
    downloadFile(
      "http://localhost:4444/backupExcels/April 5, 2023 5:24 PM.xlsx"
    );
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
    search();
  }, [query]);

  return (
    <>
      <Alert
        style={{
          position: "absolute",
          top: "10px",
          right: "5px",
          boxShadow: "1px 1px 10px gray",
          fontWeight: "bold",
        }}
        message={"Подсказка"}
        description={`Для скролла влево/вправо используйте комбинацию "shift+scroll"`}
        type="info"
        banner
        closable
      />
      {/* <Button onClick={handleDownloadClick}>Download</Button> */}
      <div className="table-page_table">
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
            />
          </table>
        </div>
      </div>
    </>
  );
};
