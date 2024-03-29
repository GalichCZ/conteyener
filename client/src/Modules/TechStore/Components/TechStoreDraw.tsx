import React, { useEffect, useState } from "react";
import { Button, List } from "antd";
import { TechStore } from "../Functions/techStoreFuncs";
import { TechStoreData } from "../../../Types/Types";
import { CloseOutlined } from "@ant-design/icons";
import { DeleteConfirm } from "../../../components/DeleteConfirm";

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
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>("");

  const getStores = async () => {
    const response = await TechStoreFuncs.getTechStore();
    if ("error" in response) setErr(response.error);
    else setStores(response);
  };

  const deleteStoreHandler = async (_id: string | undefined) => {
    setOpenConfirm(true);
    setId(_id);
  };

  const deleteStore = async () => {
    const response = await TechStoreFuncs.deleteTechStore(id);
    if (response) {
      await getStores();
      return true;
    }
  };

  const modalHandler = (
    address: string,
    name: string,
    receiver: string,
    contact: string,
    note: string,
    _id?: string
  ) => {
    setData({
      address,
      name,
      receiver,
      contact,
      note,
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
    <>
      <DeleteConfirm
        deleteFunction={deleteStore}
        open={openConfirm}
        setOpen={setOpenConfirm}
      />
      <div className="tech-store_draw">
        <List style={{ padding: "15px" }}>
          {stores?.map((store, key) => {
            return (
              <div className="stores-data" key={key}>
                <strong>Название: {store.name}</strong>
                <p style={{ margin: "0 15px" }}>Адрес: {store.address}</p>
                <Button
                  onClick={() =>
                    modalHandler(
                      store.address,
                      store.name,
                      store.receiver,
                      store.contact,
                      store.note,
                      store._id
                    )
                  }
                  style={{ margin: "0 15px" }}
                >
                  Изменить
                </Button>
                <CloseOutlined
                  onClick={() => {
                    deleteStoreHandler(store._id);
                  }}
                />
              </div>
            );
          })}
        </List>
      </div>
    </>
  );
};
