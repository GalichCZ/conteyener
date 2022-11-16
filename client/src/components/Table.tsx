import React, { useEffect, useState } from "react";
import { Item } from "../functions/itemFuncs";
export const Table = () => {
  const ItemFuncs = new Item();

  const [items, setItems] = useState<object[] | undefined>();
  const [forMap, setForMap] = useState<object[] | undefined>();

  const removeItems = () => {
    const result = items?.map((item) => {
      Object.keys(item).map((pole) => {
        //<td>{(item as any)[pole].request_date}</td>;
        return (
          delete (item as any)[pole].__v,
          delete (item as any)[pole]._id,
          delete (item as any)[pole].createdAt
        );
      });
    });
  };

  useEffect(() => {
    const getItems = async () => {
      const data = await ItemFuncs.getItems();
      setItems(data.items);
    };

    getItems().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className="table-page_table">
      <table>
        <tbody>
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
          <tr>
            {items?.map((item, key: any) => {
              return (
                <>
                  {Object.keys(item).map((pole) => {
                    return (
                      <>
                        <td>{(item as any)[pole].request_date}</td>
                        <td>{(item as any)[pole].invoice_number}</td>
                      </>
                    );
                    // return console.log((item as any)[pole]);
                  })}
                </>
              );
            })}
            {/* <td> 23.11.2022 </td>
            <td> 1122 </td>
            <td> 1234 </td>
            <td> H20 </td>
            <td>
              <table className="table-importers">
                <tbody>
                  <tr>
                    <td> importer 1 </td>
                    <td> importer 2 </td>
                    <td> importer 3 </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table className="table-importers">
                <tbody>
                  <tr>
                    <td> postavshik 1 </td>
                    <td> postavshik 2 </td>
                    <td> postavshik 3 </td>
                  </tr>
                </tbody>
              </table>
            </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
