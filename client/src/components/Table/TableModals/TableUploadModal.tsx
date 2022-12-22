import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload, Modal } from "antd";
import { Product } from "../../../functions/productFuncs";
import { Products } from "../../../Types/Types";

interface TableUploadProps {
  opened: boolean | undefined;
  item_id: string;
  setOpen: (c: any) => any;
}

const ProductFuncs = new Product();

export const TableUploadModal: React.FC<TableUploadProps> = ({
  opened,
  item_id,
  setOpen,
}) => {
  const [products, setProducts] = useState<Products[]>();

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const productHandler = async () => {
    const response = await ProductFuncs.getProducts(item_id);

    setProducts(response);
  };

  console.log(item_id);

  const props: UploadProps = {
    name: "file",
    action: `https://api-automycka.space/api/product/${item_id}`,
    // action: `http://localhost:4444/api/product/${item_id}`,
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
    if (opened) productHandler();
  }, [opened]);

  return (
    <Modal
      className="declaration-modal"
      title="Товар"
      open={opened}
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
              </tr>
            );
          })}
        </tbody>
      </table>

      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Modal>
  );
};
