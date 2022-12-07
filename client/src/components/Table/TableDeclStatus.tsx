import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, DatePicker } from "antd";
import { Declaration } from "../../functions/declarationFuncs";
import { Writes } from "../../Types/Types";
import dayjs from "dayjs";

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
  const [writes, setWrites] = useState<Writes[]>();
  const [declarationData, setDeclarationData] = useState<object>({
    declaration_status_date: "",
    declaration_status: "",
    declaration_status_message: "",
    declaration_number: "",
  });

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const createHandler = async () => {
    const response = await DeclarationFuncs.createDeclarationStatus(
      declarationData
    );
    if (response === "Success") {
      await getHandler();
    }
  };

  const getHandler = async () => {
    const response = await DeclarationFuncs.getDeclarationStatus(
      declaration_number
    );
    setWrites(response);
  };

  const renderStatuses = () => {
    return writes?.map((write) => {
      return (
        <tr key={write._id}>
          <td>{dayjs(write.declaration_status_date).format("DD/MM/YYYY")}</td>
          <td>{write.declaration_status}</td>
          <td>{write.declaration_status_message}</td>
          <td>{write.declaration_number}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    setDeclarationData({
      ...declarationData,
      declaration_number: declaration_number,
    });
  }, [opened]);

  useEffect(() => {
    if (opened) getHandler();
  }, [opened]);

  return (
    <Modal
      title="Статус декларации"
      open={opened}
      onOk={handleOk}
      onCancel={handleCancel}
      className="declaration-modal"
    >
      <table>
        <thead>
          <tr>
            <td>Дата</td>
            <td>Статус</td>
            <td>Сообщение</td>
            <td>Номер декларации</td>
          </tr>
        </thead>
        <tbody>{renderStatuses()}</tbody>
      </table>

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
        <Form.Item style={{ margin: "0 10px" }} label="Статус">
          <Input
            onChange={(e) => {
              setDeclarationData({
                ...declarationData,
                declaration_status: e.target.value,
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
      </Form>
      <Button onClick={() => createHandler()}>Создать запись</Button>
    </Modal>
  );
};
