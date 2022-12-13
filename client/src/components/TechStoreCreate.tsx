import React from "react";
import { InputNumber, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

export const TechStoreCreate = () => {
  const onChange = (value: any) => {
    console.log("changed", value);
  };
  return (
    <div className="tech-store_create">
      <Form layout="vertical">
        <Form.Item label="Дней на доставку">
          <InputNumber min={1} defaultValue={0} onChange={onChange} />
        </Form.Item>
        <Form.Item style={{ margin: "0 15px" }} label="Название">
          <Input placeholder="Название" />
        </Form.Item>
        <Form.Item label="Адрес">
          <Input placeholder="Адрес" />
        </Form.Item>
      </Form>
    </div>
  );
};
