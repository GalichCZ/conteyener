import { List } from "antd";
import React, { useState } from "react";
import { IStockData } from "../Types";

export const ContainerStockDraw = () => {
  const [data, setData] = useState<IStockData[]>();

  return (
    <List className="channels">
      {data?.map((item, key) => {
        return (
          <List.Item key={key}>
            <div>
              <b>Название:</b>
              <b>{item.name}</b>
            </div>
            <div>
              <p>Адрес:</p>
              <p>{item.address}</p>
            </div>
          </List.Item>
        );
      })}
    </List>
  );
};
