import React from "react";
import { ShowDelivery } from "../../../components/SelectDelivery";
import { useAppDispatch } from "../../../hooks/hooks";
import { IItem, IsDocsType, Store, TableProps } from "../../../Types/Types";

interface ITableUi {
  items: TableProps[] | undefined;
  timeConvert: (time: string) => string;
  docsCount: (docs: IsDocsType) => number | "+";
  tableUpdateHandler: (dispatch: any, item: IItem) => void;
  uploadHandler: (dispatch: any, item_id: string) => void;
  tableStoreHandler: (dispatch: any, itemId: string, storeData: Store) => void;
  dateChangeHandler: (
    dispatch: any,
    dateType: number,
    _itemId: string,
    _defValue: string,
    _techStoreId: string
  ) => void;
  tableDocsHandler: (dispatch: any, _id: string, docs: IsDocsType) => void;
  declStatusHandler: (dispatch: any, declaration_number: string) => void;
  tableCommentHandler: (dispatch: any, _id: string, value: string) => void;
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
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {items?.map((item, key) => {
        return (
          <tr key={key}>
            <td
              style={{ cursor: "pointer" }}
              onClick={() => tableUpdateHandler(dispatch, item)}
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
              onClick={() => uploadHandler(dispatch, item._id)}
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
              className={
                item.eta_update ? "formula-date_update" : "formula-date"
              }
              onClick={() => {
                dateChangeHandler(
                  dispatch,
                  1,
                  item._id,
                  item.eta,
                  item.store?.techStore
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
                dateChangeHandler(
                  dispatch,
                  2,
                  item._id,
                  item.date_do,
                  item.store?.techStore
                );
              }}
              className={
                item.date_do_update ? "formula-date_update" : "formula-date"
              }
            >
              {timeConvert(item.date_do)}
            </td>
            <td> {item.port} </td>
            <td> {item.is_ds ? "+" : "-"} </td>
            <td
              style={{ cursor: "pointer" }}
              onClick={() => {
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
            <td
              style={{ cursor: "pointer" }}
              onClick={() => {
                declStatusHandler(dispatch, item.declaration_number);
              }}
            >
              {item.declaration_number}
            </td>
            <td
              onClick={() => {
                dateChangeHandler(
                  dispatch,
                  3,
                  item._id,
                  item.declaration_issue_date,
                  item.store?.techStore
                );
              }}
              className={
                item.declaration_issue_date_update
                  ? "formula-date_update"
                  : "formula-date"
              }
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
                dateChangeHandler(
                  dispatch,
                  4,
                  item._id,
                  item.train_arrive_date,
                  item.store?.techStore
                );
              }}
              className={
                item.train_arrive_date_update
                  ? "formula-date_update"
                  : "formula-date"
              }
            >
              {timeConvert(item.train_arrive_date)}
            </td>
            <td> {item.pickup} </td>
            <td
              onClick={() => {
                dateChangeHandler(
                  dispatch,
                  5,
                  item._id,
                  item.store_arrive_date,
                  item.store?.techStore
                );
              }}
              className={
                item.store_arrive_date_update
                  ? "formula-date_update"
                  : "formula-date"
              }
            >
              {timeConvert(item.store_arrive_date)}
            </td>
            <td
              onClick={() => {
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
