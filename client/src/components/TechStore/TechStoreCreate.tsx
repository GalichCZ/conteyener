import React, { useEffect, useState } from "react";
import { InputNumber, Form, Button, Input } from "antd";
import { MyInput } from "../Table/TableUI/MyInput";
import { TechStoreData } from "../../Types/Types";
import { TechStore } from "../../functions/techStoreFuncs";

const TechStoreFuncs = new TechStore();

interface TechStoreCreateProps {
  setStatus: (c: boolean) => void;
}

export const TechStoreCreate: React.FC<TechStoreCreateProps> = ({
  setStatus,
}) => {
  const [err, setErr] = useState<string | null>();

  const onChange = (value: any) => {
    setData({ ...data, delivery_time: value });
  };

  const [data, setData] = useState<TechStoreData>({
    delivery_time: 0,
    address: "",
    name: "",
  });

  const handleCreate = async (data: TechStoreData) => {
    const response = await TechStoreFuncs.createTechStore(data);
    if ("error" in response) setErr(response.error);
    else setStatus(true);
  };

  return (
    <div className="tech-store_create">
      <Form layout="vertical">
        <Form.Item label="Дней на доставку">
          <InputNumber min={1} defaultValue={0} onChange={onChange} />
        </Form.Item>
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
