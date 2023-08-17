import { Button } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { IItem, IsDocsType, TableProps, UserData } from "../../../Types/Types";
import { Tooltip } from "antd";
import { useCutString } from "../../../hooks/useCutString";
import { checkRole } from "@/utils/checkRole";
import { UsersHandlerClass } from "@/Modules/UsersHandle/Functions/UsersHandler";

interface ITableUi {
  setHeights2?: (c: Array<number | null | undefined>) => void;
  items: TableProps[] | undefined;
  timeConvert: (time: string) => string;
  docsCount: (docs: IsDocsType) => number | "+";
  uploadHandler?: (
    dispatch: any,
    item_id: string,
    simple_product_name: string,
    products_id?: string[]
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
  userRole?: string;
  tableUpdateHandler?: (dispatch: any, item: IItem) => void;
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
  tableUpdateHandler,
  useColorTextHook,
  userRole,
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
              {checkRole(userRole, "request_date") && (
                <td
                  style={{
                    cursor: "pointer",
                    ...useColorTextHook(item.request_date, searchValue),
                  }}
                  onClick={() =>
                    userRole === "manager_int" &&
                    tableUpdateHandler &&
                    tableUpdateHandler(dispatch, item)
                  }
                >
                  {timeConvert(item.request_date)}
                </td>
              )}
              <td>
                <div className="arr-info">
                  {item.inside_number.map((num, key) => {
                    return (
                      <p
                        style={{
                          ...useColorTextHook(num, searchValue),
                        }}
                        key={key}
                      >
                        {num}
                      </p>
                    );
                  })}
                </div>
              </td>
              <td>
                <div className="arr-info">
                  {item.proform_number.map((num, key) => {
                    return (
                      <p
                        style={{
                          ...useColorTextHook(num, searchValue),
                        }}
                        key={key}
                      >
                        {cutString(num, 12)}
                      </p>
                    );
                  })}
                </div>
              </td>
              <td>
                <div className="arr-info">
                  {item.order_number.map((num, key) => {
                    return (
                      <Tooltip
                        destroyTooltipOnHide={true}
                        key={key}
                        title={num}
                      >
                        <p
                          style={{
                            ...useColorTextHook(num, searchValue),
                          }}
                          key={key}
                        >
                          {cutString(num, 10)}
                        </p>
                      </Tooltip>
                    );
                  })}
                </div>
              </td>
              <td
                style={{
                  ...useColorTextHook(
                    item.container_number
                      ? item.container_number
                      : item.container?.container_number,
                    searchValue
                  ),
                }}
              >
                {" "}
                {item.container_number
                  ? item.container_number
                  : item.container?.container_number}{" "}
              </td>
              {checkRole(userRole, "simple_product_name") && (
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
                            {cutString(simpleName, 13)}
                          </p>
                        </Tooltip>
                      );
                    })}
                  </div>
                </td>
              )}
              {checkRole(userRole, "delivery_method") && (
                <td
                  style={{
                    ...useColorTextHook(item.delivery_method, searchValue),
                  }}
                >
                  {item.delivery_method}
                </td>
              )}
              {checkRole(userRole, "providers") && (
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
              )}
              {checkRole(userRole, "importers") && (
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
              )}
              {checkRole(userRole, "conditions") && (
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
                          {condition}
                        </p>
                      );
                    })}
                  </div>
                </td>
              )}
              {checkRole(userRole, "direction") && <td>{item.direction}</td>}
              {checkRole(userRole, "store_name") && (
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
              )}
              {checkRole(userRole, "agent") && (
                <td
                  style={{
                    ...useColorTextHook(item.agent, searchValue),
                  }}
                >
                  {item.agent}
                </td>
              )}
              {checkRole(userRole, "container_type") && (
                <td
                  style={{
                    ...useColorTextHook(item.container_type, searchValue),
                  }}
                >
                  {item.container_type}
                </td>
              )}
              {checkRole(userRole, "place_of_dispatch") && (
                <td
                  style={{
                    ...useColorTextHook(item.place_of_dispatch, searchValue),
                  }}
                >
                  {item.place_of_dispatch}
                </td>
              )}
              {checkRole(userRole, "line") && (
                <td
                  style={{
                    ...useColorTextHook(item.line, searchValue),
                  }}
                >
                  {item.line}
                </td>
              )}
              {checkRole(userRole, "ready_date") && (
                <td
                  style={{
                    ...useColorTextHook(item.ready_date, searchValue),
                  }}
                >
                  {item.ready_date && timeConvert(item.ready_date)}{" "}
                </td>
              )}
              {checkRole(userRole, "load_date") && (
                <td
                  style={{
                    ...useColorTextHook(item.load_date, searchValue),
                  }}
                >
                  {item.load_date && timeConvert(item.load_date)}
                </td>
              )}
              <td
                style={{
                  cursor: "pointer",
                  ...useColorTextHook(item.etd, searchValue),
                }}
                onClick={() => {
                  userRole === "manager_int" &&
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
                  userRole === "manager_int" &&
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
              {checkRole(userRole, "release") && (
                <td
                  style={{
                    ...useColorTextHook(item.release, searchValue),
                  }}
                >
                  {item.release && timeConvert(item.release)}
                </td>
              )}
              {checkRole(userRole, "bl_smgs_cmr") && (
                <td> {item.bl_smgs_cmr ? "+" : "-"} </td>
              )}
              {checkRole(userRole, "td") && <td> {item.td ? "+" : "-"} </td>}
              {checkRole(userRole, "date_do") && (
                <td
                  onClick={() => {
                    userRole === "manager_int" &&
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
              )}
              {checkRole(userRole, "port") && (
                <td
                  style={{
                    ...useColorTextHook(item.port, searchValue),
                  }}
                >
                  {item.port}
                </td>
              )}
              {checkRole(userRole, "is_ds") && (
                <td> {item.is_ds ? "+" : "-"} </td>
              )}
              <td
                style={{ ...useColorTextHook(item.fraht_account, searchValue) }}
              >
                {" "}
                {item.fraht_account}{" "}
              </td>
              {checkRole(userRole, "is_docs") && (
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
              )}
              {checkRole(userRole, "declaration_number") && (
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
                            declStatusHandler &&
                              declStatusHandler(dispatch, num);
                          }}
                        >
                          {num}
                        </p>
                      );
                    })}
                  </div>
                </td>
              )}
              <td
                onClick={() => {
                  userRole === "manager_int" &&
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
              {checkRole(userRole, "availability_of_ob") && (
                <td
                  style={{
                    ...useColorTextHook(item.availability_of_ob, searchValue),
                  }}
                >
                  {item.availability_of_ob &&
                    timeConvert(item.availability_of_ob)}
                </td>
              )}
              {checkRole(userRole, "answer_of_ob") && (
                <td
                  style={{
                    ...useColorTextHook(item.answer_of_ob, searchValue),
                  }}
                >
                  {item.answer_of_ob && timeConvert(item.answer_of_ob)}
                </td>
              )}
              {checkRole(userRole, "expeditor") && (
                <td
                  style={{
                    ...useColorTextHook(item.expeditor, searchValue),
                  }}
                >
                  {item.expeditor}
                </td>
              )}
              {checkRole(userRole, "destination_station") && (
                <td
                  style={{
                    ...useColorTextHook(item.destination_station, searchValue),
                  }}
                >
                  {item.destination_station}
                </td>
              )}
              {checkRole(userRole, "km_to_dist") && (
                <td
                  style={{
                    cursor: "pointer",
                    ...useColorTextHook(
                      item.km_to_dist?.toString(),
                      searchValue
                    ),
                  }}
                  onClick={() => {
                    userRole === "manager_int" &&
                      tableDistanceHandler &&
                      tableDistanceHandler(dispatch, item.km_to_dist, item._id);
                  }}
                >
                  {item.km_to_dist === null ? "" : item.km_to_dist}
                </td>
              )}
              {checkRole(userRole, "train_depart_date") && (
                <td
                  onClick={() => {
                    userRole === "manager_int" &&
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
              )}
              {checkRole(userRole, "train_arrive_date") && (
                <td
                  onClick={() => {
                    userRole === "manager_int" &&
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
              )}
              {checkRole(userRole, "pickup") && (
                <td style={{ ...useColorTextHook(item.pickup, searchValue) }}>
                  {" "}
                  {item.pickup}{" "}
                </td>
              )}
              <td
                onClick={() => {
                  userRole === "manager_int" &&
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
              {checkRole(userRole, "stock_place_name") && (
                <td
                  onClick={() => {
                    userRole === "manager_int" &&
                      tableStockHandler &&
                      tableStockHandler(dispatch, item.stock_place);
                  }}
                  style={{
                    ...useColorTextHook(item.stock_place_name, searchValue),
                  }}
                >
                  {cutString(item.stock_place_name, 15)}
                </td>
              )}
              {checkRole(userRole, "comment") && (
                <td
                  onClick={() => {
                    userRole === "manager_int" &&
                      tableCommentHandler &&
                      tableCommentHandler(dispatch, item._id, item.comment);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {item.comment?.substring(0, 10)}...
                </td>
              )}
              {hidden && (
                <td>
                  <Button
                    onClick={() => {
                      userRole === "manager_int" &&
                        hideItem &&
                        hideItem(item._id, !item.hidden);
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
