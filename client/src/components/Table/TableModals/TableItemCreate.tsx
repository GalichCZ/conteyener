import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import { INewItem } from "../../../Types/Types";
import { Item } from "../../../functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import { MyInput, SelectDelivery, TechStoreSelect } from "../../index";
import { Required } from "../../../UI/index";
import { TechStore } from "../../../functions/techStoreFuncs";

const ItemFuncs = new Item();
const TechStoreFuncs = new TechStore();

interface TableItemCreateProps {
  setLoad: (c: boolean) => void;
}

export const TableItemCreate: React.FC<TableItemCreateProps> = ({
  setLoad,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [inputFields, setInputFields] = useState<any>([]);
  const [inputFields2, setInputFields2] = useState<any>([]);
  const [inputFields3, setInputFields3] = useState<any>([]);
  const [err, setErr] = useState<string | null>();
  const [confirmLoading, setConfirmLoading] = useState(false);
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
    setConfirmLoading(true);
    form.resetFields();
    const response = await ItemFuncs.createItem(item);
    if ("error" in response) {
      setErr(response.error);
      setConfirmLoading(false);
    } else {
      setLoad(true);
      setConfirmLoading(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const importerHandler = (importer: string) => {
    if (importer !== "") item.importers?.push({ name: importer });
  };

  const deleteImporter = (_importer: string) => {
    const newImporters = item.importers?.filter((importer) => {
      return importer.name !== _importer;
    });

    if (newImporters) {
      setItem({ ...item, importers: newImporters });
      setInputFields(newImporters);
    }
  };

  const providerHandler = (provider: string) => {
    if (provider !== "") item.providers?.push({ name: provider });
  };

  const deleteProvider = (_provider: string) => {
    const newProviders = item.providers?.filter((provider) => {
      return provider.name !== _provider;
    });

    if (newProviders) {
      setItem({ ...item, providers: newProviders });
      setInputFields2(newProviders);
    }
  };

  const addFields = () => {
    let newField = { id: inputFields.length };
    setInputFields([...inputFields, newField]);
  };

  const addFields2 = () => {
    let newField = { id: inputFields2.length };
    setInputFields2([...inputFields2, newField]);
  };

  const addFields3 = () => {
    let newField = { id: inputFields3.length };
    setInputFields3([...inputFields3, newField]);
  };

  const orderHandler = (order: string) => {
    if (order !== "") item.order_number.push({ number: order });
  };

  const deleteOrder = (_order: string) => {
    const newOrders = item.order_number?.filter((order) => {
      return order.number !== _order;
    });

    if (newOrders) {
      setItem({ ...item, order_number: newOrders });
      setInputFields3(newOrders);
    }
  };

  const drawImporters = () => {
    return inputFields.map((input: { id: any; name: string }) => {
      return (
        <div key={input.id} style={{ display: "flex" }}>
          <Input
            placeholder="Импортер"
            id={input.id}
            onBlur={(e) => {
              importerHandler(e.target.value);
            }}
          />
          <CloseOutlined
            onClick={() => {
              deleteImporter(input.name);
            }}
          />
        </div>
      );
    });
  };

  const drawOrders = () => {
    return inputFields3.map(
      (input: { id: string; number: string }, key: string) => {
        return (
          <div key={key} style={{ display: "flex" }}>
            <Input
              placeholder="Номер заказа"
              id={input.id}
              onBlur={(e) => {
                orderHandler(e.target.value);
              }}
            />
            <CloseOutlined
              onClick={() => {
                deleteOrder(input.number);
              }}
            />
          </div>
        );
      }
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setErr(null);
    }, 5000);
  }, [err]);

  useEffect(() => {
    drawImporters();
  }, [deleteImporter, inputFields]);

  const getName = async () => {
    const response = await TechStoreFuncs.getOneTechStore(item.tech_store);

    setItem({ ...item, store_name: response.name });
  };
  useEffect(() => {
    getName();
    console.log(item.tech_store);
  }, [item.tech_store]);

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
        confirmLoading={confirmLoading}
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
                {drawOrders()}
                <Button onClick={addFields3}>Добавить поле</Button>
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
                {inputFields2.map(
                  (input: { id: any; name: string }, key: number) => {
                    return (
                      <div key={key} style={{ display: "flex" }}>
                        <Input
                          key={key}
                          placeholder="Поставщик"
                          id={input.id}
                          onBlur={(e) => {
                            providerHandler(e.target.value);
                          }}
                        />
                        <CloseOutlined
                          onClick={() => {
                            deleteProvider(input.name);
                          }}
                        />
                      </div>
                    );
                  }
                )}
                <Button onClick={addFields2}>Добавить поле</Button>
              </>
            </Form.Item>
            <Form.Item name="name6" className="required-form" label="Импортер">
              <>
                {drawImporters()}
                <Button onClick={addFields}>Добавить поле</Button>
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
