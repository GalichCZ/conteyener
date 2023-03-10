import { Button, Form } from "antd";
import React, { useState } from "react";
import { MyInput } from "../../../components";
import { IStockData } from "../Types";

export const ContainerStockCreate = () => {
  const [data, setData] = useState<IStockData>({ name: "", address: "" });

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
          <Button>Создать</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
