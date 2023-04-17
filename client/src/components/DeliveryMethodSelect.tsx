import React from "react";
import { Form, Select, Tooltip } from "antd";

const { Option } = Select;

interface IDeliveryMethodSelectProps {
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

export const DeliveryMethodSelect: React.FC<IDeliveryMethodSelectProps> = ({
  value,
  className,
  onChange,
}) => {
  const options = [
    {
      value: "Морe",
      label: "Морe",
      tooltip: "Доставка контейнера морским путем",
    },
    {
      value: "Поезд",
      label: "Поезд",
      tooltip: "Доставка контейнера прямым Ж/Д",
    },
    {
      value: "Авто",
      label: "Авто",
      tooltip: "Доставка контейнера прямым авто",
    },
    {
      value: "Авиа",
      label: "Авиа",
      tooltip: "Доставка груза прямым самолетом",
    },
    { value: "other", label: "Иное", tooltip: "Доставка контейнера" },
  ];

  return (
    <Form.Item className={className} label="Способ доставки">
      <>
        <Select
          onChange={onChange}
          value={value}
          options={options}
          placeholder="Способ доставки"
        />
      </>
    </Form.Item>
  );
};
