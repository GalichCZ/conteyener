import { Button } from "antd";
import React, { useState } from "react";
import { TableStore, TableItemUpdate } from "../index";
import * as Types from "./Types";
import { Item } from "../../functions/itemFuncs";

const ItemFuncs = new Item();
export const Table: React.FunctionComponent<Types.TableProps> = ({ data }) => {
  const [isModal, setIsModal] = useState<boolean>();
  const [store_name, setStore_name] = useState<string>();
  const [store_address, setStore_address] = useState<string>();
  const [store_contact, setStore_contact] = useState<string>();

  const [updateModal, setUpdateModal] = useState<any>();
  const [item, setItem] = useState<any>();

  return (
    <>
      <TableStore
        opened={isModal}
        store_address={store_address}
        store_contact={store_contact}
        store_name={store_name}
        setOpen={setIsModal}
      />
      <TableItemUpdate
        opened={updateModal}
        setOpen={setUpdateModal}
        item={item}
      />
      <div className="table-page_table">
        <table>
          <thead>
            <tr>
              <td></td>
              <td> Дата заявки </td>
              <td> Номер заказа </td>
              <td> Номер контейнера </td>
              <td> Товар </td>
              <td> Поставщик </td>
              <td> Импортер </td>
              <td> Условия поставки </td>
              <td> Склад </td>
              <td> Агент </td>
              <td> Тип контейенра </td>
              <td> Место отправки </td>
              <td> Линия </td>
              <td> Дата готовности </td>
              <td> Дата загрузки </td>
              <td> ETD </td>
              <td> ETA </td>
              <td> Релиз </td>
              <td> BL/СМГС/CMR </td>
              <td> ТД </td>
              <td> Дата «ДО» </td>
              <td> Порт </td>
              <td> Д/С для подачи </td>
              <td> Документы для подачи </td>
              <td> № декларации </td>
              <td> Дата выпуска декларации </td>
              <td> Наличие ОБ </td>
              <td> Ответ ОБ </td>
              <td> Экспедитор </td>
              <td> Станци прибытия </td>
              <td> Км. до станции назначения </td>
              <td> Дата прибытия по ЖД </td>
              <td> Автовывоз </td>
              <td> Дата прибытия на склад </td>
              <td> Комментарий </td>
              <td> Фрахт </td>
              <td> Ставка </td>
              <td> Примечания </td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, key) => {
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
                  <td>{item.order_number}</td>
                  <td>{item.container.container_number}</td>
                  <td>{item.container.container_type}</td>
                  <td>
                    <table className="table-importers">
                      <tbody>
                        <tr>
                          {item.importers.map((importer) => {
                            return <td key={importer._id}>{importer.name}</td>;
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table className="table-importers">
                      <tbody>
                        <tr>
                          {item.providers.map((provider) => {
                            return <td key={provider._id}>{provider.name}</td>;
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsModal(true);
                      setStore_address(item.store.address);
                      setStore_contact(item.store.contact);
                      setStore_name(item.store.name);
                    }}
                  >
                    Склад
                  </td>
                  <td>{item.conditions}</td>
                  <td>{item.line}</td>
                  <td>{item.agent}</td>
                  <td>{item.fraht}</td>
                  <td>{item.expeditor}</td>
                  <td>{item.bid}</td>
                  <td>{item.port}</td>
                  <td>{item.place_of_dispatch}</td>
                  <td>{item.arrive_place}</td>
                  <td>{item.etd}</td>
                  <td>{item.eta}</td>
                  <td>{item.date_do}</td>
                  <td>{item.is_ds ? "V" : ""}</td>
                  <td>{item.is_docs ? "V" : ""}</td>
                  <td>{item.declaration_submit_date}</td>
                  <td>{item.declaration_number}</td>
                  <td>{item.declaration_issue_date}</td>
                  <td>{item.train_etd}</td>
                  <td>{item.train_arrive_date}</td>
                  <td>{item.destination_station}</td>
                  <td>{item.km_to_dist}</td>
                  <td>{item.store_arrive_date}</td>
                  <td>{item.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
