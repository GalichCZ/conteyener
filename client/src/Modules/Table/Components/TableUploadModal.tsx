import React, { useContext, useEffect, useState } from "react";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload, Modal } from "antd";
import { Products } from "../../../Types/Types";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import {
  setOpenUpload,
  setUploadItemId,
} from "../../../store/slices/tableUploadSlice";
import { deleteProduct, Product } from "../Functions/productFuncs";
import AuthContext from "@/store/auth-context";
const URL = import.meta.env.VITE_API_URL;

interface TableUploadProps {
  opened?: boolean | undefined;
  item_id?: string;
  setOpen?: (c: any) => any;
}

const ProductFuncs = new Product();

export const TableUploadModal: React.FC<TableUploadProps> = ({}) => {
  const dispatch = useAppDispatch();
  const item_id = useAppSelector((state) => state.tableUpload.item_id);
  const open = useAppSelector((state) => state.tableUpload.open);
  const products_id = useAppSelector((state) => state.tableUpload.products_id);
  console.log(products_id);
  const simple_product_name = useAppSelector(
    (state) => state.tableUpload.simple_product_name
  );
  const authCtx = useContext(AuthContext);

  const [products, setProducts] = useState<Products[]>();

  const handleOk = () => {
    dispatch(setOpenUpload());
  };

  const handleCancel = () => {
    dispatch(setOpenUpload());
  };

  const productHandler = async () => {
    const response = await ProductFuncs.getProducts(products_id);

    setProducts(response);
  };

  const deleteProductHandler = async (_id: string) => {
    const response = await deleteProduct(_id, item_id);
    if (response.success) await productHandler();
  };

  const props: UploadProps = {
    name: "file",
    action: `${URL}/product/${item_id}/${simple_product_name}`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        productHandler();
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (open) productHandler();
  }, [open]);

  return (
    <Modal
      className="declaration-modal"
      title={`Товар - ${simple_product_name}`}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <table>
        <thead>
          <tr>
            <td>№ п/п</td>
            <td>Код ТнВЭД</td>
            <td>Артикул</td>
            <td>Торговая марка</td>
            <td>Наименование товара</td>
            <td>Модель/Серия(Тип)</td>
            <td>Модификация</td>
            <td>Кол-во штук</td>
            <td>Кол-во мест</td>
            <td>Цена за еденицу</td>
            <td>Общая сумма</td>
            <td>Вес нетто</td>
            <td>Вес брутто</td>
            <td>Объем</td>
            <td>Производитель</td>
            {authCtx.role === "manager_int" && <td></td>}
          </tr>
        </thead>
        <tbody>
          {products?.map((product, key: number) => {
            return (
              <tr key={product._id}>
                <td>{key + 1}</td>
                <td>{product.hs_code}</td>
                <td>{product.article}</td>
                <td>{product.trade_mark}</td>
                <td>{product.product_name}</td>
                <td>{product.model}</td>
                <td>{product.modification}</td>
                <td>{product.quantity_pieces}</td>
                <td>{product.quantity_places}</td>
                <td>{product.piece_price}</td>
                <td>{product.total_price}</td>
                <td>{product.weight_net}</td>
                <td>{product.weight_gross}</td>
                <td>{product.cbm}</td>
                <td>{product.manufacturer}</td>
                {authCtx.role === "manager_int" && (
                  <td>
                    <>
                      <CloseOutlined
                        onClick={() => deleteProductHandler(product._id)}
                        style={{
                          scale: "1.3",
                          fontWeight: "bolder",
                          cursor: "pointer",
                        }}
                      />
                    </>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {authCtx.role === "manager_int" && (
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Загрузить продукты</Button>
        </Upload>
      )}
    </Modal>
  );
};
