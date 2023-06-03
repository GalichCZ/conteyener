import React, { FocusEventHandler } from "react";
import { Form, Input } from "antd";

interface MyInputInterface {
  className?: string;
  style?: object;
  label: string;
  value?: string | number;
  onChange?: (e: { target: HTMLInputElement }) => void;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

export const MyInput: React.FC<MyInputInterface> = ({
  className,
  label,
  onChange,
  style,
  value,
  name,
  onBlur,
  onFocus,
}) => {
  return (
    <Form.Item name={name} style={style} className={className} label={label}>
      <>
        <Input
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          placeholder={label}
        />
      </>
    </Form.Item>
  );
};
