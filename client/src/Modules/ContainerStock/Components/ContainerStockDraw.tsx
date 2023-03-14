import { Button, List } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReDrawContext from "../../../store/redraw-context";
import { getStockPlaces } from "../Functions/StockApi";
import { IStockData } from "../Types";
import { setOpen, setData } from "../../../store/slices/stockModalSlice";

export const ContainerStockDraw = () => {
  const dispatch = useDispatch();
  const redrawCtx = useContext(ReDrawContext);
  const [stock, setStock] = useState<IStockData[]>();

  const getData = async () => {
    const data = await getStockPlaces();

    if (data) setStock(data);
  };

  const updateModalHandler = (stock: IStockData) => {
    dispatch(setOpen());
    dispatch(setData(stock));
  };

  useEffect(() => {
    getData();
  }, [redrawCtx.reDraw]);

  return (
    <List className="channels">
      {stock?.map((item, key) => {
        return (
          <List.Item key={key}>
            <div className="stock-pole">
              <b>Название: </b>
              <b> {item.name}</b>
            </div>
            <div className="stock-pole">
              <p>Адрес: </p>
              <p> {item.address}</p>
            </div>
            <Button onClick={() => updateModalHandler(item)}>
              Редактировать
            </Button>
          </List.Item>
        );
      })}
    </List>
  );
};
