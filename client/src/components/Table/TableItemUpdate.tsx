import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Switch } from "antd";
import { SingleItem, UpdatedItem } from "../../Types/Types";
import { Item } from "../../functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";

const ItemFuncs = new Item();

export const TableItemUpdate: React.FC<SingleItem> = ({
  item,
  opened,
  setOpen,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [err, setErr] = useState<string | null>();
  const [inputFields, setInputFields] = useState<any>();
  const [inputFields2, setInputFields2] = useState<any>();
  const [inputFields3, setInputFields3] = useState<any>();
  const [singleItem, setSingleItem] = useState<UpdatedItem>({
    _id: "",
    request_date: null,
    order_number: [],
    container: {
      _id: "",
      container_number: "",
      container_type: "",
    },
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

  useEffect(() => {
    setInputFields(item?.importers);
    setInputFields2(item?.providers);
    setInputFields3(item?.order_number);
  }, [item]);

  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await ItemFuncs.updateItem(singleItem);
    if (response.error) setErr(response.error);
    if (response === 200) {
      setConfirmLoading(false);
      setOpen(false);
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const importerHandler = (importer: string) => {
    if (importer !== "") item.importers?.push({ name: importer });
  };

  const deleteImporter = (_importer: string) => {
    const newImporters = singleItem.importers?.filter((importer) => {
      return importer.name !== _importer;
    });

    if (newImporters) {
      setSingleItem({ ...singleItem, importers: newImporters });
      setInputFields(newImporters);
    }
  };

  const providerHandler = (provider: string) => {
    if (provider !== "") item.providers?.push({ name: provider });
  };

  const deleteProvider = (_provider: string) => {
    const newProviders = singleItem.providers?.filter((provider) => {
      return provider.name !== _provider;
    });

    if (newProviders) {
      setSingleItem({ ...singleItem, providers: newProviders });
      setInputFields2(newProviders);
    }
  };

  const orderHandler = (order: string) => {
    if (order !== "") item.order_number?.push({ number: order });
  };

  const deleteOrder = (_order: string) => {
    const newOrders = singleItem.order_number?.filter((order) => {
      return order.number !== _order;
    });

    if (newOrders) {
      setSingleItem({ ...singleItem, order_number: newOrders });
      setInputFields3(newOrders);
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

  useEffect(() => {
    console.log(singleItem);
  }, [singleItem]);

  useEffect(() => {
    if (opened) setSingleItem(item);
  }, [opened]);

  return (
    <>
      <Modal
        title="Редактирование записи"
        open={opened}
        onOk={async () => {
          await handleOk();
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form className="table-form" layout="vertical">
          <Form.Item className="required-form" label="Дата заявки">
            <input
              className="ant-input"
              placeholder="Дата заявки"
              type="date"
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  request_date: new Date(e.target.value),
                });
              }}
              defaultValue={item?.request_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item className="required-form" label="№ заказа">
            {inputFields3?.map(
              (input: { id: string; number: string }, key: string) => {
                return (
                  <div key={key} style={{ display: "flex" }}>
                    <Input
                      placeholder="Номер заказа"
                      defaultValue={input.number}
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
            )}
            <Button onClick={addFields3}>Добавить поле</Button>
          </Form.Item>
          <Form.Item label="Номер контейнера">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  container: {
                    ...singleItem.container,
                    container_number: e.target.value,
                  },
                });
              }}
              defaultValue={item?.container.container_number}
              placeholder="Номер контейнера"
            />
          </Form.Item>
          <Form.Item className="required-form" label="Товар">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  simple_product_name: e.target.value,
                });
              }}
              defaultValue={item?.simple_product_name}
              placeholder="Товар"
            />
          </Form.Item>
          <Form.Item className="required-form" label="Поставщик">
            {inputFields2?.map(
              (input: { id: string; name: string }, key: number) => {
                return (
                  <div key={key} style={{ display: "flex" }}>
                    <Input
                      placeholder="Поставщик"
                      id={input.id}
                      defaultValue={input.name}
                      onBlur={(e) => {
                        providerHandler(e.target.value);
                        console.log(item.importers);
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
          </Form.Item>
          <Form.Item className="required-form" label="Импортер">
            {inputFields?.map(
              (input: { id: string; name: string }, key: number) => {
                return (
                  <div key={key} style={{ display: "flex" }}>
                    <Input
                      placeholder="Импортер"
                      id={input.id}
                      defaultValue={input.name}
                      onBlur={(e) => {
                        importerHandler(e.target.value);
                        console.log(item.importers);
                      }}
                    />
                    <CloseOutlined
                      onClick={() => {
                        deleteImporter(input.name);
                      }}
                    />
                  </div>
                );
              }
            )}
            <Button onClick={addFields}>Добавить поле</Button>
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
          <Form.Item className="required-form" label="Наименование склада">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, store_name: e.target.value });
              }}
              defaultValue={item?.store.name}
              placeholder="Наименование склада"
            />
          </Form.Item>
          <Form.Item className="required-form" label="Получатель">
            <Input
              defaultValue={item?.store.receiver}
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  store_receiver: e.target.value,
                });
              }}
              placeholder="Получатель"
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
          <Form.Item className="required-form" label="Агент">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, agent: e.target.value });
              }}
              defaultValue={item?.agent}
              placeholder="Агент"
            />
          </Form.Item>
          <Form.Item label="Тип контейнера">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  container: {
                    ...singleItem.container,
                    container_type: e.target.value,
                  },
                });
              }}
              defaultValue={item?.container.container_type}
              placeholder="Тип контейнера"
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
          <Form.Item label="Линия">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, line: e.target.value });
              }}
              defaultValue={item?.line}
              placeholder="Линия"
            />
          </Form.Item>
          <Form.Item label="Дата готовности">
            <input
              placeholder="Дата готовности"
              className="ant-input"
              type="date"
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  ready_date: new Date(e.target.value),
                });
              }}
              defaultValue={item?.ready_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Дата загрузки">
            <input
              placeholder="Дата загрузки"
              className="ant-input"
              type="date"
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  load_date: new Date(e.target.value),
                });
              }}
              defaultValue={item?.load_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="ETD">
            <input
              placeholder="ETD"
              className="ant-input"
              type="date"
              onChange={(e) => {
                setSingleItem({ ...singleItem, etd: new Date(e.target.value) });
              }}
              defaultValue={item?.etd?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="ETA">
            <input
              placeholder="ETA"
              className="ant-input"
              type="date"
              onChange={(e) => {
                setSingleItem({ ...singleItem, eta: new Date(e.target.value) });
              }}
              defaultValue={item?.eta?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Релиз">
            <input
              placeholder="Релиз"
              className="ant-input"
              type="date"
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  release: new Date(e.target.value),
                });
              }}
              defaultValue={item?.release?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="BL/СМГС/CMR">
            <Switch
              style={{ minWidth: "45px" }}
              onChange={(e) => {
                console.log(e.valueOf);
              }}
            />
          </Form.Item>
          <Form.Item label="ТД">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  td: e.target.value === "" ? false : true,
                });
              }}
              defaultValue={item?.bl_smgs_cmr ? "V" : ""}
              placeholder="ТД"
            />
          </Form.Item>
          <Form.Item label="Дата «ДО»">
            <input
              placeholder="Дата «ДО»"
              className="ant-input"
              type="date"
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  date_do: new Date(e.target.value),
                });
              }}
              defaultValue={item?.date_do?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Порт">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, port: e.target.value });
              }}
              defaultValue={item?.port}
              placeholder="Порт"
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
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  declaration_issue_date: new Date(e.target.value),
                });
              }}
              defaultValue={item?.declaration_issue_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Наличие ОБ">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  availability_of_ob: e.target.value === "" ? false : true,
                });
              }}
              defaultValue={item?.availability_of_ob ? "V" : ""}
              placeholder="Наличие ОБ"
            />
          </Form.Item>
          <Form.Item label="Ответ ОБ">
            <Input
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  answer_of_ob: e.target.value === "" ? false : true,
                });
              }}
              defaultValue={item?.answer_of_ob ? "V" : ""}
              placeholder="Ответ ОБ"
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
          <Form.Item label="Дата прибытия по ЖД">
            <input
              placeholder="Дата прибытия по ЖД"
              className="ant-input"
              type="date"
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  train_arrive_date: new Date(e.target.value),
                });
              }}
              defaultValue={item?.train_arrive_date?.substring(0, 10)}
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
          <Form.Item label="Автовывоз">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, pickup: e.target.value });
              }}
              defaultValue={item?.pickup}
              placeholder="Автовывоз"
            />
          </Form.Item>
          <Form.Item label="Дата прибытия на склад">
            <input
              placeholder="Дата прибытия на склад"
              className="ant-input"
              type="date"
              onChange={(e) => {
                setSingleItem({
                  ...singleItem,
                  store_arrive_date: new Date(e.target.value),
                });
              }}
              defaultValue={item?.store_arrive_date?.substring(0, 10)}
            />
          </Form.Item>
          <Form.Item label="Комментарий">
            <Input
              onChange={(e) => {
                setSingleItem({ ...singleItem, comment: e.target.value });
              }}
              defaultValue={item?.comment}
              placeholder="Комментарий"
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
