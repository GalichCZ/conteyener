import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { TechStoreData } from "../../../Types/Types";
import { TechStore } from "../Functions/techStoreFuncs";

const TechStoreFuncs = new TechStore();

interface TechStoreCreateProps {
  setStatus: (c: boolean) => void;
}

export const TechStoreCreate: React.FC<TechStoreCreateProps> = ({
  setStatus,
}) => {
  const [data, setData] = useState<TechStoreData>({
    address: "",
    name: "",
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
        <Form.Item style={{ margin: "0 15px" }} label="Название">
          <Input
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Адрес">
          <Input
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
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
