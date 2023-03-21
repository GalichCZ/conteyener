import { Button } from "antd";
import React from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { IItem, IsDocsType, Store, TableProps } from "../../../Types/Types";

interface ITableUi {
  items: TableProps[] | undefined;
  timeConvert: (time: string) => string;
  docsCount: (docs: IsDocsType) => number | "+";
  tableUpdateHandler?: (dispatch: any, item: IItem) => void;
  uploadHandler?: (dispatch: any, item_id: string) => void;
  tableStoreHandler?: (dispatch: any, itemId: string, storeData: Store) => void;
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
  tableDocsHandler?: (dispatch: any, _id: string, docs: IsDocsType) => void;
  declStatusHandler?: (dispatch: any, declaration_number: string) => void;
  tableCommentHandler?: (dispatch: any, _id: string, value: string) => void;
  checkTimeStyle: (time: string, time_update: boolean) => string;
  hideItem?: (_id: string, hidden: boolean) => void;
  hidden?: boolean;
}

const TableUI: React.FC<ITableUi> = ({
  items,
  timeConvert,
  docsCount,
  tableUpdateHandler,
  uploadHandler,
  tableStoreHandler,
  dateChangeHandler,
  tableDocsHandler,
  declStatusHandler,
  tableCommentHandler,
  tableCalcDateHandler,
  checkTimeStyle,
  hideItem,
  hidden,
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {items?.map((item, key) => {
        return (
          <tr key={key}>
            <td
              style={{ cursor: "pointer" }}
              onClick={() =>
                tableUpdateHandler && tableUpdateHandler(dispatch, item)
              }
            >
              {timeConvert(item.request_date)}
            </td>
            <td>
              <table className="table-importers">
                <tbody>
                  <tr>
                    {item.order_number.map((num, key) => {
                      return <td key={key}>{num}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </td>
            <td> {item.container?.container_number} </td>
            <td
              style={{ cursor: "pointer" }}
              onClick={() => uploadHandler && uploadHandler(dispatch, item._id)}
            >
              {item.simple_product_name}
            </td>
            <td>{item.delivery_method}</td>
            <td>
              <table className="table-importers">
                <tbody>
                  <tr>
                    {item.providers.map((provider, key) => {
                      return <td key={key}> {provider} </td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table className="table-importers">
                <tbody>
                  <tr>
                    {item.importers.map((importer, key) => {
                      return <td key={key}> {importer} </td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </td>
            <td> {item.conditions} </td>
            <td
              style={{ cursor: "pointer" }}
              onClick={() =>
                tableStoreHandler &&
                tableStoreHandler(dispatch, item._id, {
                  _id: item.store._id,
                  receiver: item.store.receiver,
                  contact: item.store.contact,
                  note: item.store.note,
                  techStore: item.store.techStore,
                })
              }
            >
              {item.store_name}
            </td>
            <td> {item.agent} </td>
            <td> {item.container?.container_type} </td>
            <td> {item.place_of_dispatch} </td>
            <td> {item.line} </td>
            <td> {item.ready_date && timeConvert(item.ready_date)} </td>
            <td> {item.load_date && timeConvert(item.load_date)} </td>
            <td
              style={{ cursor: "pointer" }}
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
              {item.eta && item.eta === item.etd ? "-" : timeConvert(item.eta)}
            </td>
            <td> {item.release && timeConvert(item.release)} </td>
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
              className={checkTimeStyle(item.date_do, item.date_do_update)}
            >
              {item.date_do &&
              timeConvert(item.date_do) === timeConvert(item.eta)
                ? "-"
                : timeConvert(item.date_do)}
            </td>
            <td> {item.port} </td>
            <td> {item.is_ds ? "+" : "-"} </td>
            <td
              style={{ cursor: "pointer" }}
              onClick={() => {
                tableDocsHandler &&
                  tableDocsHandler(dispatch, item._id, item.is_docs);
              }}
            >
              {docsCount(item.is_docs) === "+" ? (
                docsCount(item.is_docs)
              ) : (
                <>
                  {docsCount(item.is_docs)}
                  /9
                </>
              )}
            </td>
            <td>
              <table className="table-importers">
                <tbody>
                  <tr>
                    {item.declaration_number.map((num, key) => {
                      return (
                        <td
                          key={key}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            declStatusHandler &&
                              declStatusHandler(dispatch, num);
                          }}
                        >
                          {num}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
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
            >
              {item.declaration_issue_date &&
              timeConvert(item.date_do) ===
                timeConvert(item.declaration_issue_date)
                ? "-"
                : timeConvert(item.declaration_issue_date)}
            </td>
            <td>
              {item.availability_of_ob && timeConvert(item.availability_of_ob)}
            </td>
            <td> {item.answer_of_ob && timeConvert(item.answer_of_ob)} </td>
            <td> {item.expeditor} </td>
            <td> {item.destination_station} </td>
            <td> {item.km_to_dist} </td>
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
            >
              {item.train_depart_date &&
              timeConvert(item.declaration_issue_date) ===
                timeConvert(item.train_depart_date)
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
            >
              {item.train_arrive_date &&
              timeConvert(item.train_depart_date) ===
                timeConvert(item.train_arrive_date)
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
            >
              {item.store_arrive_date &&
              timeConvert(item.train_arrive_date) ===
                timeConvert(item.store_arrive_date)
                ? "-"
                : timeConvert(item.store_arrive_date)}
            </td>
            <td>{item.stock_place}</td>
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
    </>
  );
};

export default TableUI;
