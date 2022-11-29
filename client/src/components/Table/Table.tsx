import { Button } from "antd";
import React, { useState } from "react";
import {
  TableStore,
  TableItemUpdate,
  TableDeclStatus,
  TableColNames,
} from "../index";
import * as Types from "./Types";
import { Item } from "../../functions/itemFuncs";

const ItemFuncs = new Item();
export const Table: React.FunctionComponent<Types.TableProps> = ({ data }) => {
  const [isModal, setIsModal] = useState<boolean>();
  const [storeData, setStoreData] = useState<Types.Store>();

  const [updateModal, setUpdateModal] = useState<any>();
  const [item, setItem] = useState<any>();

  const [declarationModal, setDeclarationModal] = useState<boolean>();
  const [declarationNumber, setDeclarationNumber] = useState<string>();

  return (
    <>
      <TableDeclStatus
        declaration_number={declarationNumber}
        opened={declarationModal}
        setOpen={setDeclarationModal}
      />
      <TableStore opened={isModal} storeData={storeData} setOpen={setIsModal} />
      <TableItemUpdate
        opened={updateModal}
        setOpen={setUpdateModal}
        item={item}
      />
      <div className="table-page_table">
        <table>
          <TableColNames />
          <tbody>
            {data?.map((item) => {
              return (
                <tr key={item._id}>
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
                    {item.request_date}
                  </td>
                  <td> {item.order_number} </td>
                  <td> {item.container.container_number} </td>
                  <td> {item.simple_product_name} </td>
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
                      setStoreData({
                        receiver: item.store.receiver,
                        name: item.store.name,
                        address: item.store.address,
                        contact: item.store.contact,
                        note: item.store.note,
                      });
                    }}
                  >
                    {item.store.name}
                  </td>
                  <td> {item.agent} </td>
                  <td> {item.container.container_type} </td>
                  <td> {item.place_of_dispatch} </td>
                  <td> {item.line} </td>
                  <td> {item.ready_date} </td>
                  <td> {item.load_date} </td>
                  <td> {item.etd} </td>
                  <td> {item.eta} </td>
                  <td> {item.release} </td>
                  <td> {item.bl_smgs_cmr ? "+" : "-"} </td>
                  <td> {item.td ? "+" : "-"} </td>
                  <td> {item.date_do} </td>
                  <td> {item.port} </td>
                  <td> {item.is_ds ? "+" : "-"} </td>
                  <td> {item.is_docs ? "+" : "-"} </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setDeclarationModal(true);
                      setDeclarationNumber(item.declaration_number);
                    }}
                  >
                    {" "}
                    {item.declaration_number}{" "}
                  </td>
                  <td>{item.declaration_issue_date} </td>
                  <td> {item.availability_of_ob ? "+" : "-"} </td>
                  <td> {item.answer_of_ob ? "+" : "-"} </td>
                  <td> {item.expeditor} </td>
                  <td> {item.destination_station} </td>
                  <td> {item.km_to_dist} </td>
                  <td> {item.train_arrive_date} </td>
                  <td> {item.pickup} </td>
                  <td> {item.store_arrive_date} </td>
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
