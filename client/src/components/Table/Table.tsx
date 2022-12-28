import React, { useState } from "react";
import { TableColNames, ShowDelivery } from "../index";
import * as Types from "../../Types/Types";
import dayjs from "dayjs";
import { useAppDispatch } from "../../hooks/hooks";
import {
  setOpenDeclStatus,
  setDeclNumber,
} from "../../store/slices/tableDeclStatusSlice";
import {
  setOpenTableStore,
  setItemId,
  setStoreData,
} from "../../store/slices/tableStoreSlice";
import {
  setCommentId,
  setCommentValue,
  setOpenComment,
} from "../../store/slices/tableCommentSlice";
import {
  setOpenUpload,
  setUploadItemId,
} from "../../store/slices/tableUploadSlice";
import {
  setFormulaDateType,
  setFormulaId,
  setFormulaTechStore,
  setFormulaValue,
  setOpenFormula,
} from "../../store/slices/tableFormulaDateSlice";

export const Table: React.FunctionComponent<Types.TableProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const declStatusHandler = (declaration_number: string) => {
    dispatch(setOpenDeclStatus());
    dispatch(setDeclNumber(declaration_number));
  };

  const tableStoreHandler = (itemId: string, storeData: Types.Store) => {
    dispatch(setOpenTableStore());
    dispatch(setItemId(itemId));
    dispatch(setStoreData(storeData));
  };

  const tableCommentHandler = (_id: string, value: string) => {
    dispatch(setOpenComment());
    dispatch(setCommentId(_id));
    dispatch(setCommentValue(value));
  };

  const uploadHandler = (item_id: string) => {
    dispatch(setOpenUpload());
    dispatch(setUploadItemId(item_id));
  };

  const dateChangeHandler = (
    dateType: number,
    _itemId: string,
    _defValue: string,
    _techStoreId: string
  ) => {
    if (_defValue !== null) {
      dispatch(setOpenFormula());
      dispatch(setFormulaId(_itemId));
      dispatch(setFormulaTechStore(_techStoreId));
      dispatch(setFormulaValue(_defValue));
      dispatch(setFormulaDateType(dateType));
    }
  };

  const [docsModal, setDocsModal] = useState<boolean>();
  const [docs, setDocs] = useState<Types.IsDocsType>();
  const [docsItemId, setDocsItemId] = useState<string>("");

  const [updateModal, setUpdateModal] = useState<any>();
  const [item, setItem] = useState<any>();

  // console.log(data);

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

  return (
    <>
      {/* 
      <TableItemUpdate
        opened={updateModal}
        setOpen={setUpdateModal}
        item={item}
      />
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
                      setUpdateModal(true);
                      setItem(item);
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
                      uploadHandler(item._id);
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
                      tableStoreHandler(item._id, {
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
                      dateChangeHandler(
                        1,
                        item._id,
                        item.eta,
                        item.store?.techStore
                      );
                    }}
                  >
                    {" "}
                    {timeConvert(item.eta)}{" "}
                  </td>
                  <td> {item.release && timeConvert(item.release)} </td>
                  <td> {item.bl_smgs_cmr ? "+" : "-"} </td>
                  <td> {item.td ? "+" : "-"} </td>
                  <td
                    onClick={() => {
                      dateChangeHandler(
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
                      declStatusHandler(item.declaration_number);
                    }}
                  >
                    {item.declaration_number}
                  </td>
                  <td
                    onClick={() => {
                      dateChangeHandler(
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
                      dateChangeHandler(
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
                      tableCommentHandler(item._id, item.comment);
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
