import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker } from "antd";
import { Declaration } from "../../functions/declarationFuncs";

interface TableDeclStatusProps {
  opened: boolean | undefined;
  declaration_number: string | undefined;
  setOpen: (c: any) => any;
}

const DeclarationFuncs = new Declaration();

export const TableDeclStatus: React.FC<TableDeclStatusProps> = ({
  opened,
  declaration_number,
  setOpen,
}) => {
  const [declarationData, setDeclarationData] = useState<object>({
    declaration_status_date: "",
    declaration_status: "",
    declaration_status_message: "",
    declaration_number,
  });

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      title="Статус декларации"
      open={opened}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Дата">
          <DatePicker
            onChange={(date, dateString) => {
              setDeclarationData({
                ...declarationData,
                declaration_status_date: new Date(dateString),
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Статус">
          <Input
            onChange={(e) => {
              setDeclarationData({
                ...declarationData,
                declaration_status_status: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Сообщение">
          <Input
            onChange={(e) => {
              setDeclarationData({
                ...declarationData,
                declaration_status_message: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Button
          onClick={() =>
            DeclarationFuncs.createDeclarationStatus(declarationData)
          }
        >
          Создать запись
        </Button>
      </Form>
    </Modal>
  );
};
