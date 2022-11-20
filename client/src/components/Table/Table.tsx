import React, { useEffect, useState } from "react";
import * as Types from "./Types";

export const Table: React.FunctionComponent<Types.TableProps> = ({ data }) => {
  return (
    <>
      <div className="table-page_table">
        <table>
          <thead>
            <tr>
              <td> Дата заявки </td>
              <td> № инвойса и проформы </td>
              <td> Контейнер </td>
              <td> Тип контейнера </td>
              <td> Импортер </td>
              <td> Поставщик </td>
              <td> Склад </td>
              <td> Условия поставки </td>
              <td> Линия </td>
              <td> Агент </td>
              <td> Фрахт </td>
              <td> Экспедитор </td>
              <td> Ставка </td>
              <td> Способ доставки (маршрут) </td>
              <td> Место отправки </td>
              <td>
                {" "}
                Порт прибытия <br /> / станция назначения{" "}
              </td>
              <td> Дата отправки / выхода </td>
              <td> Дата прибытия </td>
              <td> Дата «ДО» </td>
              <td> ДС для подачи </td>
              <td> Документы для подачи </td>
              <td> Дата подачи декларации </td>
              <td> № декларации </td>
              <td> Дата выпуска декларации </td>
              <td> Дата отправки по ЖД </td>
              <td> Дата прибытия по ЖД </td>
              <td> Станция назначения </td>
              <td> Км. до станции назначения </td>
              <td> Дата прибытия на склад </td>
              <td> Примечание </td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, key) => {
              return (
                <tr key={item._id}>
                  <td>{item.request_date}</td>
                  <td>{item.invoice_number}</td>
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
                  <td>Склад</td>
                  <td>{item.conditions}</td>
                  <td>{item.line}</td>
                  <td>{item.agent}</td>
                  <td>{item.fraht}</td>
                  <td>{item.expeditor}</td>
                  <td>{item.bid}</td>
                  <td>{item.delivery_method}</td>
                  <td>{item.place_of_dispatch}</td>
                  <td>{item.arrive_place}</td>
                  <td>{item.arrive_date}</td>
                  <td>{item.date_do}</td>
                  <td>{item.is_ds ? "V" : ""}</td>
                  <td>{item.is_docs ? "V" : ""}</td>
                  <td>{item.declaration_submit_date}</td>
                  <td>{item.declaration_number}</td>
                  <td>{item.declaration_issue_date}</td>
                  <td>{item.train_dispatch_date}</td>
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
