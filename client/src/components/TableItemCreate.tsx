import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import { NewItem } from "./Table/Types";
import { Item } from "../functions/itemFuncs";

const ItemFuncs = new Item();

export const TableItemCreate = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [importersArr, setImportersArr] = useState<string[] | undefined>();
  const [providersArr, setProvidersArr] = useState<string[] | undefined>();
  const [item, setItem] = useState<NewItem>({
    request_date: "",
    invoice_number: "",
    container_number: "",
    container_type: "",
    providers: ["qwe"],
    importers: ["qwe"],
    store_name: "",
    store_address: "",
    store_contact: "",
    conditions: "",
    line: "",
    agent: "",
    fraht: "",
    expeditor: "",
    bid: "",
    delivery_method: "",
    place_of_dispatch: "",
    arrive_place: "",
    dispatch_date: "",
    arrive_date: "",
    date_do: "",
    is_ds: "",
    is_docs: "",
    declaration_submit_date: "",
    declaration_number: "",
    declaration_issue_date: "",
    train_dispatch_date: "",
    train_arrive_date: "",
    destination_station: "",
    km_to_dist: "",
    store_arrive_date: "",
    note: "",
  });

  const showModal = () => {
    setOpen(true);
  };

  const createItem = async (itemValues: object) => {
    console.log(itemValues);
    const response = await fetch(URL + "/item", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return response;
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await ItemFuncs.createItem(item);
    setTimeout(() => {
      // setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
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
          <Form className="table-form" layout="vertical">
            <Form.Item label="Дата заявки">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, request_date: dateString });
                }}
                placeholder="Дата заявки"
              />
            </Form.Item>
            <Form.Item label="№ инвойса и проформы">
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
            <Form.Item label="Импортер">
              <Input
                // onChange={(e) => {
                //   importersArr?.push(e.target.value);
                //   setItem({
                //     ...item,
                //     importers: importersArr,
                //   });
                // }}
                placeholder="Импортер"
              />
            </Form.Item>
            <Form.Item label="Поставщик">
              <Input
                // onChange={(e) => {
                //   providersArr?.push(e.target.value);
                //   setItem({
                //     ...item,
                //     importers: importersArr,
                //   });
                // }}
                placeholder="Поставщик"
              />
            </Form.Item>
            <Form.Item label="Наименование склада">
              <Input
                onChange={(e) => {
                  setItem({ ...item, store_name: e.target.value });
                }}
                placeholder="Наименование склада"
              />
            </Form.Item>
            <Form.Item label="Адрес склада">
              <Input
                onChange={(e) => {
                  setItem({ ...item, store_address: e.target.value });
                }}
                placeholder="Адрес склада"
              />
            </Form.Item>
            <Form.Item label="Контакт склада">
              <Input
                onChange={(e) => {
                  setItem({ ...item, store_contact: e.target.value });
                }}
                placeholder="Контакт склада"
              />
            </Form.Item>
            <Form.Item label="Условия поставки">
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
            <Form.Item label="Агент">
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
                  setItem({ ...item, bid: e.target.value });
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
            <Form.Item label="Место отправки">
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
                  setItem({ ...item, dispatch_date: dateString });
                }}
                placeholder="Дата отправки/выхода"
              />
            </Form.Item>
            <Form.Item label="Дата прибытия">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, arrive_date: dateString });
                }}
                placeholder="Дата прибытия"
              />
            </Form.Item>
            <Form.Item label="Дата «ДО»">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, date_do: dateString });
                }}
                placeholder="Дата «ДО»"
              />
            </Form.Item>
            <Form.Item label="ДС для подачи">
              <Input
                onChange={(e) => {
                  setItem({ ...item, is_ds: e.target.value });
                }}
                placeholder="ДС для подачи"
              />
            </Form.Item>
            <Form.Item label="Документы для подачи">
              <Input
                onChange={(e) => {
                  setItem({ ...item, is_docs: e.target.value });
                }}
                placeholder="Документы для подачи"
              />
            </Form.Item>
            <Form.Item label="Дата подачи декларации">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, declaration_submit_date: dateString });
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
                  setItem({ ...item, declaration_issue_date: dateString });
                }}
                placeholder="Дата выпуска декларации"
              />
            </Form.Item>
            <Form.Item label="Дата отправки по ЖД">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, train_dispatch_date: dateString });
                }}
                placeholder="Дата отправки по ЖД"
              />
            </Form.Item>
            <Form.Item label="Дата прибытия по ЖД">
              <DatePicker
                onChange={(date, dateString) => {
                  setItem({ ...item, train_arrive_date: dateString });
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
                  setItem({ ...item, store_arrive_date: dateString });
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
      </Modal>
    </>
  );
};
