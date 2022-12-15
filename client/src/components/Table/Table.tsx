import { Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  TableStore,
  TableItemUpdate,
  TableDeclStatus,
  TableColNames,
  TableUploadModal,
  TableDocsModal,
  ShowDelivery,
} from "../index";
import * as Types from "../../Types/Types";
import { Item } from "../../functions/itemFuncs";
import dayjs from "dayjs";

const ItemFuncs = new Item();
export const Table: React.FunctionComponent<Types.TableProps> = ({ data }) => {
  const [isModal, setIsModal] = useState<boolean>();
  const [storeData, setStoreData] = useState<Types.Store>();
  const [itemId, setItemId] = useState<string>("");

  const [updateModal, setUpdateModal] = useState<any>();
  const [item, setItem] = useState<any>();

  const [declarationModal, setDeclarationModal] = useState<boolean>();
  const [declarationNumber, setDeclarationNumber] = useState<string>();

  const [uploadModal, setUploadModal] = useState<boolean>();
  const [uploadContainer, setUploadContainer] = useState<any>();

  const [docsModal, setDocsModal] = useState<boolean>();
  const [docs, setDocs] = useState<Types.IsDocsType>();
  const [docsItemId, setDocsItemId] = useState<string>("");

  console.log(data);

  const isAllDocs = (item: Types.IsDocsType) => {
    if (
      !item?.CI ||
      !item?.ED ||
      !item?.PI ||
      !item?.PL ||
      !item?.SS_DS ||
      !item?.bill ||
      !item?.contract_agrees ||
      !item?.cost_agrees ||
      !item?.instruction
    ) {
      return false;
    } else {
      return true;
    }
  };

  const timeConvert = (time: string) => {
    if (time === null) return "";
    else return dayjs(time).format("DD/MM/YYYY");
  };
  return (
    <>
      <TableDeclStatus
        declaration_number={declarationNumber}
        opened={declarationModal}
        setOpen={setDeclarationModal}
      />
      <TableStore
        itemId={itemId}
        opened={isModal}
        storeData={storeData}
        setOpen={setIsModal}
      />
      <TableItemUpdate
        opened={updateModal}
        setOpen={setUpdateModal}
        item={item}
      />
      <TableUploadModal
        opened={uploadModal}
        setOpen={setUploadModal}
        container={uploadContainer}
      />
      <TableDocsModal
        _id={docsItemId}
        opened={docsModal}
        setOpen={setDocsModal}
        docs={docs}
      />
      <div className="table-page_table">
        <table>
          <TableColNames />

          <tbody>
            {data?.map((item, key) => {
              return (
                <tr key={key}>
                  <td>
                    <Button
                      onClick={async () => {
                        const response = await ItemFuncs.deleteItem(item._id);
                        if (response === 200) window.location.reload();
                      }}
                    >
                      Удалить запись
                    </Button>
                  </td>
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
                  <td> {item.container.container_number} </td>
                  <td
                    onClick={() => {
                      setUploadModal(true);
                      setUploadContainer(item.container.container_number);
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
                      setIsModal(true);
                      setItemId(item._id);
                      setStoreData({
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
                  <td> {item.container.container_type} </td>
                  <td> {item.place_of_dispatch} </td>
                  <td> {item.line} </td>
                  <td> {timeConvert(item.ready_date)} </td>
                  <td> {timeConvert(item.load_date)} </td>
                  <td> {timeConvert(item.etd)} </td>
                  <td> {timeConvert(item.eta)} </td>
                  <td> {timeConvert(item.release)} </td>
                  <td> {item.bl_smgs_cmr ? "+" : "-"} </td>
                  <td> {item.td ? "+" : "-"} </td>
                  <td> {timeConvert(item.date_do)} </td>
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
                    {isAllDocs(item.is_docs) ? "+" : "-"}
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setDeclarationModal(true);
                      setDeclarationNumber(item.declaration_number);
                    }}
                  >
                    {item.declaration_number}
                  </td>
                  <td> {timeConvert(item.declaration_issue_date)} </td>
                  <td> {item.availability_of_ob ? "+" : "-"} </td>
                  <td> {item.answer_of_ob ? "+" : "-"} </td>
                  <td> {item.expeditor} </td>
                  <td> {item.destination_station} </td>
                  <td> {item.km_to_dist} </td>
                  <td> {timeConvert(item.train_arrive_date)} </td>
                  <td> {item.pickup} </td>
                  <td> {timeConvert(item.store_arrive_date)} </td>
                  <td> {item.comment} </td>
                  <td> {item.fraht} </td>
                  <td> {item.bid} </td>
                  <td> {item.note} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
