import React from "react";
import { Modal } from "antd";

interface TableStoreProps {
  opened: boolean | undefined;
  store_name: string | undefined;
  store_address: string | undefined;
  store_contact: string | undefined;
  setOpen: (c: any) => any;
}

export const TableStore: React.FC<TableStoreProps> = ({
  opened,
  store_name,
  store_address,
  store_contact,
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
      <p>Наименование склада: {store_name}</p>
      <p>Адрес: {store_address}</p>
      <p>Контактное лицо: {store_contact}</p>
    </Modal>
  );
};
