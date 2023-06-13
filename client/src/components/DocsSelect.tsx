import React from "react";
import { Select, Form, Switch } from "antd";

interface SelectDocs {
  onChange: (value: boolean) => void;
  label: string;
  checked: boolean;
  disabled?: boolean;
}

export const DocsSelect: React.FC<SelectDocs> = ({
  onChange,
  label,
  checked,
  disabled,
}) => {
  return (
    <Form.Item label={label}>
      <Switch
        disabled={disabled}
        checked={checked}
        style={{ minWidth: "45px" }}
        onChange={onChange}
      />
    </Form.Item>
  );
};
