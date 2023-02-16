import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { Store, TechStoreData } from "../../../Types/Types";
import { TechStore } from "../../../Modules/TechStore/Functions/techStoreFuncs";
import { Item } from "../Functions/itemFuncs";
import { setOpenTableStore } from "../../../store/slices/tableStoreSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { MyInput, TechStoreSelect } from "../../../components";

const { TextArea } = Input;

const TechStoreFuncs = new TechStore();
const ItemFuncs = new Item();

export const TableStore = ({}) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.tableStore.open);
  const itemId = useAppSelector((state) => state.tableStore.itemId);
  const storeData = useAppSelector((state) => state.tableStore.storeData);

  const [err, setErr] = useState<string | null>();
  const [value, setDefaulValue] = useState<string>("");
  const [data, setData] = useState<TechStoreData>({
    address: "",
    delivery_time: 0,
    name: "",
  });

  const [updateStore, setUpdateStore] = useState<Store>({
    _id: "",
    receiver: "",
    contact: "",
    note: "",
    techStore: "",
  });

  const handleOk = async () => {
    await handleUpdateStore(updateStore);
    dispatch(setOpenTableStore());
  };

  const handleCancel = () => {
    dispatch(setOpenTableStore());
  };

  const getOneTechStore = async (_id: string) => {
    const response = await TechStoreFuncs.getOneTechStore(_id);
    if ("error" in response) setErr(response.error);
    else {
      setData(response);
      setDefaulValue(response.name);
    }
  };

  const handleUpdateStore = async (updateStore: Store) => {
    const response = await ItemFuncs.updateStore(updateStore, itemId);
  };

  useEffect(() => {
    if (open && storeData) {
      setUpdateStore(storeData);
    }
  }, [open]);

  useEffect(() => {
    if (storeData) getOneTechStore(storeData.techStore);
  }, [storeData]);

  return (
    <Modal
      className="table-store_modal"
      title="Склад"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form>
        <TechStoreSelect
          value={value}
          opened={open}
          onChange={(value: string) => {
            getOneTechStore(value);
            setUpdateStore({ ...updateStore, techStore: value });
          }}
        />
        <p>Адрес: {data.address}</p>
        <MyInput
          value={storeData?.receiver}
          onChange={(e) => {
            setUpdateStore({ ...updateStore, receiver: e.target.value });
          }}
          label="Получатель"
        />
        <MyInput
          value={storeData?.contact}
          onChange={(e) => {
            setUpdateStore({ ...updateStore, contact: e.target.value });
          }}
          label="Контактное лицо"
        />
        <Form.Item label="Примечание">
          <TextArea
            value={storeData?.note}
            onChange={(e) => {
              setUpdateStore({ ...updateStore, note: e.target.value });
            }}
            rows={4}
            placeholder="Примечание"
          />
        </Form.Item>

        <p>Время доставки: {data.delivery_time}</p>
      </Form>
    </Modal>
  );
};
