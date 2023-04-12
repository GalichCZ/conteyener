import { Button, List } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReDrawContext from "../../../store/redraw-context";
import { getStockPlaces, deleteStockPlace } from "../Functions/StockApi";
import { IStockData } from "../Types";
import { setOpen, setData } from "../../../store/slices/stockModalSlice";
import { CloseOutlined } from "@ant-design/icons";
import { DeleteConfirm } from "../../../components/DeleteConfirm";

export const ContainerStockDraw = () => {
  const dispatch = useDispatch();
  const redrawCtx = useContext(ReDrawContext);
  const [stock, setStock] = useState<IStockData[]>();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>("");

  const getData = async () => {
    const data = await getStockPlaces();

    if (data) setStock(data);
  };

  const updateModalHandler = (stock: IStockData) => {
    dispatch(setOpen());
    dispatch(setData(stock));
  };

  const deleteStockPlaceHandler = (_id: string | undefined) => {
    setOpenConfirm(true);
    setId(_id);
  };

  const deleteStock = async () => {
    const response = await deleteStockPlace(id);
    if (response) {
      await getData();
      return true;
    }
  };

  useEffect(() => {
    getData();
  }, [redrawCtx.reDraw]);

  return (
    <>
      <DeleteConfirm
        setOpen={setOpenConfirm}
        open={openConfirm}
        deleteFunction={deleteStock}
      />
      <List className="channels">
        {stock?.map((item, key) => {
          return (
            <List.Item key={key}>
              <div className="stock-pole">
                <b>Название: </b>
                <b> {item.name}</b>
              </div>
              <div className="stock-pole">
                <p>Адрес: </p>
                <p> {item.address}</p>
              </div>
              <div className="stock-pole">
                <p>Контакт: </p>
                <p> {item.contact}</p>
              </div>
              <div className="stock-pole">
                <p>Примечание: </p>
                <p> {item.note}</p>
              </div>
              <Button onClick={() => updateModalHandler(item)}>
                Редактировать
              </Button>
              <CloseOutlined
                onClick={() => {
                  deleteStockPlaceHandler(item._id);
                }}
              />
            </List.Item>
          );
        })}
      </List>
    </>
  );
};
