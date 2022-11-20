import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import { NewItem } from "./Types";
import { Item } from "../../functions/itemFuncs";

const ItemFuncs = new Item();

export const TableItemCreate = () => {
  const [open, setOpen] = useState(false);
  const [inputFields, setInputFields] = useState<any>([{ id: 0 }]);
  const [inputFields2, setInputFields2] = useState<any>([{ id: 0 }]);
  const [err, setErr] = useState<string | null>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [item, setItem] = useState<NewItem>({
    request_date: null,
    invoice_number: "",
    container_number: "",
    container_type: "",
    providers: [],
    importers: [],
    store_name: "",
    store_address: "",
    store_contact: "",
    conditions: "",
    line: "",
    agent: "",
    fraht: "",
    expeditor: "",
    bid: null,
    delivery_method: "",
    place_of_dispatch: "",
    arrive_place: "",
    dispatch_date: null,
    arrive_date: null,
    date_do: null,
    is_ds: null,
    is_docs: null,
    declaration_submit_date: null,
    declaration_number: "",
    declaration_issue_date: null,
    train_dispatch_date: null,
    train_arrive_date: null,
    destination_station: "",
    km_to_dist: "",
    store_arrive_date: null,
    note: "",
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
    console.log("Clicked cancel button");
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

  const importerHandler = (importer: string) => {
    if (importer !== "") item.importers?.push({ name: importer });
  };

  const providerHandler = (provider: string) => {
    if (provider !== "") item.providers?.push({ name: provider });
  };

  useEffect(() => {
    setTimeout(() => {
      setErr(null);
    }, 5000);
  }, [err]);

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
            <Form.Item className="required-form" label="№ инвойса и проформы">
              <Input
                onChange={(e) => {
                  setItem({ ...item, invoice_number: e.target.value });
                }}
                placeholder="№ инвойса и проформы"
              />
            </Form.Item>
            <Form.Item label="Контейнер">
              <Input
                onChange={(e) => {
                  setItem({ ...item, container_number: e.target.value });
                }}
                placeholder="Контейнер"
              />
            </Form.Item>
            <Form.Item label="Тип контейнера">
              <Input
                onChange={(e) => {
                  setItem({ ...item, container_type: e.target.value });
                }}
                placeholder="Тип контейнера"
              />
            </Form.Item>
            <Form.Item className="required-form" label="Импортер">
              {inputFields.map((input: { id: string | undefined }) => {
                return (
                  <Input
                    key={input.id}
                    placeholder="Импортер"
                    id={input.id}
                    onBlur={(e) => {
                      importerHandler(e.target.value);
                      console.log(item.importers);
                    }}
                  />
                );
              })}
              <Button onClick={addFields}>Добавить поле</Button>
            </Form.Item>
            <Form.Item className="required-form" label="Поставщик">
              {inputFields2.map((input: { id: string | undefined }) => {
                return (
                  <Input
                    key={input.id}
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
            <Form.Item className="required-form" label="Наименование склада">
              <Input
                onChange={(e) => {
                  setItem({ ...item, store_name: e.target.value });
                }}
                placeholder="Наименование склада"
              />
            </Form.Item>
            <Form.Item className="required-form" label="Адрес склада">
              <Input
                onChange={(e) => {
                  setItem({ ...item, store_address: e.target.value });
                }}
                placeholder="Адрес склада"
              />
            </Form.Item>
            <Form.Item className="required-form" label="Контакт склада">
              <Input
                onChange={(e) => {
                  setItem({ ...item, store_contact: e.target.value });
                }}
                placeholder="Контакт склада"
              />
            </Form.Item>
            <Form.Item className="required-form" label="Условия поставки">
              <Input
                onChange={(e) => {
                  setItem({ ...item, conditions: e.target.value });
                }}
                placeholder="Условия поставки"
              />
            </Form.Item>
            <Form.Item label="Линия">
              <Input
                onChange={(e) => {
                  setItem({ ...item, line: e.target.value });
                }}
                placeholder="Линия"
              />
            </Form.Item>
            <Form.Item className="required-form" label="Агент">
              <Input
                onChange={(e) => {
                  setItem({ ...item, agent: e.target.value });
                }}
                placeholder="Агент"
              />
            </Form.Item>
            <Form.Item label="Фрахт">
              <Input
                onChange={(e) => {
                  setItem({ ...item, fraht: e.target.value });
                }}
                placeholder="Фрахт"
              />
            </Form.Item>
            <Form.Item label="Экспедитор">
              <Input
                onChange={(e) => {
                  setItem({ ...item, expeditor: e.target.value });
                }}
                placeholder="Экспедитор"
              />
            </Form.Item>
            <Form.Item label="Ставка">
              <Input
                onChange={(e) => {
                  setItem({ ...item, bid: parseInt(e.target.value) });
                }}
                placeholder="Ставка"
              />
            </Form.Item>
            <Form.Item label="Способ доставки (маршрут)">
              <Input
                onChange={(e) => {
                  setItem({ ...item, delivery_method: e.target.value });
                }}
                placeholder="Способ доставки (маршрут)"
              />
            </Form.Item>
            <Form.Item className="required-form" label="Место отправки">
              <Input
                onChange={(e) => {
                  setItem({ ...item, place_of_dispatch: e.target.value });
                }}
                placeholder="Место отправки"
              />
            </Form.Item>
            <Form.Item label="Порт прибытия/станция назначения">
              <Input
                onChange={(e) => {
                  setItem({ ...item, arrive_place: e.target.value });
                }}
                placeholder="Порт прибытия/станция назначения"
              />
            </Form.Item>
            <Form.Item label="Дата отправки/выхода">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, dispatch_date: new Date(dateString) });
                }}
                placeholder="Дата отправки/выхода"
              />
            </Form.Item>
            <Form.Item label="Дата прибытия">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, arrive_date: new Date(dateString) });
                }}
                placeholder="Дата прибытия"
              />
            </Form.Item>
            <Form.Item label="Дата «ДО»">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, date_do: new Date(dateString) });
                }}
                placeholder="Дата «ДО»"
              />
            </Form.Item>
            <Form.Item label="ДС для подачи">
              <Input
                onChange={(e) => {
                  setItem({
                    ...item,
                    is_ds: e.target.value === "" ? false : true,
                  });
                }}
                placeholder="ДС для подачи"
              />
            </Form.Item>
            <Form.Item label="Документы для подачи">
              <Input
                onChange={(e) => {
                  setItem({
                    ...item,
                    is_docs: e.target.value === "" ? false : true,
                  });
                }}
                placeholder="Документы для подачи"
              />
            </Form.Item>
            <Form.Item label="Дата подачи декларации">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({
                    ...item,
                    declaration_submit_date: new Date(dateString),
                  });
                }}
                placeholder="Дата подачи декларации"
              />
            </Form.Item>
            <Form.Item label="№ декларации">
              <Input
                onChange={(e) => {
                  setItem({ ...item, declaration_number: e.target.value });
                }}
                placeholder="№ декларации"
              />
            </Form.Item>
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
            <Form.Item label="Дата отправки по ЖД">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({
                    ...item,
                    train_dispatch_date: new Date(dateString),
                  });
                }}
                placeholder="Дата отправки по ЖД"
              />
            </Form.Item>
            <Form.Item label="Дата прибытия по ЖД">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, train_arrive_date: new Date(dateString) });
                }}
                placeholder="Дата прибытия по ЖД"
              />
            </Form.Item>
            <Form.Item label="Станция назначения">
              <Input
                onChange={(e) => {
                  setItem({ ...item, destination_station: e.target.value });
                }}
                placeholder="Станция назначения"
              />
            </Form.Item>
            <Form.Item label="Км. до станции назначения">
              <Input
                onChange={(e) => {
                  setItem({ ...item, km_to_dist: e.target.value });
                }}
                placeholder="Км. до станции назначения"
              />
            </Form.Item>
            <Form.Item label="Дата прибытия на склад">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, store_arrive_date: new Date(dateString) });
                }}
                placeholder="Дата прибытия на склад"
              />
            </Form.Item>
            <Form.Item label="Примечание">
              <Input
                onChange={(e) => {
                  setItem({ ...item, note: e.target.value });
                }}
                placeholder="Примечание"
              />
            </Form.Item>
          </Form>
        </div>
        <div className="table-legend">
          <div></div>
          <p>Обязательное поле</p>
        </div>
      </Modal>
    </>
  );
};
