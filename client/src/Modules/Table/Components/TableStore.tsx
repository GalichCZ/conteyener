import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { TechStoreData } from "../../../Types/Types";
import { TechStore } from "../../../Modules/TechStore/Functions/techStoreFuncs";
import { Item } from "../Functions/itemFuncs";
import { setOpenTableStore } from "../../../store/slices/tableStoreSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { MyInput, TechStoreSelect } from "../../../components";

const { TextArea } = Input;

const TechStoreFuncs = new TechStore();
const ItemFuncs = new Item();

export const TableStore = ({}) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.tableStore.open);
  const store = useAppSelector((state) => state.tableStore.store);

  const [err, setErr] = useState<string | null>();

  const [storeData, setStoreData] = useState<TechStoreData>({
    _id: "",
    receiver: "",
    contact: "",
    note: "",
    address: "",
    name: "",
  });

  const handleOk = async () => {
    dispatch(setOpenTableStore());
  };

  const handleCancel = () => {
    dispatch(setOpenTableStore());
  };

  const getOneTechStore = async (_id: string) => {
    const response = await TechStoreFuncs.getOneTechStore(_id);
    if ("error" in response) setErr(response.error);
    else {
      setStoreData(response);
    }
  };

  useEffect(() => {
    if (open) getOneTechStore(store);
  }, [open]);

  return (
    <Modal
      className="table-store_modal"
      title="Склад"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <p>Название: {storeData.name}</p>
      <p>Адрес: {storeData.address}</p>
      <p>Получатель: {storeData.receiver}</p>
      <p>Контакт: {storeData.contact}</p>
      <p>Примечание: {storeData.note}</p>
    </Modal>
  );
};
