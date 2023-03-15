import React from "react";
import { Form, Input } from "antd";

interface MyInputInterface {
  className?: string;
  style?: object;
  label: string;
  value?: string | number;
  onChange?: (e: { target: HTMLInputElement }) => void;
  name?: string;
}

export const MyInput: React.FC<MyInputInterface> = ({
  className,
  label,
  onChange,
  style,
  value,
  name,
}) => {
  return (
    <Form.Item name={name} style={style} className={className} label={label}>
      <>
        <Input onChange={onChange} value={value} placeholder={label} />
      </>
    </Form.Item>
  );
};
