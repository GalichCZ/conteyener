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
  return (
    <Form.Item className={className} label="Способ доставки">
      <>
        <Select onChange={onChange} value={value} placeholder="Способ доставки">
          <Option value="Морe" label="Морe">
            <Tooltip title="Доставка контейнера морским путем">
              <p>Морe</p>
            </Tooltip>
          </Option>
          <Option value="Поезд" label="Поезд">
            <Tooltip title="Доставка контейнера прямым Ж/Д">
              <p>Поезд</p>
            </Tooltip>
          </Option>
          <Option value="Авто" label="Авто">
            <Tooltip title="Доставка контейнера прямым авто">
              <p>Авто</p>
            </Tooltip>
          </Option>
          <Option value="Авиа" label="Авиа">
            <Tooltip title="Доставка груза прямым самолетом">
              <p>Авиа</p>
            </Tooltip>
          </Option>
          <Option value="Иное" label="Иное">
            <Tooltip title="Доставка контейнера">
              <p>Иное</p>
            </Tooltip>
          </Option>
        </Select>
      </>
    </Form.Item>
  );
};
