import React, { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import { Store, TechStoreData } from "../../../Types/Types";
import { TechStore } from "../../../functions/techStoreFuncs";
import { Item } from "../../../functions/itemFuncs";
import { MyInput } from "../TableUI/MyInput";
import { TechStoreSelect } from "../../index";

const TechStoreFuncs = new TechStore();
const ItemFuncs = new Item();

interface TableStoreProps {
  opened: boolean | undefined;
  storeData: Store | undefined;
  setOpen: (c: any) => any;
  itemId: string;
}

export const TableStore: React.FC<TableStoreProps> = ({
  opened,
  storeData,
  setOpen,
  itemId,
}) => {
  const [err, setErr] = useState<string | null>();
  const [defaultValue, setDefaulValue] = useState<string>("");
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
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
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
    console.log(response);
  };

  useEffect(() => {
    if (opened && storeData) {
      setUpdateStore(storeData);
    }
  }, [opened]);

  useEffect(() => {
    console.log("data for update");
    console.log(updateStore);
  }, [updateStore]);

  useEffect(() => {
    if (storeData) getOneTechStore(storeData.techStore);
  }, [storeData]);

  return (
    <Modal
      className="table-store_modal"
      title="Склад"
      open={opened}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <TechStoreSelect
          defaultValue={defaultValue}
          opened={opened}
          onChange={(value: string) => {
            getOneTechStore(value);
            setUpdateStore({ ...updateStore, techStore: value });
          }}
        />
        <MyInput
          defaultValue={storeData?.contact}
          onChange={(e) => {
            setUpdateStore({ ...updateStore, contact: e.target.value });
          }}
          label="Контактное лицо"
        />
        <MyInput
          defaultValue={storeData?.note}
          onChange={(e) => {
            setUpdateStore({ ...updateStore, note: e.target.value });
          }}
          label="Примечание"
        />
        <MyInput
          defaultValue={storeData?.receiver}
          onChange={(e) => {
            setUpdateStore({ ...updateStore, receiver: e.target.value });
          }}
          label="Получатель"
        />
        <p>Адрес: {data.address}</p>
        <p>Время доставки: {data.delivery_time}</p>
      </Form>
    </Modal>
  );
};