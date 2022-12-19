import React, { useState } from "react";
import { Select, Form } from "antd";

interface SelectDelivery {
  onChange: (value: string) => void;
}

export const SelectDelivery: React.FC<SelectDelivery> = ({ onChange }) => {
  return (
    <Form.Item label="Способ Доставки">
      <Select
        defaultValue="Способ доставки"
        style={{ width: 120 }}
        onChange={onChange}
        options={[
          {
            value: "sea_vld",
            label: "Море ВЛД",
          },
          {
            value: "sea_spb",
            label: "Море СПБ",
          },
          {
            value: "sea_new_ros",
            label: "Море Новоросс",
          },
          {
            value: "sea_riga",
            label: "Море Рига",
          },
          {
            value: "sea_kotka",
            label: "Море Котка",
          },
          {
            value: "railway",
            label: "ЖД",
          },
        ]}
      />
    </Form.Item>
  );
};

interface ShowDelivery {
  delivery_method: string;
}

export const ShowDelivery: React.FC<ShowDelivery> = ({ delivery_method }) => {
  return (
    <td>
      {delivery_method === "sea_vld" && "Море ВЛД"}
      {delivery_method === "sea_spb" && "Море СПБ"}
      {delivery_method === "sea_new_ros" && "Море Новоросс"}
      {delivery_method === "sea_riga" && "Море Рига"}
      {delivery_method === "sea_kotka" && "Море Котка"}
      {delivery_method === "railway" && "ЖД"}
    </td>
  );
};