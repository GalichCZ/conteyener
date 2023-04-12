import React, { useEffect, useState } from "react";
import { Form, Button, Input } from "antd";
import { TechStoreData } from "../../../Types/Types";
import { TechStore } from "../Functions/techStoreFuncs";
import { MyInput } from "../../../components";
import { DeleteConfirm } from "../../../components/DeleteConfirm";

const TechStoreFuncs = new TechStore();

interface TechStoreCreateProps {
  setStatus: (c: boolean) => void;
}

export const TechStoreCreate: React.FC<TechStoreCreateProps> = ({
  setStatus,
}) => {
  const [data, setData] = useState<TechStoreData>({
    name: "",
    address: "",
    receiver: "",
    contact: "",
    note: "",
  });
  const [disable, setDisabel] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>();

  const handleCreate = async (data: TechStoreData) => {
    const response = await TechStoreFuncs.createTechStore(data);
    if ("error" in response) setErr(response.error);
    else {
      setStatus(true);
      setData({
        name: "",
        address: "",
        receiver: "",
        contact: "",
        note: "",
      });
    }
  };

  function checkFilled() {
    if (
      data.name != "" &&
      data.address != "" &&
      data.receiver != "" &&
      data.contact != "" &&
      data.note != ""
    )
      setDisabel(false);
    else setDisabel(true);
  }

  useEffect(() => {
    checkFilled();
  }, [data]);

  return (
    <>
      <div className="tech-store_create">
        <Form layout="vertical">
          <div className="tech-store_create_inputs">
            <MyInput
              label="Название"
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
            <MyInput
              label="Адрес"
              value={data.address}
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
              }}
            />
            <MyInput
              label="Получатель"
              value={data.receiver}
              onChange={(e) => {
                setData({ ...data, receiver: e.target.value });
              }}
            />
            <MyInput
              label="Контактное лицо"
              value={data.contact}
              onChange={(e) => {
                setData({ ...data, contact: e.target.value });
              }}
            />
          </div>
          <Form.Item label="Примечание">
            <Input.TextArea
              value={data.note}
              onChange={(e) => {
                setData({ ...data, note: e.target.value });
              }}
            />
          </Form.Item>
        </Form>
        <Button
          disabled={disable}
          onClick={() => handleCreate(data)}
          style={{ transform: "translateX(45px)" }}
        >
          Создать
        </Button>
      </div>
    </>
  );
};
