import { Button, Form } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { MyInput } from "../../../components";
import ReDrawContext from "../../../store/redraw-context";
import { createStockPlace } from "../Functions/StockApi";
import { dropInput } from "../Functions/StockHandlers";
import { IStockData } from "../Types";

export const ContainerStockCreate = () => {
  const redrawCtx = useContext(ReDrawContext);
  const [disable, setDisabel] = useState<boolean>(true);
  const [data, setData] = useState<IStockData>({
    name: "",
    address: "",
    contact: "",
    note: "",
  });

  const createStockPlaceHandler = async () => {
    redrawCtx.reDrawHandler(true);
    const result = await createStockPlace(data);

    if (result) {
      redrawCtx.reDrawHandler(false);
      dropInput(setData);
    }
    console.log(result);
  };

  function checkFilled() {
    if (
      data.name != "" &&
      data.address != "" &&
      data.contact != "" &&
      data.note != ""
    )
      setDisabel(false);
    else setDisabel(true);
  }

  useEffect(() => {
    checkFilled();
  }, [data]);

  return (
    <div className="stock-create">
      <Form layout="vertical">
        <MyInput
          label="Наименование"
          value={data.name}
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
        <MyInput
          label="Адрес"
          value={data.address}
          onChange={(e) => {
            setData({ ...data, address: e.target.value });
          }}
        />
        <MyInput
          label="Контакт"
          value={data.contact}
          onChange={(e) => {
            setData({ ...data, contact: e.target.value });
          }}
        />
        <MyInput
          label="Примечание"
          value={data.note}
          onChange={(e) => {
            setData({ ...data, note: e.target.value });
          }}
        />
        <Form.Item>
          <Button disabled={disable} onClick={createStockPlaceHandler}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
