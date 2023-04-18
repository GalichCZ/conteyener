import { Button, Form, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MyInput } from "../../../components";
import { useAppSelector } from "../../../hooks/hooksRedux";
import ReDrawContext from "../../../store/redraw-context";
import { setOpen } from "../../../store/slices/stockModalSlice";
import { updateStockPlace } from "../Functions/StockApi";
import { dropInput } from "../Functions/StockHandlers";
import { IStockData } from "../Types";

export const ContainerStockModal = () => {
  const dispatch = useDispatch();
  const redrawCtx = useContext(ReDrawContext);
  const open = useAppSelector((state) => state.stockModal.open);
  const dataStock = useAppSelector((state) => state.stockModal.data);

  const [data, setData] = useState<IStockData>({
    name: "",
    address: "",
    contact: "",
    note: "",
  });

  const updateStock = async () => {
    redrawCtx.reDrawHandler(true);
    const result = await updateStockPlace(data);
    if (result) redrawCtx.reDrawHandler(false);
    dropInput(setData);
    dispatch(setOpen());
  };

  const handleOk = () => {
    updateStock();
  };

  const handleCancel = () => {
    dropInput(setData);
    dispatch(setOpen());
  };

  useEffect(() => {
    if (dataStock) setData(dataStock);
  }, [dataStock]);

  return (
    <Modal onCancel={handleCancel} onOk={handleOk} open={open}>
      <Form>
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
      </Form>
    </Modal>
  );
};
