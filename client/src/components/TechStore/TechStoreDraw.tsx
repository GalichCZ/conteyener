import React, { useEffect, useState } from "react";
import { Button, List } from "antd";
import { TechStore } from "../../functions/techStoreFuncs";
import { TechStoreData } from "../../Types/Types";
import { CloseOutlined } from "@ant-design/icons";

const TechStoreFuncs = new TechStore();

interface TechStoreDrawProps {
  status: boolean;
  setStatus: (c: boolean) => void;
  setOpen: (c: boolean) => void;
  setData: (c: TechStoreData) => void;
}

export const TechStoreDraw: React.FC<TechStoreDrawProps> = ({
  status,
  setStatus,
  setOpen,
  setData,
}) => {
  const [stores, setStores] = useState<TechStoreData[]>();
  const [err, setErr] = useState<string | null>();

  const getStores = async () => {
    const response = await TechStoreFuncs.getTechStore();
    console.log(response);
    if ("error" in response) setErr(response.error);
    else setStores(response);
  };

  const deleteStore = async (_id: string | undefined) => {
    const response = await TechStoreFuncs.deleteTechStore(_id);
    console.log(response);
    if (response) await getStores();
  };

  const modalHandler = (
    delivery_time: number,
    address: string,
    name: string,
    _id?: string
  ) => {
    setData({
      delivery_time,
      address,
      name,
      _id,
    });
    setOpen(true);
  };

  useEffect(() => {
    getStores();
  }, []);

  useEffect(() => {
    if (status) {
      getStores();
      setStatus(false);
    }
  }, [status]);

  return (
    <div className="tech-store_draw">
      <List style={{ padding: "15px" }}>
        {stores?.map((store, key) => {
          return (
            <div className="stores-data" key={key}>
              <strong>Название: {store.name}</strong>
              <p style={{ margin: "0 15px" }}>Адрес: {store.address}</p>
              <p style={{ margin: "0" }}>
                Дней на доставку: {store.delivery_time}
              </p>
              <Button
                onClick={() =>
                  modalHandler(
                    store.delivery_time,
                    store.address,
                    store.name,
                    store._id
                  )
                }
                style={{ margin: "0 15px" }}
              >
                Изменить
              </Button>
              <CloseOutlined
                onClick={() => {
                  deleteStore(store._id);
                }}
              />
            </div>
          );
        })}
      </List>
    </div>
  );
};
