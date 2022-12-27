import React from "react";
import { Select, Form } from "antd";

interface SelectDocs {
  onChange: (value: string) => void;
  label: string;
  value: boolean | undefined | null;
}

export const DocsSelect: React.FC<SelectDocs> = ({
  onChange,
  label,
  value,
}) => {
  return (
    <Form.Item label={label}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ margin: "0", fontSize: "35px" }}>
          {value ? "+" : "-" || (value === null && "+")}
        </p>
        <Select
          // value={value ? "+" : "-" || (value === null && "+")}
          style={{ width: 128 }}
          onChange={onChange}
          placeholder="Измените наличие"
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
      </div>
    </Form.Item>
  );
};
