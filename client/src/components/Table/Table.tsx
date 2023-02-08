import React, { useState } from "react";
import { TableColNames, ShowDelivery } from "../index";
import * as Types from "../../Types/Types";
import dayjs from "dayjs";
import * as ModalHandlers from "./TableHandlers";
import { useAppDispatch } from "../../hooks/hooks";

interface ITable {
  data: Types.TableProps[];
}

export const Table: React.FunctionComponent<ITable> = ({ data }) => {
  const [docsModal, setDocsModal] = useState<boolean>();
  const [docs, setDocs] = useState<Types.IsDocsType>();
  const [docsItemId, setDocsItemId] = useState<string>("");

  const [updateModal, setUpdateModal] = useState<any>();
  const [item, setItem] = useState<any>();

  const dispatch = useAppDispatch();

  const docsCount = (item: Types.IsDocsType) => {
    let a = 0;
    if (item) {
      const values = Object.values(item);
      if (values[0] === true) a += 1;
      if (values[1] === true) a += 1;
      if (values[2] === true) a += 1;
      if (values[3] === true) a += 1;
      if (values[4] === true) a += 1;
      if (values[5] === true) a += 1;
      if (values[6] === true) a += 1;
      if (values[7] === true) a += 1;
      if (values[8] === true) a += 1;
      if (a === 9) return "+";
    }
    return a;
  };

  const timeConvert = (time: string) => {
    if (time === null) return "";
    else return dayjs(time).format("DD/MM/YYYY");
  };

  console.log(data);

  return (
    <>
      {/* 
      <TableDocsModal
        _id={docsItemId}
        opened={docsModal}
        setOpen={setDocsModal}
        docs={docs}
      /> */}
      <div className="table-page_table">
        <table>
          <TableColNames />

          <tbody>
            {data?.map((item, key) => {
              return (
                <tr key={key}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      ModalHandlers.tableUpdateHandler(dispatch, item);
                    }}
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
                    onClick={() => {
                      ModalHandlers.uploadHandler(dispatch, item._id);
                    }}
                  >
                    {item.simple_product_name}
                  </td>
                  <ShowDelivery delivery_method={item.delivery_method} />
                  <td>
                    <table className="table-importers">
                      <tbody>
                        <tr>
                          {item.providers.map((provider) => {
                            return (
                              <td key={provider._id}> {provider.name} </td>
                            );
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
                            return (
                              <td key={importer._id}> {importer.name} </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td> {item.conditions} </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      ModalHandlers.tableStoreHandler(dispatch, item._id, {
                        _id: item.store._id,
                        receiver: item.store.receiver,
                        contact: item.store.contact,
                        note: item.store.note,
                        techStore: item.store.techStore,
                      });
                    }}
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
                      ModalHandlers.dateChangeHandler(
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
                      ModalHandlers.dateChangeHandler(
                        dispatch,
                        2,
                        item._id,
                        item.date_do,
                        item.store?.techStore
                      );
                    }}
                    className={
                      item.date_do_update
                        ? "formula-date_update"
                        : "formula-date"
                    }
                  >
                    {" "}
                    {timeConvert(item.date_do)}{" "}
                  </td>
                  <td> {item.port} </td>
                  <td> {item.is_ds ? "+" : "-"} </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setDocsModal(true);
                      setDocs(item.is_docs);
                      setDocsItemId(item._id);
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
                      ModalHandlers.declStatusHandler(
                        dispatch,
                        item.declaration_number
                      );
                    }}
                  >
                    {item.declaration_number}
                  </td>
                  <td
                    onClick={() => {
                      ModalHandlers.dateChangeHandler(
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
                    {" "}
                    {item.availability_of_ob &&
                      timeConvert(item.availability_of_ob)}{" "}
                  </td>
                  <td>
                    {" "}
                    {item.answer_of_ob && timeConvert(item.answer_of_ob)}{" "}
                  </td>
                  <td> {item.expeditor} </td>
                  <td> {item.destination_station} </td>
                  <td> {item.km_to_dist} </td>
                  <td
                    onClick={() => {
                      ModalHandlers.dateChangeHandler(
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
                      ModalHandlers.dateChangeHandler(
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
                      ModalHandlers.tableCommentHandler(
                        dispatch,
                        item._id,
                        item.comment
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {item.comment?.substring(0, 10)}...
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
