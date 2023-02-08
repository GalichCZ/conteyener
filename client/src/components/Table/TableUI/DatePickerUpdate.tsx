import React from "react";
import { Form } from "antd";

interface DatePickerUpdateProps {
  label: string;
  value?: string;
  className?: string;
  onChange: (e: { target: { value: string } }) => void;
}

export const DatePickerUpdate: React.FC<DatePickerUpdateProps> = ({
  label,
  value,
  onChange,
  className,
}) => {
  return (
    <Form.Item className={className} label={label}>
      <p style={{ margin: "0" }}>{value ? value : "Не внесено"}</p>
      <input
        placeholder={label}
        className="ant-input"
        type="date"
        // value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
};
