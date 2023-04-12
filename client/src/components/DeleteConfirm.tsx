import { Button, Modal } from "antd";
import React, { useState } from "react";

interface IDeleteConfirm {
  open: boolean;
  setOpen: (c: boolean) => void;
  deleteFunction: () => Promise<boolean | undefined>;
}

export const DeleteConfirm: React.FC<IDeleteConfirm> = ({
  open,
  setOpen,
  deleteFunction,
}) => {
  const onOk = async () => {
    const res = await deleteFunction();
    if (res) {
      setOpen(false);
    }
  };
  const onCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      title="Подтверждение удаления"
      footer={[
        <Button onClick={onOk} type="primary" danger>
          Удалить
        </Button>,
        <Button onClick={onCancel}>Отмена</Button>,
      ]}
    >
      Вы действительно хотите удалить ?
    </Modal>
  );
};
