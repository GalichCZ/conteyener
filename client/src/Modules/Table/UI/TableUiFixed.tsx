import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { IItem, TableProps } from "../../../Types/Types";
import { useCutString } from "../../../hooks/useCutString";
import { checkRole } from "@/utils/checkRole";

interface ITableUi {
  items: TableProps[] | undefined;
  timeConvert: (time: string) => string;
  tableUpdateHandler?: (dispatch: any, item: IItem) => void;
  setHeights1?: (c: Array<number | null | undefined>) => void;
  useColorTextHook: (value: string | undefined, searchValue: string) => object;
  userRole?: string;
}

export const TableUiFixed: React.FC<ITableUi> = ({
  items,
  timeConvert,
  tableUpdateHandler,
  setHeights1,
  useColorTextHook,
  userRole,
}) => {
  const cutString = useCutString();
  const dispatch = useAppDispatch();
  const myRefs = useRef<Array<HTMLTableRowElement | null>>([]);
  const [height, setHeight] = useState<Array<number | null | undefined>>([]);
  const heights = useAppSelector((state) => state.heightHandler.heights);
  const searchValue = useAppSelector((state) => state.search.value);

  const getHeight = () => {
    if (myRefs.current) {
      setHeight(
        myRefs.current.map((ref) => {
          return ref?.clientHeight;
        })
      );
    }
  };

  useEffect(() => {
    if (height.length > 0 && setHeights1) setHeights1(height);
  }, [height]);

  useEffect(() => {
    getHeight();
  }, [items]);

  function heightCheck(height: number) {
    if (height < 50) return 50;
    else return height;
  }

  return (
    <tbody>
      {items?.map((item, key) => {
        return (
          <tr
            className="table-row"
            style={{
              height: `${heightCheck(heights[key])}px`,
            }}
            ref={(el) => (myRefs.current[key] = el)}
            key={key}
          >
            {checkRole(userRole, "request_date") && (
              <td
                style={{
                  cursor: "pointer",
                  ...useColorTextHook(item.request_date, searchValue),
                }}
                onClick={() =>
                  userRole === "manager_int" &&
                  tableUpdateHandler &&
                  tableUpdateHandler(dispatch, item)
                }
              >
                {timeConvert(item.request_date)}
              </td>
            )}
            <td>
              <div className="arr-info">
                {item.inside_number.map((num, key) => {
                  return (
                    <p
                      style={{
                        ...useColorTextHook(num, searchValue),
                      }}
                      key={key}
                    >
                      {num}
                    </p>
                  );
                })}
              </div>
            </td>
            <td>
              <div className="arr-info">
                {item.proform_number.map((num, key) => {
                  return (
                    <p
                      style={{
                        ...useColorTextHook(num, searchValue),
                      }}
                      key={key}
                    >
                      {cutString(num, 12)}
                    </p>
                  );
                })}
              </div>
            </td>
            <td>
              <div className="arr-info">
                {item.order_number.map((num, key) => {
                  return (
                    <Tooltip destroyTooltipOnHide={true} key={key} title={num}>
                      <p
                        style={{
                          ...useColorTextHook(num, searchValue),
                        }}
                        key={key}
                      >
                        {cutString(num, 10)}
                      </p>
                    </Tooltip>
                  );
                })}
              </div>
            </td>
            <td
              style={{
                ...useColorTextHook(
                  item.container_number
                    ? item.container_number
                    : item.container?.container_number,
                  searchValue
                ),
              }}
            >
              {" "}
              {item.container_number
                ? item.container_number
                : item.container?.container_number}{" "}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
