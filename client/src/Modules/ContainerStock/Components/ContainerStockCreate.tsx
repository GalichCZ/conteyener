import { Button, Form } from "antd";
import React, { useContext, useState } from "react";
import { MyInput } from "../../../components";
import ReDrawContext from "../../../store/redraw-context";
import { createStockPlace } from "../Functions/StockApi";
import { IStockData } from "../Types";

export const ContainerStockCreate = () => {
  const redrawCtx = useContext(ReDrawContext);
  const [data, setData] = useState<IStockData>({ name: "", address: "" });

  const createStockPlaceHandler = async () => {
    redrawCtx.reDrawHandler(true);
    const result = await createStockPlace(data);

    if (result) redrawCtx.reDrawHandler(false);
    console.log(result);
  };

  return (
    <div className="stock-create">
      <Form layout="vertical">
        <MyInput
          label="Наименование"
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
        <MyInput
          label="Адрес"
          onChange={(e) => {
            setData({ ...data, address: e.target.value });
          }}
        />
        <Form.Item>
          <Button onClick={createStockPlaceHandler}>Создать</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
