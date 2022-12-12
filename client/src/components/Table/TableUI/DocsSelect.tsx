import React from "react";
import { Select, Form } from "antd";

interface SelectDocs {
  onChange: (value: string) => void;
  label: string;
  defaultValue: boolean | undefined | null;
}

export const DocsSelect: React.FC<SelectDocs> = ({
  onChange,
  label,
  defaultValue,
}) => {
  return (
    <Form.Item label={label}>
      <Select
        defaultValue={
          defaultValue ? "+" : "-" || (defaultValue === null && "+")
        }
        style={{ width: 128 }}
        onChange={onChange}
        options={[
          {
            value: "+",
            label: "+",
          },
          {
            value: "-",
            label: "-",
          },
        ]}
      />
    </Form.Item>
  );
};
