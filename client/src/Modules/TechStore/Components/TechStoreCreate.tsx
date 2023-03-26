import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { TechStoreData } from "../../../Types/Types";
import { TechStore } from "../Functions/techStoreFuncs";
import { MyInput } from "../../../components";

const TechStoreFuncs = new TechStore();

interface TechStoreCreateProps {
  setStatus: (c: boolean) => void;
}

export const TechStoreCreate: React.FC<TechStoreCreateProps> = ({
  setStatus,
}) => {
  const [data, setData] = useState<TechStoreData>({
    name: "",
    address: "",
    receiver: "",
    contact: "",
    note: "",
  });
  const [err, setErr] = useState<string | null>();

  const handleCreate = async (data: TechStoreData) => {
    const response = await TechStoreFuncs.createTechStore(data);
    if ("error" in response) setErr(response.error);
    else setStatus(true);
  };

  return (
    <div className="tech-store_create">
      <Form layout="vertical">
        <div className="tech-store_create_inputs">
          <MyInput
            label="Название"
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
          <MyInput
            label="Адрес"
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
            }}
          />
          <MyInput
            label="Получатель"
            onChange={(e) => {
              setData({ ...data, receiver: e.target.value });
            }}
          />
          <MyInput
            label="Контактное лицо"
            onChange={(e) => {
              setData({ ...data, contact: e.target.value });
            }}
          />
        </div>
        <Form.Item label="Примечание">
          <Input.TextArea
            onChange={(e) => {
              setData({ ...data, note: e.target.value });
            }}
          />
        </Form.Item>
      </Form>
      <Button
        onClick={() => handleCreate(data)}
        style={{ transform: "translateX(45px)" }}
      >
        Создать
      </Button>
    </div>
  );
};
