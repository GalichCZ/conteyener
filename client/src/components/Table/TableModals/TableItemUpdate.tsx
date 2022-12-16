import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Switch } from "antd";
import { SingleItem, UpdatedItem } from "../../../Types/Types";
import { Item } from "../../../functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import { SelectDelivery } from "../TableUI/SelectDelivery";
import { TechStoreSelect } from "../TableUI/TechStoreSelect";
import { MyInput } from "../TableUI/MyInput";

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
    delivery_method: "",
    providers: [],
    importers: [],
    conditions: "",
    tech_store: "",
    agent: "",
    store_name: "",
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

  console.log(item);

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
          <MyInput
            label="Номер контейнера"
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
          />
          <MyInput
            label="Товар"
            className="required-form"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                simple_product_name: e.target.value,
              });
            }}
            defaultValue={item?.simple_product_name}
          />
          <SelectDelivery
            onChange={(value) => {
              console.log(value);
              setSingleItem({ ...singleItem, delivery_method: value });
            }}
          />
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
          <MyInput
            className="required-form"
            label="Условия поставки"
            onChange={(e) => {
              setSingleItem({ ...singleItem, conditions: e.target.value });
            }}
            defaultValue={item?.conditions}
          />
          <TechStoreSelect
            onChange={(value) => {
              setSingleItem({ ...singleItem, tech_store: value });
            }}
            defaultValue={item?.store_name}
            opened={opened}
            className="required-form"
          />
          <MyInput
            className="required-form"
            label="Агент"
            onChange={(e) => {
              setSingleItem({ ...singleItem, agent: e.target.value });
            }}
            defaultValue={item?.agent}
          />
          <MyInput
            label="Тип контейнера"
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
          />
          <MyInput
            className="required-form"
            label="Место отправки"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                place_of_dispatch: e.target.value,
              });
            }}
            defaultValue={item?.place_of_dispatch}
          />
          <MyInput
            label="Линия"
            onChange={(e) => {
              setSingleItem({ ...singleItem, line: e.target.value });
            }}
            defaultValue={item?.line}
          />
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
          <MyInput
            label="ТД"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                td: e.target.value === "" ? false : true,
              });
            }}
            defaultValue={item?.bl_smgs_cmr ? "V" : ""}
          />
          <MyInput
            label="Порт"
            onChange={(e) => {
              setSingleItem({ ...singleItem, port: e.target.value });
            }}
            defaultValue={item?.port}
          />
          <MyInput
            label="ДС для подачи"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                is_ds: e.target.value === "" ? false : true,
              });
            }}
            defaultValue={item?.is_ds ? "V" : ""}
          />
          <MyInput
            label="№ декларации"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                declaration_number: e.target.value,
              });
            }}
            defaultValue={item?.declaration_number}
          />
          <MyInput
            label="Наличие ОБ"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                availability_of_ob: e.target.value === "" ? false : true,
              });
            }}
            defaultValue={item?.availability_of_ob ? "V" : ""}
          />
          <MyInput
            label="Ответ ОБ"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                answer_of_ob: e.target.value === "" ? false : true,
              });
            }}
            defaultValue={item?.answer_of_ob ? "V" : ""}
          />
          <MyInput
            label="Экспедитор"
            onChange={(e) => {
              setSingleItem({ ...singleItem, expeditor: e.target.value });
            }}
            defaultValue={item?.expeditor}
          />
          <MyInput
            label="Станция назначения"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                destination_station: e.target.value,
              });
            }}
            defaultValue={item?.destination_station}
          />
          <MyInput
            label="Км. до станции назначения"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                km_to_dist: parseInt(e.target.value),
              });
            }}
            defaultValue={item?.km_to_dist}
          />
          <MyInput
            label="Ставка"
            onChange={(e) => {
              setSingleItem({ ...singleItem, bid: parseInt(e.target.value) });
            }}
            defaultValue={item?.bid}
          />
          <MyInput
            label="Автовывоз"
            onChange={(e) => {
              setSingleItem({ ...singleItem, pickup: e.target.value });
            }}
            defaultValue={item?.pickup}
          />
          <MyInput
            label="Комментарий"
            onChange={(e) => {
              setSingleItem({ ...singleItem, comment: e.target.value });
            }}
            defaultValue={item?.comment}
          />
          <MyInput
            label="Фрахт"
            onChange={(e) => {
              setSingleItem({ ...singleItem, fraht: e.target.value });
            }}
            defaultValue={item?.fraht}
          />
          <MyInput
            label="Примечание"
            onChange={(e) => {
              setSingleItem({ ...singleItem, note: e.target.value });
            }}
            defaultValue={item?.note}
          />
        </Form>
      </Modal>
    </>
  );
};
