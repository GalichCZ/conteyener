import React from "react";
import { Modal } from "antd";
import { Store } from "../../../Types/Types";

interface TableStoreProps {
  opened: boolean | undefined;
  storeData: Store | undefined;
  setOpen: (c: any) => any;
}

export const TableStore: React.FC<TableStoreProps> = ({
  opened,
  storeData,
  setOpen,
}) => {
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      className="table-store_modal"
      title="Склад"
      open={opened}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Получатель: {storeData?.receiver}</p>
      <p>Наименование склада: {storeData?.name}</p>
      <p>Адрес: {storeData?.address}</p>
      <p>Контактное лицо: {storeData?.contact}</p>
      <p>Примечание: {storeData?.note}</p>
    </Modal>
  );
};
