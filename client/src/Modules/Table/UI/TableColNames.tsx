import { FilterFilled } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { TableProps } from "@/Types/Types";
import { FilterList } from "../Components/FilterList";
import { checkRole } from "@/utils/checkRole";
import { colNames } from "./colNames";
import { Tooltip } from "react-tooltip";
import { createPortal } from "react-dom";

interface ITableColProps {
  data: TableProps[] | undefined;
  userRole?: string;
}
interface IPopupData {
  dataToFiltr: any[] | undefined;
  key: string;
}

export const TableColNames: React.FC<ITableColProps> = ({ data, userRole }) => {
  const [popupData, setPopupData] = useState<IPopupData | null>(null);

  function getRequestDates<T>(arr: T[], key: keyof T): Array<T[keyof T]> {
    return arr?.map((obj) => obj[key]);
  }

  function handleTdClick<T extends Record<string, any>>(
    key: keyof T & keyof TableProps
  ) {
    if (popupData === null) {
      const dataToFiltr = data && getRequestDates<TableProps>(data, key);

      const keyProp = key.toString();

      setPopupData({ dataToFiltr, key: keyProp });
    } else setPopupData(null);
  }

  const [tooltipId, setTooltipId] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  return (
    <>
      <thead>
        <tr>
          {checkRole(userRole, "request_date") && (
            <td>
              Дата заявки
              <FilterFilled
                data-tooltip-id="request_date"
                data-tooltip-place="top"
                onClick={() => {
                  setTooltipId("request_date");
                  setTooltipIsOpen(!tooltipIsOpen);
                  handleTdClick<TableProps>("request_date");
                }}
              />
            </td>
          )}
          <td>
            Внутренний <br /> номер
            <FilterFilled
              data-tooltip-id="inside_number"
              data-tooltip-place="top"
              onClick={() => {
                setTooltipId("inside_number");
                setTooltipIsOpen(!tooltipIsOpen);
                handleTdClick<TableProps>("inside_number");
              }}
            />
          </td>
          <td>
            Номер <br /> проформы
            <FilterFilled
              data-tooltip-id="proform_number"
              data-tooltip-place="top"
              onClick={() => {
                setTooltipId("proform_number");
                setTooltipIsOpen(!tooltipIsOpen);
                handleTdClick<TableProps>("proform_number");
              }}
            />
          </td>
          <td>
            Номер заказа
            <FilterFilled
              data-tooltip-id="order_number"
              data-tooltip-place="top"
              onClick={() => {
                setTooltipId("order_number");
                setTooltipIsOpen(!tooltipIsOpen);
                handleTdClick<TableProps>("order_number");
              }}
            />
          </td>
          <td>
            Номер <br /> контейнера
            <FilterFilled
              data-tooltip-id="container_number"
              data-tooltip-place="top"
              onClick={() => {
                setTooltipId("container_number");
                setTooltipIsOpen(!tooltipIsOpen);
                handleTdClick<TableProps>("container_number");
              }}
            />
          </td>
          {colNames.map((name, key) => {
            return (
              checkRole(userRole, name.key) && (
                <td key={key}>
                  {name.name}
                  {name.hasFilter ? (
                    <FilterFilled
                      data-tooltip-id={name.key as keyof TableProps}
                      data-tooltip-place="top"
                      onClick={() => {
                        setTooltipId(name.key as keyof TableProps);
                        setTooltipIsOpen(!tooltipIsOpen);
                        handleTdClick<TableProps>(name.key as keyof TableProps);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </td>
              )
            );
          })}
        </tr>
      </thead>

      {popupData && (
        <Tooltip
          className="tooltip"
          opacity="1"
          clickable
          id={tooltipId}
          isOpen={tooltipIsOpen}
          style={{ zIndex: 10 }}
        >
          <FilterList
            dataToFiltr={popupData.dataToFiltr}
            objectKey={popupData.key}
          />
        </Tooltip>
      )}
    </>
  );
};
