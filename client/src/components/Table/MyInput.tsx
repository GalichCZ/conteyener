import React from "react";
import { Form, Input, DatePicker } from "antd";

interface MyInputInterface {
  className?: string;
  datePicker: boolean;
  label: string;
  onChange?: (e: { target: { value: any } }) => void;
  onChangeDate?: (date: any, dateString: string | number | Date) => void;
}

export const MyInput: React.FC<MyInputInterface> = ({
  className,
  datePicker,
  label,
  onChange,
  onChangeDate,
}) => {
  return (
    <Form.Item className={className} label={label}>
      {datePicker ? (
        <DatePicker onChange={onChangeDate} />
      ) : (
        <Input onChange={onChange} placeholder={label} />
      )}
    </Form.Item>
  );
};
