import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { TechStore } from "../../../functions/techStoreFuncs";
import { TechStoreData } from "../../../Types/Types";

const TechStoreFuncs = new TechStore();

interface TechStoreSelectProps {
  opened?: boolean;
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  name?: string;
}

export const TechStoreSelect: React.FC<TechStoreSelectProps> = ({
  opened,
  className,
  value,
  onChange,
  name,
}) => {
  const [stores, setStores] = useState<TechStoreData[]>();
  const [err, setErr] = useState<string | null>();

  const getStores = async () => {
    const response = await TechStoreFuncs.getTechStore();
    if ("error" in response) setErr(response.error);
    else setStores(response);
  };

  useEffect(() => {
    if (opened) getStores();
  }, [opened]);

  return (
    <Form.Item name={name} className={className} label="Склад">
      <p style={{ marginBottom: "0px" }}>{value ? value : "Не внесено"}</p>
      <Select
        // value={value}
        placeholder="Выберите склад"
        onChange={onChange}
        options={stores?.map((store) => ({
          value: store._id,
          label: store.name,
        }))}
      />
    </Form.Item>
  );
};
