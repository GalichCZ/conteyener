import { Button } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { IsDocsType, TableProps } from "../../../Types/Types";
import { Tooltip } from "antd";
import { useCutString } from "../../../hooks/useCutString";

interface ITableUi {
  setHeights2?: (c: Array<number | null | undefined>) => void;
  items: TableProps[] | undefined;
  timeConvert: (time: string) => string;
  docsCount: (docs: IsDocsType) => number | "+";
  uploadHandler?: (
    dispatch: any,
    item_id: string,
    simple_product_name: string
  ) => void;
  tableStoreHandler?: (dispatch: any, itemId: string, store: string) => void;
  dateChangeHandler?: (
    dispatch: any,
    dateType: number,
    _itemId: string,
    delivery_channel: string,
    _defValue: string
  ) => void;
  tableCalcDateHandler?: (
    dispatch: any,
    itemId: string,
    delivery_channel: string,
    request_date: string | null | undefined
  ) => void;
  tableDistanceHandler?: (
    dispatch: any,
    km_to_dist: number | null,
    _id: string
  ) => void;
  tableDocsHandler?: (dispatch: any, _id: string, docs: IsDocsType) => void;
  declStatusHandler?: (dispatch: any, declaration_number: string) => void;
  tableCommentHandler?: (dispatch: any, _id: string, value: string) => void;
  checkTimeStyle: (time: string, time_update: boolean) => string;
  tableStockHandler?: (dispatch: any, info: string) => void;
  hideItem?: (_id: string, hidden: boolean) => void;
  hidden?: boolean;
  useColorTextHook: (value: string | undefined, searchValue: string) => object;
}

