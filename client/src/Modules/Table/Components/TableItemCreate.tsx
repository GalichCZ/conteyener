import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
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
  handleAddDeclarationNumber,
  handleDeclarationNumberChange,
  handleDeleteDeclarationNumber,
  handleAddImporter,
  handleDeleteImporter,
  handleImporterChange,
  handleAddOrder,
  handleDeleteOrder,
  handleOrderChange,
} from "../Functions/MultipleInputHandler";

const ItemFuncs = new Item();
const TechStoreFuncs = new TechStore();

export const TableItemCreate: React.FC = () => {
  const reDrawCtx = useContext(ReDrawContext);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>();
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
    reDrawCtx.reDrawHandler(true);
    form.resetFields();
    const response = await ItemFuncs.createItem(item);
    if ("error" in response) {
      setErr(response.error);
      reDrawCtx.reDrawHandler(false);
    } else {
      reDrawCtx.reDrawHandler(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setErr(null);
    }, 5000);
  }, [err]);

  const getName = async () => {
    const response = await TechStoreFuncs.getOneTechStore(item.tech_store);

    setItem({ ...item, store_name: response.name });
  };
  useEffect(() => {
    getName();
    console.log(item.tech_store);
  }, [item.tech_store]);

  useEffect(() => {
    console.log(item.order_number, "orders");
    console.log(item.providers, "providers");
    console.log(item.importers, "importers");
  }, [item]);
  return (
    <>
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
        confirmLoading={reDrawCtx.reDraw}
        onCancel={handleCancel}
      >
        <div className="">
          {err && <p className="login-err">{err}</p>}
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
                          handleDeleteOrder(index);
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
              onChange={(e) => {
                setItem({ ...item, simple_product_name: e.target.value });
              }}
            />
            <SelectDelivery
              name="name4"
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
                          handleDeleteImporter(index);
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
              opened={open}
              className="required-form"
            />
            <MyInput
              name="name9"
              className="required-form"
              label="Агент"
              onChange={(e) => {
                setItem({ ...item, agent: e.target.value });
              }}
            />
            <MyInput
              name="name10"
              className="required-form"
              label="Тип контейнера"
              onChange={(e) => {
                setItem({ ...item, container_type: e.target.value });
              }}
            />
            <MyInput
              name="name11"
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
