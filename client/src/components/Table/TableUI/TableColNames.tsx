import { FilterFilled } from "@ant-design/icons";
import React from "react";

interface ITableColProps {
  widthsArray: number[];
}

export const TableColNames: React.FC<ITableColProps> = ({ widthsArray }) => {
  // console.log(widthsArray);
  return (
    <thead>
      <tr>
        <td>
          Дата заявки
          <FilterFilled
            style={{ position: "absolute", top: "5px", right: "5px" }}
          />
        </td>
        <td>
          Номер заказа
          <FilterFilled />
        </td>
        <td>
          Номер контейнера
          <FilterFilled />
        </td>
        <td>
          Товар
          <FilterFilled />
        </td>
        <td>
          Способ доставки
          <FilterFilled />
        </td>
        <td>
          Поставщик
          <FilterFilled />
        </td>
        <td>
          Импортер
          <FilterFilled />
        </td>
        <td>
          Условия поставки
          <FilterFilled />
        </td>
        <td>
          Склад
          <FilterFilled />
        </td>
        <td>
          Агент
          <FilterFilled />
        </td>
        <td>
          Тип контейенра
          <FilterFilled />
        </td>
        <td>
          Место отправки
          <FilterFilled />
        </td>
        <td>
          Линия
          <FilterFilled />
        </td>
        <td>
          Дата готовности
          <FilterFilled />
        </td>
        <td>
          Дата загрузки
          <FilterFilled />
        </td>
        <td>
          ETD
          <FilterFilled />
        </td>
        <td>
          ETA
          <FilterFilled />
        </td>
        <td>
          Релиз
          <FilterFilled />
        </td>
        <td>
          BL/СМГС/CMR
          <FilterFilled />
        </td>
        <td>
          ТД
          <FilterFilled />
        </td>
        <td>
          Дата ДО
          <FilterFilled />
        </td>
        <td>
          Порт
          <FilterFilled />
        </td>
        <td>
          Д/С для подачи
          <FilterFilled />
        </td>
        <td>
          Документы для подачи
          <FilterFilled />
        </td>
        <td>
          Номер декларации
          <FilterFilled />
        </td>
        <td>
          Дата выпуска декларации
          <FilterFilled />
        </td>
        <td>
          Наличие ОБ
          <FilterFilled />
        </td>
        <td>
          Ответ ОБ
          <FilterFilled />
        </td>
        <td>
          Экспедитор
          <FilterFilled />
        </td>
        <td>
          Станци прибытия
          <FilterFilled />
        </td>
        <td>
          Осталось км до ст. назначения
          <FilterFilled />
        </td>
        <td>
          Дата прибытия по ЖД
          <FilterFilled />
        </td>
        <td>
          Автовывоз
          <FilterFilled />
        </td>
        <td>
          Дата прибытия на склад
          <FilterFilled />
        </td>
        <td>
          Комментарий
          <FilterFilled />
        </td>
        {/* <td>Фрахт</td>
        <td>Ставка</td>
        <td>Примечания</td> */}
      </tr>
    </thead>
  );
};
