import React from "react";
import { Select, Form, Switch } from "antd";

interface SelectDocs {
  onChange: (value: boolean) => void;
  label: string;
  checked: boolean;
}

export const DocsSelect: React.FC<SelectDocs> = ({
  onChange,
  label,
  checked,
}) => {
  return (
    <Form.Item label={label}>
      <Switch
        checked={checked}
        style={{ minWidth: "45px" }}
        onChange={onChange}
      />
    </Form.Item>
  );
};
