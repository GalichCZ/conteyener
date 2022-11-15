import React from "react";
import { Item } from "../functions/itemFuncs";
export const Table = () => {
  const ItemFuncs = new Item();

  return (
    <div className="table-page_table">
      <table>
        <tbody>
          <tr>
            <td> Дата заявки </td>
            <td> № инвойса и проформы </td>
            <td> Контейнер </td>
            <td> Импортер </td>
            <td> Поставщик </td>
            <td> Тип контейнера </td>
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
            <td> Дата прибытия на склад </td>
            <td> Примечание </td>
          </tr>
          <tr>
            <td> 23.11.2022 </td>
            <td> 1122 </td>
            <td> 1234 </td>
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
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={ItemFuncs.getItems}>click</button>
    </div>
  );
};
