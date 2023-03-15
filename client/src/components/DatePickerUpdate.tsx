import React from "react";
import { DatePicker, Form } from "antd";
import moment from "moment";

interface DatePickerUpdateProps {
  label: string;
  value?: string;
  className?: string;
  onChange: (date: any, dateString: any) => void;
}

export const DatePickerUpdate: React.FC<DatePickerUpdateProps> = ({
  label,
  value,
  onChange,
  className,
}) => {
  return (
    <Form.Item className={className} label={label}>
      <DatePicker value={value ? moment(value) : null} onChange={onChange} />
    </Form.Item>
  );
};
