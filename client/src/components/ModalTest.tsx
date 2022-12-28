import { Modal } from "antd";
import React from "react";
import { setOpen } from "../store/slices/testModalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export const ModalTest = () => {
  const open = useAppSelector((state) => state.testModal.open);
  const number = useAppSelector((state) => state.testModal.number);
  const dispatch = useAppDispatch();

  const handleOk = () => {
    dispatch(setOpen());
  };

  const handleCancel = () => {
    dispatch(setOpen());
  };

  return (
    <Modal destroyOnClose onOk={handleOk} onCancel={handleCancel} open={open}>
      <strong>{number}</strong>
    </Modal>
  );
};
