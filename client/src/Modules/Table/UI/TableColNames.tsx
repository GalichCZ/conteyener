import { FilterFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { TableProps } from "@/Types/Types";
import { FilterList } from "../Components/FilterList";
import { checkRole } from "@/utils/checkRole";
import { colNames } from "./colNames";
import { Tooltip } from "react-tooltip";

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
