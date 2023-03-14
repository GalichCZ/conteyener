import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getStockPlaces } from "../Modules/ContainerStock/Functions/StockApi";
import { IStockData } from "../Modules/ContainerStock/Types";

interface IStockPlaceSelectProps {
  opened?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

const StockPlaceSelect: React.FC<IStockPlaceSelectProps> = ({
  opened,
  value,
  onChange,
}) => {
  const [stockPlaces, setStockPlaces] = useState<IStockData[]>();

  const getStockPlacesHandler = async () => {
    const result = await getStockPlaces();
    if (result) setStockPlaces(result);
  };

  useEffect(() => {
    if (opened) getStockPlacesHandler();
  }, [opened]);

  return (
    <Form.Item label="Сток Сдачи">
      <Select
        placeholder="Сток Сдачи"
        value={value}
        onChange={onChange}
        options={stockPlaces?.map((stockPlace) => ({
          value: stockPlace._id,
          label: stockPlace.name,
        }))}
      />
    </Form.Item>
  );
};

export default StockPlaceSelect;
