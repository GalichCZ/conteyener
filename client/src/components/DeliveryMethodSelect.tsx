import React from "react";
import { Form, Select, Tooltip } from "antd";

const { Option } = Select;

interface IDeliveryMethodSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const DeliveryMethodSelect: React.FC<IDeliveryMethodSelectProps> = ({
  value,
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
    <Form.Item label="Способ доставки">
      <>
        <Select
          onChange={onChange}
          value={value}
          options={options}
          placeholder="Способ доставки"
        />
        {/* <Select>
          {options.map((option, key) => {
            return (
              <Option
                value="1"
                label={<Tooltip title="Tooltip for Option 1">Option 1</Tooltip>}
                children={undefined}
              />
            );
          })}
        </Select> */}
      </>
    </Form.Item>
  );
};
