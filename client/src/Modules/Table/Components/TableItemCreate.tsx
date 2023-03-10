import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form, Input, DatePicker, message } from "antd";
import { INewItem } from "../../../Types/Types";
import { Item } from "../Functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import {
  MyInput,
  SelectDelivery,
  TechStoreSelect,
} from "../../../components/index";
import { Required } from "../../../UI/index";
import { TechStore } from "../../../Modules/TechStore/Functions/techStoreFuncs";
import ReDrawContext from "../../../store/redraw-context";
import {
  handleProviderChange,
  handleAddProvider,
  handleDeleteProvider,
  handleAddImporter,
  handleDeleteImporter,
  handleImporterChange,
  handleAddOrder,
  handleDeleteOrder,
  handleOrderChange,
} from "../Functions/MultipleInputHandler";
import { callError } from "../Functions/ErrorHandlers";
import { dropInput } from "../Functions/TableHandlers";
import { checkFilledPoles } from "../Functions/TableHandlers";

const ItemFuncs = new Item();
const TechStoreFuncs = new TechStore();

export const TableItemCreate: React.FC = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const reDrawCtx = useContext(ReDrawContext);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [filled, setFilled] = useState(false);
  const [item, setItem] = useState<INewItem>({
    request_date: "",
    order_number: [],
    simple_product_name: "",
    delivery_method: "",
    providers: [],
    importers: [],
    conditions: "",
    store_name: "",
    tech_store: "",
    agent: "",
    container_type: "",
    place_of_dispatch: "",
    is_docs: {
      PI: false,
      CI: false,
      PL: false,
      SS_DS: false,
      contract_agrees: false,
      cost_agrees: false,
      instruction: false,
      ED: false,
      bill: false,
    },
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    if (filled) {
      reDrawCtx.reDrawHandler(true);
      setConfirmLoading(true);
      const response = await ItemFuncs.createItem(item);
      if (response.error) {
        setConfirmLoading(false);
        const duplicates = response.error.map(
          (dup: { key: string; value: string }) => {
            return dup.value;
          }
        );
        callError(messageApi, `These orders already exists: ${duplicates}`);
        reDrawCtx.reDrawHandler(false);
      } else {
        form.resetFields();
        dropInput(setItem);
        setConfirmLoading(false);
        reDrawCtx.reDrawHandler(false);
        setOpen(false);
      }
    } else callError(messageApi, "Fill the all poles !");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getName = async () => {
    const response = await TechStoreFuncs.getOneTechStore(item.tech_store);

    setItem({ ...item, store_name: response.name });
  };

  useEffect(() => {
    getName();
  }, [item.tech_store]);

  useEffect(() => {
    checkFilledPoles(item, setFilled);
  }, [item]);
  return (
    <>
      {contextHolder}
      <Button
        style={{ marginBottom: "1rem" }}
        type="primary"
        onClick={showModal}
      >
        Создать новую запись
      </Button>
      <Modal
        title="Новая запись"
        open={open}
        onOk={async () => {
          await handleOk();
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="">
          <Form
            form={form}
            id="form-create"
            className="table-form"
            layout="vertical"
          >
            <Form.Item
              name="name"
              className="required-form"
              label="Дата заявки"
            >
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, request_date: new Date(dateString) });
                }}
                placeholder="Дата заявки"
              />
            </Form.Item>
            <Form.Item
              name="name2"
              className="required-form"
              label="Номер заказа"
            >
              <>
                {item.order_number.map((order, index) => {
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      <Input
                        placeholder="Номер заказа"
                        id={order}
                        value={order}
                        onChange={(event) =>
                          handleOrderChange(
                            index,
                            event,
                            undefined,
                            item,
                            undefined,
                            setItem
                          )
                        }
                      />
                      <CloseOutlined
                        onClick={() => {
                          handleDeleteOrder(
                            index,
                            undefined,
                            undefined,
                            item,
                            setItem
                          );
                        }}
                      />
                    </div>
                  );
                })}
                <Button onClick={() => handleAddOrder(item, setItem)}>
                  Добавить поле
                </Button>
              </>
            </Form.Item>
            <MyInput
              name="name3"
              className="required-form"
              label="Товар"
              value={item.simple_product_name}
              onChange={(e) => {
                setItem({ ...item, simple_product_name: e.target.value });
              }}
            />
            <SelectDelivery
              name="name4"
              value={item.delivery_method}
              className="required-form"
              onChange={(value) => {
                setItem({ ...item, delivery_method: value });
              }}
            />
            <Form.Item name="name5" className="required-form" label="Поставщик">
              <>
                {item.providers.map((provider, index) => {
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      <Input
                        placeholder="Поставщик"
                        id={provider}
                        value={provider}
                        onChange={(event) =>
                          handleProviderChange(
                            index,
                            event,
                            undefined,
                            undefined,
                            item,
                            setItem
                          )
                        }
                      />
                      <CloseOutlined
                        onClick={() => {
                          handleDeleteProvider(index);
                        }}
                      />
                    </div>
                  );
                })}
                <Button onClick={() => handleAddProvider(item, setItem)}>
                  Добавить поле
                </Button>
              </>
            </Form.Item>
            <Form.Item name="name6" className="required-form" label="Импортер">
              <>
                {item.importers.map((importer, index) => {
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      <Input
                        placeholder="Импортер"
                        id={importer}
                        value={importer}
                        onChange={(event) =>
                          handleImporterChange(
                            index,
                            event,
                            item,
                            setItem,
                            undefined,
                            undefined
                          )
                        }
                      />
                      <CloseOutlined
                        onClick={() => {
                          handleDeleteImporter(index, item, setItem);
                        }}
                      />
                    </div>
                  );
                })}
                <Button onClick={() => handleAddImporter(item, setItem)}>
                  Добавить поле
                </Button>
              </>
            </Form.Item>
            <MyInput
              name="name7"
              className="required-form"
              value={item.conditions}
              label="Условия поставки"
              onChange={(e) => {
                setItem({ ...item, conditions: e.target.value });
              }}
            />
            <TechStoreSelect
              name="name8"
              onChange={(value) => {
                setItem({ ...item, tech_store: value });
              }}
              value={item.tech_store}
              opened={open}
              className="required-form"
            />
            <MyInput
              name="name9"
              className="required-form"
              label="Агент"
              value={item.agent}
              onChange={(e) => {
                setItem({ ...item, agent: e.target.value });
              }}
            />
            <MyInput
              name="name10"
              className="required-form"
              label="Тип контейнера"
              value={item.container_type}
              onChange={(e) => {
                setItem({ ...item, container_type: e.target.value });
              }}
            />
            <MyInput
              name="name11"
              value={item.place_of_dispatch}
              className="required-form"
              label="Место отправки"
              onChange={(e) => {
                setItem({ ...item, place_of_dispatch: e.target.value });
              }}
            />
          </Form>
        </div>
        <Required />
      </Modal>
    </>
  );
};