const TableUI: React.FC<ITableUi> = ({
  items,
  timeConvert,
  docsCount,
  uploadHandler,
  tableStoreHandler,
  dateChangeHandler,
  tableDocsHandler,
  declStatusHandler,
  tableCommentHandler,
  tableCalcDateHandler,
  tableDistanceHandler,
  checkTimeStyle,
  tableStockHandler,
  hideItem,
  hidden,
  setHeights2,
  useColorTextHook,
}) => {
  const dispatch = useAppDispatch();
  const myRefs = useRef<Array<HTMLTableRowElement | null>>([]);
  const [height, setHeight] = useState<Array<number | null | undefined>>([]);
  const heights = useAppSelector((state) => state.heightHandler.heights);
  const searchValue = useAppSelector((state) => state.search.value);
  const cutString = useCutString();

  const getHeight = () => {
    if (myRefs.current) {
      setHeight(
        myRefs.current.map((ref) => {
          return ref?.clientHeight;
        })
      );
    }
  };

  useEffect(() => {
    if (height.length > 0 && setHeights2) setHeights2(height);
  }, [height]);

  useEffect(() => {
    getHeight();
  }, [items]);

  function heightCheck(height: number) {
    if (height < 50) return 50;
    else return height;
  }

  const toUpperCase = useMemo(() => {
    return (str: string): string => {
      return str && str.toUpperCase();
    };
  }, []);

  return (
    <>
      <tbody>
        {items?.map((item, key) => {
          return (
            <tr
              className="table-row"
              style={{
                height: `${heightCheck(heights[key])}px`,
              }}
              ref={(el) => (myRefs.current[key] = el)}
              key={key}
            >
              <td>
                <div className="arr-info arr-info_product">
                  {item.simple_product_name.map((simpleName, key) => {
                    return (
                      <Tooltip
                        destroyTooltipOnHide={true}
                        key={key}
                        title={simpleName}
                      >
                        <p
                          style={{
                            cursor: "pointer",
                            ...useColorTextHook(simpleName, searchValue),
                          }}
                          onClick={() =>
                            uploadHandler &&
                            uploadHandler(dispatch, item._id, simpleName)
                          }
                          key={key}
                        >
                          {" "}
                          {cutString(simpleName, 13)}{" "}
                        </p>
                      </Tooltip>
                    );
                  })}
                </div>
              </td>
              <td
                style={{
                  ...useColorTextHook(item.delivery_method, searchValue),
                }}
              >
                {item.delivery_method}
              </td>
              <td style={{ minWidth: "250px" }}>
                <div className="arr-info">
                  {item.providers.map((provider, key) => {
                    return (
                      <Tooltip
                        destroyTooltipOnHide={true}
                        key={key}
                        title={provider}
                      >
                        <p
                          style={{
                            ...useColorTextHook(provider, searchValue),
                          }}
                        >
                          {" "}
                          {toUpperCase(cutString(provider, 23))}...{" "}
                        </p>
                      </Tooltip>
                    );
                  })}
                </div>
              </td>
              <td>
                <div className="arr-info">
                  {item.importers.map((importer, key) => {
                    return (
                      <p
                        style={{
                          ...useColorTextHook(importer, searchValue),
                        }}
                        key={key}
                      >
                        {" "}
                        {cutString(importer, 11)}...{" "}
                      </p>
                    );
                  })}
                </div>
              </td>
              <td>
                <div className="arr-info">
                  {item.conditions.map((condition, key) => {
                    return (
                      <p
                        style={{
                          ...useColorTextHook(condition, searchValue),
                        }}
                        key={key}
                      >
                        {" "}
                        {condition}{" "}
                      </p>
                    );
                  })}
                </div>
              </td>
              <td>{item.direction}</td>
              <td
                style={{
                  cursor: "pointer",
                  ...useColorTextHook(item.store_name, searchValue),
                }}
                onClick={() =>
                  tableStoreHandler &&
                  tableStoreHandler(dispatch, item._id, item.store)
                }
              >
                {item.store_name}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.agent, searchValue),
                }}
              >
                {item.agent}
              </td>
              <td
                style={{
                  ...useColorTextHook(
                    item.container_type
                      ? item.container_type
                      : item.container?.container_type,
                    searchValue
                  ),
                }}
              >
                {" "}
                {item.container_type
                  ? item.container_type
                  : item.container?.container_type}{" "}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.place_of_dispatch, searchValue),
                }}
              >
                {" "}
                {item.place_of_dispatch}{" "}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.line, searchValue),
                }}
              >
                {item.line}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.ready_date, searchValue),
                }}
              >
                {item.ready_date && timeConvert(item.ready_date)}{" "}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.load_date, searchValue),
                }}
              >
                {" "}
                {item.load_date && timeConvert(item.load_date)}{" "}
              </td>
              <td
                style={{
                  cursor: "pointer",
                  ...useColorTextHook(item.etd, searchValue),
                }}
                onClick={() => {
                  tableCalcDateHandler &&
                    tableCalcDateHandler(
                      dispatch,
                      item._id,
                      item.delivery_channel,
                      item.etd
                    );
                }}
              >
                {" "}
                {item.etd && timeConvert(item.etd)}{" "}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.eta, searchValue),
                }}
                className={checkTimeStyle(item.eta, item.eta_update)}
                onClick={() => {
                  dateChangeHandler &&
                    dateChangeHandler(
                      dispatch,
                      1,
                      item._id,
                      item.delivery_channel,
                      item.eta
                    );
                }}
              >
                {item.eta === null ? "-" : timeConvert(item.eta)}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.release, searchValue),
                }}
              >
                {" "}
                {item.release && timeConvert(item.release)}{" "}
              </td>
              <td> {item.bl_smgs_cmr ? "+" : "-"} </td>
              <td> {item.td ? "+" : "-"} </td>
              <td
                onClick={() => {
                  dateChangeHandler &&
                    dateChangeHandler(
                      dispatch,
                      2,
                      item._id,
                      item.delivery_channel,
                      item.date_do
                    );
                }}
                style={{
                  ...useColorTextHook(item.date_do, searchValue),
                }}
                className={checkTimeStyle(item.date_do, item.date_do_update)}
              >
                {item.date_do === null ? "-" : timeConvert(item.date_do)}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.port, searchValue),
                }}
              >
                {" "}
                {item.port}{" "}
              </td>
              <td> {item.is_ds ? "+" : "-"} </td>
              <td> {item.fraht_account} </td>
              <td>
                <div>
                  {item.is_docs.map((doc, key) => (
                    <p
                      key={key}
                      onClick={() => {
                        tableDocsHandler &&
                          tableDocsHandler(dispatch, item._id, doc);
                      }}
                    >
                      {docsCount(doc) === "+" ? (
                        docsCount(doc)
                      ) : (
                        <>
                          {docsCount(doc)}
                          /9
                        </>
                      )}
                    </p>
                  ))}
                </div>
              </td>
              <td>
                <div className="arr-info">
                  {item.declaration_number.map((num, key) => {
                    return (
                      <p
                        key={key}
                        style={{
                          cursor: "pointer",
                          ...useColorTextHook(num, searchValue),
                        }}
                        onClick={() => {
                          declStatusHandler && declStatusHandler(dispatch, num);
                        }}
                      >
                        {num}
                      </p>
                    );
                  })}
                </div>
              </td>
              <td
                onClick={() => {
                  dateChangeHandler &&
                    dateChangeHandler(
                      dispatch,
                      3,
                      item._id,
                      item.delivery_channel,
                      item.declaration_issue_date
                    );
                }}
                className={checkTimeStyle(
                  item.declaration_issue_date,
                  item.declaration_issue_date_update
                )}
                style={{
                  ...useColorTextHook(item.declaration_issue_date, searchValue),
                }}
              >
                {item.declaration_issue_date === null
                  ? "-"
                  : timeConvert(item.declaration_issue_date)}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.availability_of_ob, searchValue),
                }}
              >
                {item.availability_of_ob &&
                  timeConvert(item.availability_of_ob)}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.answer_of_ob, searchValue),
                }}
              >
                {" "}
                {item.answer_of_ob && timeConvert(item.answer_of_ob)}{" "}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.expeditor, searchValue),
                }}
              >
                {" "}
                {item.expeditor}{" "}
              </td>
              <td
                style={{
                  ...useColorTextHook(item.destination_station, searchValue),
                }}
              >
                {" "}
                {item.destination_station}{" "}
              </td>
              <td
                style={{
                  cursor: "pointer",
                  ...useColorTextHook(item.km_to_dist?.toString(), searchValue),
                }}
                onClick={() => {
                  tableDistanceHandler &&
                    tableDistanceHandler(dispatch, item.km_to_dist, item._id);
                }}
              >
                {" "}
                {item.km_to_dist === null ? "" : item.km_to_dist}{" "}
              </td>
              <td
                onClick={() => {
                  dateChangeHandler &&
                    dateChangeHandler(
                      dispatch,
                      4,
                      item._id,
                      item.delivery_channel,
                      item.train_depart_date
                    );
                }}
                className={checkTimeStyle(
                  item.train_depart_date,
                  item.train_depart_date_update
                )}
                style={{
                  ...useColorTextHook(item.train_depart_date, searchValue),
                }}
              >
                {item.train_depart_date === null
                  ? "-"
                  : timeConvert(item.train_depart_date)}
              </td>
              <td
                onClick={() => {
                  dateChangeHandler &&
                    dateChangeHandler(
                      dispatch,
                      5,
                      item._id,
                      item.delivery_channel,
                      item.train_arrive_date
                    );
                }}
                className={checkTimeStyle(
                  item.train_arrive_date,
                  item.train_arrive_date_update
                )}
                style={{
                  ...useColorTextHook(item.train_arrive_date, searchValue),
                }}
              >
                {item.train_arrive_date === null
                  ? "-"
                  : timeConvert(item.train_arrive_date)}
              </td>
              <td> {item.pickup} </td>
              <td
                onClick={() => {
                  dateChangeHandler &&
                    dateChangeHandler(
                      dispatch,
                      6,
                      item._id,
                      item.delivery_channel,
                      item.store_arrive_date
                    );
                }}
                className={checkTimeStyle(
                  item.store_arrive_date,
                  item.store_arrive_date_update
                )}
                style={{
                  ...useColorTextHook(item.store_arrive_date, searchValue),
                }}
              >
                {item.store_arrive_date === null
                  ? "-"
                  : timeConvert(item.store_arrive_date)}
              </td>
              <td
                onClick={() => {
                  tableStockHandler &&
                    tableStockHandler(dispatch, item.stock_place);
                }}
                style={{
                  ...useColorTextHook(item.stock_place_name, searchValue),
                }}
              >
                {cutString(item.stock_place_name, 15)}
              </td>
              <td
                onClick={() => {
                  tableCommentHandler &&
                    tableCommentHandler(dispatch, item._id, item.comment);
                }}
                style={{ cursor: "pointer" }}
              >
                {item.comment?.substring(0, 10)}...
              </td>
              {hidden && (
                <td>
                  <Button
                    onClick={() => {
                      hideItem && hideItem(item._id, !item.hidden);
                    }}
                  >
                    Открыть запись
                  </Button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default TableUI;
