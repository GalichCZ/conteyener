import { FilterFilled } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { TableProps } from "@/Types/Types";
import { FilterList } from "../Components/FilterList";
import { checkRole } from "@/utils/checkRole";

interface ITableColProps {
  widthsArray?: number[];
  data: TableProps[] | undefined;
  setItems: (c: TableProps[]) => void;
  userRole?: string;
}
interface IPopupData {
  td: HTMLTableCellElement;
  dataToFiltr: any[] | undefined;
  key: string;
}

export const TableColNames: React.FC<ITableColProps> = ({
  widthsArray,
  data,
  setItems,
  userRole,
}) => {
  const [popupData, setPopupData] = useState<IPopupData | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  function getRequestDates<T>(arr: T[], key: keyof T): Array<T[keyof T]> {
    return arr?.map((obj) => obj[key]);
  }

  function handleTdClick<T extends Record<string, any>>(
    event: React.MouseEvent<HTMLTableCellElement>,
    key: keyof T & keyof TableProps
  ) {
    if (popupData === null) {
      const td = event.target as HTMLTableCellElement;

      const dataToFiltr = data && getRequestDates<TableProps>(data, key);

      const keyProp = key.toString();

      setPopupData({ td, dataToFiltr, key: keyProp });
    } else setPopupData(null);
  }

  useEffect(() => {
    if (popupData) {
      const tdRect = popupData.td.getBoundingClientRect();
      const popupEl = popupRef.current;

      if (popupEl) {
        popupEl.style.transform = `translateX(${tdRect.left - 650}px)`;
      }
    }
  }, [popupData]);

  return (
    <>
      <thead>
        <tr>
          {checkRole(userRole, "simple_product_name") && (
            <td>
              Товар
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "simple_product_name");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "delivery_method") && (
            <td>
              Способ доставки
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "delivery_method");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "providers") && (
            <td>
              Поставщик
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "providers");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "importers") && (
            <td>
              Импортер
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "importers");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "conditions") && (
            <td>
              Условия поставки
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "conditions");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "direction") && <td>Направление</td>}
          {checkRole(userRole, "store_name") && (
            <td>
              Склад
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "store_name");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "agent") && (
            <td>
              Агент
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "agent");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "container_type") && (
            <td>
              Тип контейенра
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "container_type");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "place_of_dispatch") && (
            <td>
              Место отправки
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "place_of_dispatch");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "line") && (
            <td>
              Линия
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "line");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "ready_date") && (
            <td>
              Дата готовности
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "ready_date");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "load_date") && (
            <td>
              Дата загрузки
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "load_date");
                }}
              />
            </td>
          )}
          <td>
            ETD
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "etd");
              }}
            />
          </td>
          <td>
            ETA
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "eta");
              }}
            />
          </td>
          {checkRole(userRole, "release") && (
            <td>
              Релиз
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "release");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "bl_smgs_cmr") && (
            <td>
              BL/СМГС/CMR
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "bl_smgs_cmr");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "td") && (
            <td>
              ТД
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "td");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "date_do") && (
            <td>
              Дата ДО
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "date_do");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "port") && (
            <td>
              Порт
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "port");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "is_ds") && (
            <td>
              Д/С для подачи
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "is_ds");
                }}
              />
            </td>
          )}
          <td>
            Фрахтовый счет
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "fraht_account");
              }}
            />
          </td>
          {checkRole(userRole, "is_docs") && <td>Документы для подачи</td>}
          {checkRole(userRole, "declaration_number") && (
            <td>
              Номер декларации
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "declaration_number");
                }}
              />
            </td>
          )}
          <td>
            Дата выпуска декларации
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "declaration_issue_date");
              }}
            />
          </td>
          {checkRole(userRole, "availability_of_ob") && (
            <td>
              Наличие ОБ
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "availability_of_ob");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "answer_of_ob") && (
            <td>
              Ответ ОБ
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "answer_of_ob");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "expeditor") && (
            <td>
              Экспедитор
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "expeditor");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "destination_station") && (
            <td>
              Станция прибытия
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "destination_station");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "km_to_dist") && (
            <td>
              Осталось км до ст. назначения
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "km_to_dist");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "train_depart_date") && (
            <td>
              Дата отправки по ЖД
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "train_depart_date");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "train_arrive_date") && (
            <td>
              Дата прибытия по ЖД
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "train_arrive_date");
                }}
              />
            </td>
          )}
          {checkRole(userRole, "pickup") && (
            <td>
              Автовывоз
              <FilterFilled
                onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                  handleTdClick<TableProps>(event, "pickup");
                }}
              />
            </td>
          )}
          <td>
            Дата прибытия на склад
            <FilterFilled
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "store_arrive_date");
              }}
            />
          </td>
          {checkRole(userRole, "stock_place_name") && (
            <td
              onClick={(event: React.MouseEvent<HTMLTableCellElement>) => {
                handleTdClick<TableProps>(event, "stock_place_name");
              }}
            >
              Сток Сдачи
            </td>
          )}
          {checkRole(userRole, "comment") && <td>Комментарий</td>}
        </tr>
      </thead>
      {popupData && (
        <div ref={popupRef} id="popup">
          <FilterList
            dataToFiltr={popupData.dataToFiltr}
            objectKey={popupData.key}
          />
        </div>
      )}
    </>
  );
};
