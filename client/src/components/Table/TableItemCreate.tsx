import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import { NewItem } from "./Types";
import { Item } from "../../functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";

const ItemFuncs = new Item();

export const TableItemCreate = () => {
  const [open, setOpen] = useState(false);
  const [inputFields, setInputFields] = useState<any>([]);
  const [inputFields2, setInputFields2] = useState<any>([]);
  const [err, setErr] = useState<string | null>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [item, setItem] = useState<NewItem>({
    request_date: null,
    order_number: "",
    container_number: "",
    simple_product_name: "",
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
    is_docs: null,
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
      if (response._id) window.location.reload();
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

  const drawImporters = () => {
    return inputFields.map((input: { id: any }) => {
      return (
        <div style={{ display: "flex" }}>
          <Input
            key={input.id}
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

  useEffect(() => {
    setTimeout(() => {
      setErr(null);
    }, 5000);
  }, [err]);

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
            <Form.Item className="required-form" label="№ заказа">
              <Input
                onChange={(e) => {
                  setItem({ ...item, order_number: e.target.value });
                }}
                placeholder="№ заказа"
              />
            </Form.Item>
            <Form.Item label="Номер контейнера">
              <Input
                onChange={(e) => {
                  setItem({ ...item, container_number: e.target.value });
                }}
                placeholder="Номер контейнера"
              />
            </Form.Item>
            <Form.Item label="Товар">
              <Input
                onChange={(e) => {
                  setItem({ ...item, simple_product_name: e.target.value });
                }}
                placeholder="Товар"
              />
            </Form.Item>
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
            <Form.Item className="required-form" label="Условия поставки">
              <Input
                onChange={(e) => {
                  setItem({ ...item, conditions: e.target.value });
                }}
                placeholder="Условия поставки"
              />
            </Form.Item>
            <Form.Item className="required-form" label="Получатель">
              <Input
                onChange={(e) => {
                  setItem({ ...item, store_receiver: e.target.value });
                }}
                placeholder="Получатель"
              />
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
            <Form.Item className="required-form" label="Агент">
              <Input
                onChange={(e) => {
                  setItem({ ...item, agent: e.target.value });
                }}
                placeholder="Агент"
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
            <Form.Item label="Линия">
              <Input
                onChange={(e) => {
                  setItem({ ...item, line: e.target.value });
                }}
                placeholder="Линия"
              />
            </Form.Item>
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
            <Form.Item label="BL/СМГС/CMR">
              <Input
                onChange={(e) => {
                  setItem({
                    ...item,
                    bl_smgs_cmr: e.target.value === "" ? false : true,
                  });
                }}
                placeholder="BL/СМГС/CMR"
              />
            </Form.Item>
            <Form.Item label="ТД">
              <Input
                onChange={(e) => {
                  setItem({
                    ...item,
                    td: e.target.value === "" ? false : true,
                  });
                }}
                placeholder="ТД"
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
            <Form.Item label="Порт">
              <Input
                onChange={(e) => {
                  setItem({ ...item, port: e.target.value });
                }}
                placeholder="Порт"
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
            <Form.Item label="Наличие ОБ">
              <Input
                onChange={(e) => {
                  setItem({
                    ...item,
                    bl_smgs_cmr: e.target.value === "" ? false : true,
                  });
                }}
                placeholder="Наличие ОБ"
              />
            </Form.Item>
            <Form.Item label="Ответ ОБ">
              <Input
                onChange={(e) => {
                  setItem({
                    ...item,
                    bl_smgs_cmr: e.target.value === "" ? false : true,
                  });
                }}
                placeholder="Ответ ОБ"
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
                  setItem({ ...item, km_to_dist: parseInt(e.target.value) });
                }}
                placeholder="Км. до станции назначения"
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
            <Form.Item label="Ставка">
              <Input
                onChange={(e) => {
                  setItem({ ...item, bid: parseInt(e.target.value) });
                }}
                placeholder="Ставка"
              />
            </Form.Item>
            <Form.Item label="Автовывоз">
              <Input
                onChange={(e) => {
                  setItem({ ...item, pickup: e.target.value });
                }}
                placeholder="Автовывоз"
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
            <Form.Item label="Комментарий">
              <Input
                onChange={(e) => {
                  setItem({ ...item, comment: e.target.value });
                }}
                placeholder="Комментарий"
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
