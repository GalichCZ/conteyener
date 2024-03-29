import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Input, Button, DatePicker } from "antd";
import { Declaration } from "../Functions/declarationFuncs";
import { Writes } from "../../../Types/Types";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { setOpenDeclStatus } from "../../../store/slices/tableDeclStatusSlice";
import { CloseOutlined } from "@ant-design/icons";
import AuthContext from "@/store/auth-context";

const DeclarationFuncs = new Declaration();

export const TableDeclStatus = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.tableDeclStatus.open);
  const declaration_number = useAppSelector(
    (state) => state.tableDeclStatus.declaration_number
  );

  const [writes, setWrites] = useState<Writes[]>();
  const [declarationData, setDeclarationData] = useState<object>({
    declaration_status_date: "",
    declaration_status: "",
    declaration_status_message: "",
    declaration_number: "",
  });

  const handleOk = () => {
    dispatch(setOpenDeclStatus());
  };

  const handleCancel = () => {
    dispatch(setOpenDeclStatus());
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

  const deleteHandler = async (_id: string) => {
    const response = await DeclarationFuncs.deleteOneDeclarationStatus(_id);
    getHandler();
  };

  const renderStatuses = () => {
    return writes?.map((write) => {
      return (
        <tr key={write._id}>
          <td>{dayjs(write.declaration_status_date).format("DD/MM/YYYY")}</td>
          <td>{write.declaration_status}</td>
          <td>{write.declaration_status_message}</td>
          <td>{write.declaration_number}</td>
          <CloseOutlined
            onClick={() => {
              deleteHandler(write._id);
            }}
            style={{
              transform: "translateX(10px) translateY(8px)",
              scale: "1.2",
            }}
          />
        </tr>
      );
    });
  };

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setDeclarationData({
      ...declarationData,
      declaration_number: declaration_number,
    });
  }, [open]);

  useEffect(() => {
    if (open) getHandler();
  }, [open]);

  const isAdmin = authCtx.role === "manager_int";

  return (
    <Modal
      title="Статус декларации"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      className="declaration-modal"
      destroyOnClose
    >
      {isAdmin && (
        <>
          <Form layout="vertical">
            <Form.Item label="Дата">
              <DatePicker
                format="DD/MM/YYYY"
                onChange={(date, dateString) => {
                  setDeclarationData({
                    ...declarationData,
                    declaration_status_date: date?.toISOString(),
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
        </>
      )}

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
    </Modal>
  );
};
