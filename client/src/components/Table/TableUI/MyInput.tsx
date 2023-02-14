import React from "react";
import { Form, Input } from "antd";

interface MyInputInterface {
  className?: string;
  style?: object;
  label: string;
  value?: string | number;
  onChange?: (e: { target: { value: any } }) => void;
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
        {/* <p style={{ marginBottom: "0px" }}>{value ? value : "Не внесено"}</p> */}
        <Input onChange={onChange} value={value} placeholder={label} />
      </>
    </Form.Item>
  );
};
