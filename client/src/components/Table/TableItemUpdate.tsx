import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { SingleItem, UpdatedItem } from "./Types";

export const TableItemUpdate: React.FC<SingleItem> = ({
  item,
  opened,
  setOpen,
}) => {
  const [inputFields, setInputFields] = useState<any>();
  const [inputFields2, setInputFields2] = useState<any>();
  const [singleItem, setSingleItem] = useState<UpdatedItem>({
    _id: "",
    request_date: "",
    order_number: "",
    container: {
      _id: "",
      container_number: "",
      container_type: "",
    },
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
    port: "",
    place_of_dispatch: "",
    arrive_place: "",
    etd: null,
    eta: null,
    date_do: null,
    is_ds: null,
    is_docs: null,
    declaration_submit_date: null,
    declaration_number: "",
    declaration_issue_date: null,
    train_etd: null,
    train_arrive_date: null,
    destination_station: "",
    km_to_dist: null,
    store_arrive_date: null,
    note: "",
  });

  useEffect(() => {
    setInputFields(item?.importers);
    setInputFields2(item?.providers);
  }, [item]);

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const importerHandler = (importer: string) => {
    if (importer !== "") item.importers?.push({ name: importer });
  };

  const providerHandler = (provider: string) => {
    if (provider !== "") item.providers?.push({ name: provider });
  };

  const addFields = () => {
    let newField = { id: inputFields.length };
    setInputFields([...inputFields, newField]);
  };

  const addFields2 = () => {
    let newField = { id: inputFields2.length };
    setInputFields2([...inputFields2, newField]);
  };

  useEffect(() => {
    if (opened) setSingleItem(item);
  }, [opened]);

  useEffect(() => {
    console.log(singleItem);
  }, [singleItem]);

  return (
    <>
      <Modal
        title="Редактирование записи"
        open={opened}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="table-form" layout="vertical">
          <Form.Item className="required-form" label="Дата заявки">
            <input
              className="ant-input"
              placeholder="Дата заявки"
              type="date"
              defaultValue={item?.request_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item className="required-form" label="№ инвойса и проформы">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  order_number: e.target.value,
                });
              }}
              defaultValue={item?.order_number}
              placeholder="№ инвойса и проформы"
            />
          </Form.Item>
          <Form.Item label="Контейнер">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                });
              }}
              defaultValue={item?.container.container_number}
              placeholder="Контейнер"
            />
          </Form.Item>
          <Form.Item label="Тип контейнера">
            <Input
              // onChange={(e) => {
              //   setSingleItem({
              //     ...singleItem,
              //     container_type: e.target.value,
              //   });
              // }}
              defaultValue={item?.container.container_type}
              placeholder="Тип контейнера"
            />
          </Form.Item>
          <Form.Item className="required-form" label="Импортер">
            {inputFields?.map(
              (input: { id: string | undefined; name: string | undefined }) => {
                return (
                  <Input
                    key={input.id}
                    placeholder="Импортер"
                    id={input.id}
                    defaultValue={input.name}
                    onBlur={(e) => {
                      importerHandler(e.target.value);
                      console.log(item.importers);
                    }}
                  />
                );
              }
            )}
            <Button onClick={addFields}>Добавить поле</Button>
          </Form.Item>
          <Form.Item className="required-form" label="Поставщик">
            {inputFields2?.map(
              (input: { id: string | undefined; name: string | undefined }) => {
                return (
                  <Input
                    key={input.id}
                    placeholder="Поставщик"
                    id={input.id}
                    defaultValue={input.name}
                    onBlur={(e) => {
                      providerHandler(e.target.value);
                      console.log(item.importers);
                    }}
                  />
                );
              }
            )}
            <Button onClick={addFields2}>Добавить поле</Button>
          </Form.Item>
          <Form.Item className="required-form" label="Наименование склада">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, store_name: e.target.value });
              }}
              defaultValue={item?.store.name}
              placeholder="Наименование склада"
            />
          </Form.Item>
          <Form.Item className="required-form" label="Адрес склада">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, store_address: e.target.value });
              }}
              defaultValue={item?.store.address}
              placeholder="Адрес склада"
            />
          </Form.Item>
          <Form.Item className="required-form" label="Контакт склада">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, store_contact: e.target.value });
              }}
              defaultValue={item?.store.contact}
              placeholder="Контакт склада"
            />
          </Form.Item>
          <Form.Item className="required-form" label="Условия поставки">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, conditions: e.target.value });
              }}
              defaultValue={item?.conditions}
              placeholder="Условия поставки"
            />
          </Form.Item>
          <Form.Item label="Линия">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, line: e.target.value });
              }}
              defaultValue={item?.line}
              placeholder="Линия"
            />
          </Form.Item>
          <Form.Item className="required-form" label="Агент">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, agent: e.target.value });
              }}
              defaultValue={item?.agent}
              placeholder="Агент"
            />
          </Form.Item>
          <Form.Item label="Фрахт">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, fraht: e.target.value });
              }}
              defaultValue={item?.fraht}
              placeholder="Фрахт"
            />
          </Form.Item>
          <Form.Item label="Экспедитор">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, expeditor: e.target.value });
              }}
              defaultValue={item?.expeditor}
              placeholder="Экспедитор"
            />
          </Form.Item>
          <Form.Item label="Ставка">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, bid: parseInt(e.target.value) });
              }}
              defaultValue={item?.bid}
              placeholder="Ставка"
            />
          </Form.Item>
          <Form.Item label="Способ доставки (маршрут)">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  port: e.target.value,
                });
              }}
              defaultValue={item?.port}
              placeholder="Способ доставки (маршрут)"
            />
          </Form.Item>
          <Form.Item className="required-form" label="Место отправки">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  place_of_dispatch: e.target.value,
                });
              }}
              defaultValue={item?.place_of_dispatch}
              placeholder="Место отправки"
            />
          </Form.Item>
          <Form.Item label="Порт прибытия/станция назначения">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, arrive_place: e.target.value });
              }}
              defaultValue={item?.arrive_place}
              placeholder="Порт прибытия/станция назначения"
            />
          </Form.Item>
          <Form.Item label="Дата отправки/выхода">
            <input
              placeholder="Дата отправки/выхода"
              className="ant-input"
              type="date"
              defaultValue={item?.etd?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Дата прибытия">
            <input
              placeholder="Дата прибытия"
              className="ant-input"
              type="date"
              defaultValue={item?.eta?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Дата «ДО»">
            <input
              placeholder="Дата «ДО»"
              className="ant-input"
              type="date"
              defaultValue={item?.date_do?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="ДС для подачи">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  is_ds: e.target.value === "" ? false : true,
                });
              }}
              defaultValue={item?.is_ds ? "V" : ""}
              placeholder="ДС для подачи"
            />
          </Form.Item>
          <Form.Item label="Документы для подачи">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  is_docs: e.target.value === "" ? false : true,
                });
              }}
              defaultValue={item?.is_docs ? "V" : ""}
              placeholder="Документы для подачи"
            />
          </Form.Item>
          <Form.Item label="Дата подачи декларации">
            <input
              placeholder="Дата подачи декларации"
              className="ant-input"
              type="date"
              defaultValue={item?.declaration_submit_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="№ декларации">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  declaration_number: e.target.value,
                });
              }}
              defaultValue={item?.declaration_number}
              placeholder="№ декларации"
            />
          </Form.Item>
          <Form.Item label="Дата выпуска декларации">
            <input
              placeholder="Дата выпуска декларации"
              className="ant-input"
              type="date"
              defaultValue={item?.declaration_issue_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Дата отправки по ЖД">
            <input
              placeholder="Дата отправки по ЖД"
              className="ant-input"
              type="date"
              defaultValue={item?.train_etd?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Дата прибытия по ЖД">
            <input
              placeholder="Дата прибытия по ЖД"
              className="ant-input"
              type="date"
              defaultValue={item?.train_arrive_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Станция назначения">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  destination_station: e.target.value,
                });
              }}
              defaultValue={item?.destination_station}
              placeholder="Станция назначения"
            />
          </Form.Item>
          <Form.Item label="Км. до станции назначения">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  km_to_dist: parseInt(e.target.value),
                });
              }}
              defaultValue={item?.km_to_dist}
              placeholder="Км. до станции назначения"
            />
          </Form.Item>
          <Form.Item label="Дата прибытия на склад">
            <input
              placeholder="Дата прибытия на склад"
              className="ant-input"
              type="date"
              defaultValue={item?.store_arrive_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Примечание">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, note: e.target.value });
              }}
              defaultValue={item?.note}
              placeholder="Примечание"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
