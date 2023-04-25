import React from "react";

interface IProps {
  scrolled: boolean;
}

export const TableNamesFixed: React.FC<IProps> = ({ scrolled }) => {
  return (
    <div className="table-head-fixed">
      <div className="head-cell-fixed">Дата заявки</div>
      <div className="head-cell-fixed">
        Внутренний <br /> номер
      </div>
      <div className="head-cell-fixed">
        Номер <br /> проформы
      </div>
      <div className="head-cell-fixed">Номер заказа</div>
      <div className="head-cell-fixed">
        Номер <br /> контейнера
      </div>
    </div>
  );
};
