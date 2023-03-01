import React from "react";
import { ShowDelivery } from "../../../components/SelectDelivery";
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
  tableDocsHandler?: (dispatch: any, _id: string, docs: IsDocsType) => void;
  declStatusHandler?: (dispatch: any, declaration_number: string) => void;
  tableCommentHandler?: (dispatch: any, _id: string, value: string) => void;
  checkTimeStyle: (time: string, time_update: boolean) => string;
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
  checkTimeStyle,
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
                      return <td key={key}>{num.number}</td>;
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
            <ShowDelivery delivery_method={item.delivery_method} />
            <td>
              <table className="table-importers">
                <tbody>
                  <tr>
                    {item.providers.map((provider) => {
                      return <td key={provider._id}> {provider.name} </td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table className="table-importers">
                <tbody>
                  <tr>
                    {item.importers.map((importer) => {
                      return <td key={importer._id}> {importer.name} </td>;
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
            <td> {item.etd && timeConvert(item.etd)} </td>
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
              {timeConvert(item.eta)}
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
              {timeConvert(item.date_do)}
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
            {/* <td
              style={{ cursor: "pointer" }}
              onClick={() => {
                declStatusHandler &&
                  declStatusHandler(dispatch, item.declaration_number);
              }}
            >
              {item.declaration_number}
            </td> */}
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
              {timeConvert(item.declaration_issue_date)}
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
              {timeConvert(item.train_depart_date)}
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
              {timeConvert(item.train_arrive_date)}
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
              {timeConvert(item.store_arrive_date)}
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
          </tr>
        );
      })}
    </>
  );
};

export default TableUI;
