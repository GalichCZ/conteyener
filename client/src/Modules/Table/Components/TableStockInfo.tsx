import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { IStockData } from "../../ContainerStock/Types";
import { getOneStockPlaceByName } from "../../ContainerStock/Functions/StockApi";
import { setOpenTableStock } from "../../../store/slices/tableStockSlice";

export const TableStockInfo = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.tableStock.open);
  const info = useAppSelector((state) => state.tableStock.info);
  console.log(info);

  const [data, setData] = useState<IStockData>();

  const getStockData = async () => {
    const result = await getOneStockPlaceByName(info);
    console.log(result);
    if (result) setData(result);
  };

  const handleOk = () => {
    dispatch(setOpenTableStock());
  };
  const handleCancel = () => {
    dispatch(setOpenTableStock());
  };

  useEffect(() => {
    open && getStockData();
  }, [open]);

  return (
    <Modal onOk={handleOk} onCancel={handleCancel} open={open}>
      <p>Название: {data?.name}</p>
      <p>Адрес: {data?.address}</p>
      <p>Контакт: {data?.contact}</p>
      <p>Примечание: {data?.note}</p>
    </Modal>
  );
};
