import { Form, InputNumber, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { TechStore } from "../Functions/techStoreFuncs";
import { TechStoreData } from "../../../Types/Types";
import { MyInput } from "../../../components/MyInput";

interface TechStoreModalProps {
  open: boolean;
  setOpen: (c: boolean) => void;
  dataStore: TechStoreData;
  setStatus: (c: boolean) => void;
}

const TechStoreFuncs = new TechStore();

export const TechStoreModal: React.FC<TechStoreModalProps> = ({
  open,
  setOpen,
  dataStore,
  setStatus,
}) => {
  const [err, setErr] = useState<string | null>();

  const [data, setData] = useState<TechStoreData>({
    _id: "",
    address: "",
    name: "",
  });

  const updateHandler = async (data: TechStoreData) => {
    const response = await TechStoreFuncs.updateTechStore(data);
    if ("error" in response) setErr(response.error);
    else setStatus(true);
  };

  const handleOk = () => {
    updateHandler(data);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData(dataStore);
  }, [dataStore]);

  return (
    <Modal onOk={handleOk} onCancel={handleCancel} open={open}>
      <Form>
        <MyInput
          style={{ margin: "0 15px" }}
          label="Название"
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
      </Form>
    </Modal>
  );
};
