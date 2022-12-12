import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import { NewItem } from "../../../Types/Types";
import { Item } from "../../../functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import { MyInput, SelectDelivery } from "../../index";
import { Required } from "../../../UI/index";

const ItemFuncs = new Item();

export const TableItemCreate = () => {
  const [open, setOpen] = useState(false);
  const [inputFields, setInputFields] = useState<any>([]);
  const [inputFields2, setInputFields2] = useState<any>([]);
  const [inputFields3, setInputFields3] = useState<any>([]);
  const [err, setErr] = useState<string | null>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [item, setItem] = useState<NewItem>({
    request_date: null,
    order_number: [],
    container_number: "",
    simple_product_name: "",
    delivery_method: "",
    providers: [],
    importers: [],
    conditions: "",
    store_receiver: "",
    store_name: "",
    store_address: "",
    store_contact: "",
    agent: "",
    container_type: "",
    place_of_dispatch: "",
    arrive_place: "",
    line: "",
    ready_date: null,
    load_date: null,
    etd: null,
    eta: null,
    release: null,
    bl_smgs_cmr: null,
    td: null,
    date_do: null,
    port: "",
    is_ds: null,
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
    declaration_number: "",
    declaration_issue_date: null,
    availability_of_ob: null,
    answer_of_ob: null,
    expeditor: "",
    destination_station: "",
    km_to_dist: null,
    train_arrive_date: null,
    bid: null,
    pickup: "",
    store_arrive_date: null,
    comment: "",
    note: "",
    fraht: "",
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await ItemFuncs.createItem(item);
    if ("error" in response) setErr(response.error);
    console.log(response);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
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

  const importerHandler = (importer: string) => {
    if (importer !== "") item.importers?.push({ name: importer });
  };

  const deleteImporter = (importer: any, field: any) => {
    let arr = inputFields;
    const fieldIndex = arr.indexOf(field);
    arr.splice(fieldIndex, 1);
    console.log(arr);
    setInputFields(arr);
    const importerIndex = item.importers.indexOf(importer);
    item.importers.splice(importerIndex, 1);
  };

  const providerHandler = (provider: string) => {
    if (provider !== "") item.providers?.push({ name: provider });
  };

  const orderHandler = (order: string) => {
    if (order !== "") item.order_number.push({ number: order });
  };

  const drawImporters = () => {
    return inputFields.map((input: { id: any }) => {
      return (
        <div key={input.id} style={{ display: "flex" }}>
          <Input
            placeholder="Импортер"
            id={input.id}
            onBlur={(e) => {
              importerHandler(e.target.value);
              console.log(item.importers);
            }}
          />
          <CloseOutlined
            onClick={() => {
              deleteImporter(item.importers[input.id], inputFields[input.id]);
            }}
          />
        </div>
      );
    });
  };

  const drawOrders = () => {
    return inputFields3.map((input: { id: string }, key: string) => {
      return (
        <div key={key} style={{ display: "flex" }}>
          <Input
            placeholder="Номер заказа"
            id={input.id}
            onBlur={(e) => {
              orderHandler(e.target.value);
            }}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setErr(null);
    }, 5000);
  }, [err]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  useEffect(() => {
    drawImporters();
  }, [deleteImporter, inputFields]);

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
          <Form className="table-form" layout="vertical">
            <Form.Item className="required-form" label="Дата заявки">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, request_date: new Date(dateString) });
                }}
                placeholder="Дата заявки"
              />
            </Form.Item>
            <Form.Item className="required-form" label="Номер заказа">
              {drawOrders()}
              <Button onClick={addFields3}>Добавить поле</Button>
            </Form.Item>
            <MyInput
              label="Номер контейнера"
              onChange={(e) => {
                setItem({ ...item, container_number: e.target.value });
              }}
            />
            <MyInput
              label="Товар"
              onChange={(e) => {
                setItem({ ...item, simple_product_name: e.target.value });
              }}
            />
            <SelectDelivery
              onChange={(value) => {
                console.log(value);
                setItem({ ...item, delivery_method: value });
              }}
            />
            <Form.Item className="required-form" label="Поставщик">
              {inputFields2.map((input: { id: any }, key: number) => {
                return (
                  <Input
                    key={key}
                    placeholder="Поставщик"
                    id={input.id}
                    onBlur={(e) => {
                      providerHandler(e.target.value);
                      console.log(item.importers);
                    }}
                  />
                );
              })}
              <Button onClick={addFields2}>Добавить поле</Button>
            </Form.Item>
            <Form.Item className="required-form" label="Импортер">
              {drawImporters()}
              <Button onClick={addFields}>Добавить поле</Button>
            </Form.Item>
            <MyInput
              className="required-form"
              label="Условия поставки"
              onChange={(e) => {
                setItem({ ...item, conditions: e.target.value });
              }}
            />
            <MyInput
              label="Получатель"
              onChange={(e) => {
                setItem({ ...item, store_receiver: e.target.value });
              }}
            />
            <MyInput
              className="required-form"
              label="Наименование склада"
              onChange={(e) => {
                setItem({ ...item, store_name: e.target.value });
              }}
            />
            <MyInput
              label="Адрес склада"
              onChange={(e) => {
                setItem({ ...item, store_address: e.target.value });
              }}
            />
            <MyInput
              label="Контакт склада"
              onChange={(e) => {
                setItem({ ...item, store_contact: e.target.value });
              }}
            />
            <MyInput
              className="required-form"
              label="Агент"
              onChange={(e) => {
                setItem({ ...item, agent: e.target.value });
              }}
            />
            <MyInput
              label="Тип контейнера"
              onChange={(e) => {
                setItem({ ...item, container_type: e.target.value });
              }}
            />
            <MyInput
              className="required-form"
              label="Место отправки"
              onChange={(e) => {
                setItem({ ...item, place_of_dispatch: e.target.value });
              }}
            />
            <MyInput
              label="Порт прибытия/станция назначения"
              onChange={(e) => {
                setItem({ ...item, arrive_place: e.target.value });
              }}
            />
            <MyInput
              label="Линия"
              onChange={(e) => {
                setItem({ ...item, line: e.target.value });
              }}
            />
            <Form.Item label="Дата готовности">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, ready_date: new Date(dateString) });
                }}
                placeholder="Дата готовности"
              />
            </Form.Item>
            <Form.Item label="Дата загрузки">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, load_date: new Date(dateString) });
                }}
                placeholder="Дата загрузки"
              />
            </Form.Item>
            <Form.Item label="ETD">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, etd: new Date(dateString) });
                }}
                placeholder="ETD"
              />
            </Form.Item>
            <Form.Item label="ETA">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, eta: new Date(dateString) });
                }}
                placeholder="ETA"
              />
            </Form.Item>
            <Form.Item label="Релиз">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, release: new Date(dateString) });
                }}
                placeholder="Релиз"
              />
            </Form.Item>
            <MyInput
              label="BL/СМГС/CMR"
              onChange={(e) => {
                setItem({
                  ...item,
                  bl_smgs_cmr: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              label="ТД"
              onChange={(e) => {
                setItem({
                  ...item,
                  td: e.target.value === "" ? false : true,
                });
              }}
            />

            <Form.Item label="Дата «ДО»">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, date_do: new Date(dateString) });
                }}
                placeholder="Дата «ДО»"
              />
            </Form.Item>
            <MyInput
              label="Порт"
              onChange={(e) => {
                setItem({ ...item, port: e.target.value });
              }}
            />
            <MyInput
              label="ДС для подачи"
              onChange={(e) => {
                setItem({
                  ...item,
                  is_ds: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              label="№ декларации"
              onChange={(e) => {
                setItem({ ...item, declaration_number: e.target.value });
              }}
            />
            <Form.Item label="Дата выпуска декларации">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({
                    ...item,
                    declaration_issue_date: new Date(dateString),
                  });
                }}
                placeholder="Дата выпуска декларации"
              />
            </Form.Item>
            <MyInput
              label="Наличие ОБ"
              onChange={(e) => {
                setItem({
                  ...item,
                  availability_of_ob: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              label="Ответ ОБ"
              onChange={(e) => {
                setItem({
                  ...item,
                  answer_of_ob: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              label="Экспедитор"
              onChange={(e) => {
                setItem({ ...item, expeditor: e.target.value });
              }}
            />
            <MyInput
              label="Станция назначения"
              onChange={(e) => {
                setItem({ ...item, destination_station: e.target.value });
              }}
            />
            <MyInput
              label="Км. до станции назначения"
              onChange={(e) => {
                setItem({ ...item, km_to_dist: parseInt(e.target.value) });
              }}
            />
            <Form.Item label="Дата прибытия по ЖД">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({
                    ...item,
                    train_arrive_date: new Date(dateString),
                  });
                }}
                placeholder="Дата прибытия по ЖД"
              />
            </Form.Item>
            <MyInput
              label="Ставка"
              onChange={(e) => {
                setItem({ ...item, bid: parseInt(e.target.value) });
              }}
            />
            <MyInput
              label="Автовывоз"
              onChange={(e) => {
                setItem({ ...item, pickup: e.target.value });
              }}
            />
            <Form.Item label="Дата прибытия на склад">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({
                    ...item,
                    store_arrive_date: new Date(dateString),
                  });
                }}
                placeholder="Дата прибытия на склад"
              />
            </Form.Item>
            <MyInput
              label="Комментарий"
              onChange={(e) => {
                setItem({ ...item, comment: e.target.value });
              }}
            />
            <MyInput
              label="Фрахт"
              onChange={(e) => {
                setItem({ ...item, fraht: e.target.value });
              }}
            />
            <MyInput
              label="Примечание"
              onChange={(e) => {
                setItem({ ...item, note: e.target.value });
              }}
            />
          </Form>
        </div>
        <Required />
      </Modal>
    </>
  );
};
