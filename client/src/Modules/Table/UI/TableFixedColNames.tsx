import { FC, useState } from "react";
import { checkRole } from "@/utils/checkRole";
import { TableProps } from "@/Types/Types";
import { Tooltip } from "react-tooltip";
import { FilterFilled } from "@ant-design/icons";
import { FilterList } from "../Components/FilterList";

interface ITableColProps {
  data: TableProps[] | undefined;
  userRole?: string;
}

interface IPopupData {
  dataToFiltr: any[] | undefined;
  key: string;
}

const TableFixedColNames: FC<ITableColProps> = ({ data, userRole }) => {
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

export default TableFixedColNames;
