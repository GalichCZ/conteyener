import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { NewItem } from "./Types";
import { Item } from "../../functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import { MyInput } from "../index";
import { Required } from "../../UI/index";

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
            <MyInput
              datePicker={true}
              label="Дата заявки"
              onChangeDate={(date: any, dateString: string | number | Date) =>
                setItem({ ...item, request_date: new Date(dateString) })
              }
            />
            <MyInput
              datePicker={false}
              label="№ заказа"
              onChange={(e: { target: { value: any } }) => {
                setItem({ ...item, order_number: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Номер контейнера"
              onChange={(e) => {
                setItem({ ...item, container_number: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Товар"
              onChange={(e) => {
                setItem({ ...item, simple_product_name: e.target.value });
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
              datePicker={false}
              label="Условия поставки"
              onChange={(e) => {
                setItem({ ...item, conditions: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Получатель"
              onChange={(e) => {
                setItem({ ...item, store_receiver: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Наименование склада"
              onChange={(e) => {
                setItem({ ...item, store_name: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Адрес склада"
              onChange={(e) => {
                setItem({ ...item, store_address: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Контакт склада"
              onChange={(e) => {
                setItem({ ...item, store_contact: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Агент"
              onChange={(e) => {
                setItem({ ...item, agent: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Тип контейнера"
              onChange={(e) => {
                setItem({ ...item, container_type: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Место отправки"
              onChange={(e) => {
                setItem({ ...item, place_of_dispatch: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Порт прибытия/станция назначения"
              onChange={(e) => {
                setItem({ ...item, arrive_place: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Линия"
              onChange={(e) => {
                setItem({ ...item, line: e.target.value });
              }}
            />
            <MyInput
              datePicker
              label="Дата готовности"
              onChangeDate={(date: any, dateString: string | number | Date) => {
                setItem({ ...item, ready_date: new Date(dateString) });
              }}
            />
            <MyInput
              datePicker
              label="Дата загрузки"
              onChangeDate={(date: any, dateString: string | number | Date) => {
                setItem({ ...item, load_date: new Date(dateString) });
              }}
            />
            <MyInput
              datePicker
              label="ETD"
              onChangeDate={(date: any, dateString: string | number | Date) => {
                setItem({ ...item, etd: new Date(dateString) });
              }}
            />
            <MyInput
              datePicker
              label="ETA"
              onChangeDate={(date: any, dateString: string | number | Date) => {
                setItem({ ...item, eta: new Date(dateString) });
              }}
            />
            <MyInput
              datePicker
              label="Релиз"
              onChangeDate={(date: any, dateString: string | number | Date) => {
                setItem({ ...item, release: new Date(dateString) });
              }}
            />
            <MyInput
              datePicker={false}
              label="BL/СМГС/CMR"
              onChange={(e) => {
                setItem({
                  ...item,
                  bl_smgs_cmr: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              datePicker={false}
              label="ТД"
              onChange={(e) => {
                setItem({
                  ...item,
                  td: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              datePicker
              label="Дата «ДО»"
              onChangeDate={(date: any, dateString: string | number | Date) => {
                setItem({ ...item, date_do: new Date(dateString) });
              }}
            />
            <MyInput
              datePicker={false}
              label="Порт"
              onChange={(e) => {
                setItem({ ...item, port: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="ДС для подачи"
              onChange={(e) => {
                setItem({
                  ...item,
                  is_ds: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              datePicker={false}
              label="Документы для подачи"
              onChange={(e) => {
                setItem({
                  ...item,
                  is_docs: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              datePicker={false}
              label="№ декларации"
              onChange={(e) => {
                setItem({ ...item, declaration_number: e.target.value });
              }}
            />
            <MyInput
              datePicker
              label="Дата выпуска декларации"
              onChangeDate={(date: any, dateString: string | number | Date) => {
                setItem({
                  ...item,
                  declaration_issue_date: new Date(dateString),
                });
              }}
            />
            <MyInput
              datePicker={false}
              label="Наличие ОБ"
              onChange={(e) => {
                setItem({
                  ...item,
                  availability_of_ob: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              datePicker={false}
              label="Ответ ОБ"
              onChange={(e) => {
                setItem({
                  ...item,
                  answer_of_ob: e.target.value === "" ? false : true,
                });
              }}
            />
            <MyInput
              datePicker={false}
              label="Экспедитор"
              onChange={(e) => {
                setItem({ ...item, expeditor: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Станция назначения"
              onChange={(e) => {
                setItem({ ...item, destination_station: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Км. до станции назначения"
              onChange={(e) => {
                setItem({ ...item, km_to_dist: parseInt(e.target.value) });
              }}
            />
            <MyInput
              datePicker
              label="Дата прибытия по ЖД"
              onChangeDate={(date: any, dateString: string | number | Date) => {
                setItem({ ...item, train_arrive_date: new Date(dateString) });
              }}
            />
            <MyInput
              datePicker={false}
              label="Ставка"
              onChange={(e) => {
                setItem({ ...item, bid: parseInt(e.target.value) });
              }}
            />
            <MyInput
              datePicker={false}
              label="Автовывоз"
              onChange={(e) => {
                setItem({ ...item, pickup: e.target.value });
              }}
            />
            <MyInput
              datePicker
              label="Дата прибытия на склад"
              onChangeDate={(date: any, dateString: string | number | Date) => {
                setItem({ ...item, store_arrive_date: new Date(dateString) });
              }}
            />
            <MyInput
              datePicker={false}
              label="Комментарий"
              onChange={(e) => {
                setItem({ ...item, comment: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
              label="Фрахт"
              onChange={(e) => {
                setItem({ ...item, fraht: e.target.value });
              }}
            />
            <MyInput
              datePicker={false}
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
