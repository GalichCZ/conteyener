import React from "react";
import { Form, Input } from "antd";

interface MyInputInterface {
  className?: string;
  style?: object;
  label: string;
  defaultValue?: string | number;
  onChange?: (e: { target: { value: any } }) => void;
  name?: string;
}

export const MyInput: React.FC<MyInputInterface> = ({
  className,
  label,
  onChange,
  style,
  defaultValue,
  name,
}) => {
  return (
    <Form.Item name={name} style={style} className={className} label={label}>
      <Input
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={label}
      />
    </Form.Item>
  );
};
