import React from "react";
import { Form } from "antd";

interface DatePickerUpdateProps {
  label: string;
  defaultValue: string;
  className?: string;
  onChange: (e: { target: { value: string } }) => void;
}

export const DatePickerUpdate: React.FC<DatePickerUpdateProps> = ({
  label,
  defaultValue,
  onChange,
  className,
}) => {
  return (
    <Form.Item className={className} label={label}>
      <input
        placeholder={label}
        className="ant-input"
        type="date"
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </Form.Item>
  );
};
