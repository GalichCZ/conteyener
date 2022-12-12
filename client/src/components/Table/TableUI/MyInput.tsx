import React from "react";
import { Form, Input, DatePicker } from "antd";

interface MyInputInterface {
  className?: string;
  label: string;
  onChange?: (e: { target: { value: any } }) => void;
}

export const MyInput: React.FC<MyInputInterface> = ({
  className,
  label,
  onChange,
}) => {
  return (
    <Form.Item className={className} label={label}>
      <Input onChange={onChange} placeholder={label} />
    </Form.Item>
  );
};
