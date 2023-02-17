import React from "react";
import { Form } from "antd";

interface DatePickerUpdateProps {
  label: string;
  value?: string;
  className?: string;
  onChange: (e: { target: HTMLInputElement }) => void;
}

export const DatePickerUpdate: React.FC<DatePickerUpdateProps> = ({
  label,
  value,
  onChange,
  className,
}) => {
  return (
    <Form.Item className={className} label={label}>
      <input
        placeholder={label}
        className="ant-input"
        type="date"
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
};
