import React, { useEffect, useState } from "react";
import * as Types from "./Types";
import { Item } from "../../functions/itemFuncs";
import { TableHeader, TableRows } from "./index";

type Container = {
  container_number: string;
  container_type: string;
  _id: string;
};
type Importers = {
  name: string;
  _id: string;
};
type Providers = {
  name: string;
  _id: string;
};
type Store = {
  name: string;
  address: string;
  contact: string;
};
type TableProps = {
  data: {
    _id: string;
    request_date: string;
    invoice_number: string;
    container: Container;
    importers: Importers[];
    providers: Providers[];
    store: Store;
    conditions: string;
    line: string;
    agent: string;
    fraht: string;
    expeditor: string;
    bid: number;
    delivery_method: string;
    place_of_dispatch: string;
    arrive_place: string;
    arrive_date: string;
    date_do: string;
    is_ds: boolean;
    is_docs: boolean;
    declaration_submit_date: string;
    declaration_number: string;
    declaration_issue_date: string;
    train_dispatch_date: string;
    train_arrive_date: string;
    destination_station: string;
    km_to_dist: number;
    store_arrive_date: string;
    note: string;
  }[];
};

export const Table: React.FunctionComponent<TableProps> = ({ data }) => {
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
              <td> Дата отправки/выхода </td>
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
            {data.map((item, key) => {
              return (
                <tr key={item._id}>
                  <td>{item.request_date}</td>
                  <td>{item.invoice_number}</td>
                  <td>{item.container.container_number}</td>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

// export const Table = ({ data }): React.FunctionComponent<TableProps> => {
//   const ItemFuncs = new Item();

//   const [items, setItems] = useState<object[] | undefined>();
//   const [forMap, setForMap] = useState<object[] | undefined>();

//   const removeItems = () => {
//     const result = items?.map((item) => {
//       Object.keys(item).map((pole) => {
//         //<td>{(item as any)[pole].request_date}</td>;
//         return (
//           delete (item as any)[pole].__v,
//           delete (item as any)[pole]._id,
//           delete (item as any)[pole].createdAt
//         );
//       });
//     });
//   };

//   useEffect(() => {
//     const getItems = async () => {
//       const data = await ItemFuncs.getItems();
//       setItems(data.items);
//     };

//     getItems().catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     console.log(items);
//   }, [items]);

//   return (
//       <table>
//         {/* <TableHeader columns={columns} />
//         <TableRows data={data} columns={columns} /> */}
//         {data.map((item) => {
//           return (
//             <tr key={item.name}>
//               <td>{item.name}</td>
//               <td>{item.alt}</td>
//               <td>{item.description}</td>
//             </tr>
//           );
//         })}
//       </table>
//     </div>
//     // <div className="table-page_table">
//     //   <table>

//     //     <tbody>
//     //       {/* {items?.map((item, key: any) => {
//     //           return (
//     //             <>
//     //             <td>{Object.keys(item).request_date}</td>
//     //             </>
//     //           );
//     //         })}
//     //       {items?.map((item, index) => {
//     //         return (
//     //           <tr key={index}>
//     //             <td>{Object.keys(item).name}</td>
//     //             <td>{item.state}</td>
//     //             <td>
//     //               <ul>
//     //                 {item.participants.map((p, i) => {
//     //                   return (
//     //                     <li key={i}>
//     //                       {p.name} || {p.email}
//     //                     </li>
//     //                   );
//     //                 })}
//     //               </ul>
//     //             </td>
//     //           </tr>
//     //         );
//     //       })}
//     //       <td> 23.11.2022 </td>
//     //         <td> 1122 </td>
//     //         <td> 1234 </td>
//     //         <td> H20 </td>
//     //         <td>
//     //           <table className="table-importers">
//     //             <tbody>
//     //               <tr>
//     //                 <td> importer 1 </td>
//     //                 <td> importer 2 </td>
//     //                 <td> importer 3 </td>
//     //               </tr>
//     //             </tbody>
//     //           </table>
//     //         </td>
//     //         <td>
//     //           <table className="table-importers">
//     //             <tbody>
//     //               <tr>
//     //                 <td> postavshik 1 </td>
//     //                 <td> postavshik 2 </td>
//     //                 <td> postavshik 3 </td>
//     //               </tr>
//     //             </tbody>
//     //           </table>
//     //         </td> */}
//     //     </tbody>
//     //   </table>
//     // </div>
//   );
// };
