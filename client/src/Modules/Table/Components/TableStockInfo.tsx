import React from "react";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

export const TableStockInfo = () => {
  const open = useAppSelector((state) => state.tableStock.open);
  const info = useAppSelector((state) => state.tableStock.info);

  const handleOk = () => {};
  const handleCancel = () => {};

  return (
    <Modal onOk={handleOk} onCancel={handleCancel} open={open}>
      <p>Название: {info?.name}</p>
      <p>Адрес: {info?.address}</p>
      <p>Контакт: {info?.contact}</p>
      <p>Примечание: {info?.note}</p>
    </Modal>
  );
};
