import React, { useEffect, useState, useContext } from "react";
import { Modal, Form, Input, Button, Switch } from "antd";
import { SingleItem, UpdatedItem } from "../../../Types/Types";
import { Item } from "../../../functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import { SelectDelivery } from "../TableUI/SelectDelivery";
import { TechStoreSelect } from "../TableUI/TechStoreSelect";
import { MyInput } from "../TableUI/MyInput";
import ReDrawContext from "../../../store/redraw-context";
import { DatePickerUpdate } from "../TableUI/DatePickerUpdate";

const ItemFuncs = new Item();

export const TableItemUpdate: React.FC<SingleItem> = ({
  item,
  opened,
  setOpen,
}) => {
  const reDraw = useContext(ReDrawContext);

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
      reDraw.reDrawHandler(true);
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
    if (opened) setSingleItem(item);
  }, [opened]);

  console.log(item?.request_date);

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
        <Button
          className="delete-btn"
          onClick={async () => {
            const response = await ItemFuncs.deleteItem(item._id);
            if (response === 200) {
              setOpen(false);
              reDraw.reDrawHandler(true);
            }
          }}
        >
          Удалить запись
        </Button>
        <Form className="table-form" layout="vertical">
          <DatePickerUpdate
            className="required-form"
            label="Дата заявки"
            defaultValue={item?.request_date?.substring(0, 10)}
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                request_date: new Date(e.target.value),
              });
            }}
          />
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
            defaultValue={item?.container?.container_number}
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
            defaultValue={item?.delivery_method}
            onChange={(value) => {
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
                        item.importers;
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
                        item.importers;
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
            defaultValue={item?.container?.container_type}
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
          <DatePickerUpdate
            label="Дата готовности"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                ready_date: new Date(e.target.value),
              });
            }}
            defaultValue={item?.ready_date?.substring(0, 10)}
          />
          <DatePickerUpdate
            label="Дата загрузки"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                load_date: new Date(e.target.value),
              });
            }}
            defaultValue={item?.load_date?.substring(0, 10)}
          />
          <DatePickerUpdate
            label="ETD"
            onChange={(e) => {
              setSingleItem({ ...singleItem, etd: new Date(e.target.value) });
            }}
            defaultValue={item?.etd?.substring(0, 10)}
          />
          <DatePickerUpdate
            label="Релиз"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                release: new Date(e.target.value),
              });
            }}
            defaultValue={item?.release?.substring(0, 10)}
          />
          <Form.Item label="BL/СМГС/CMR">
            <Switch
              defaultChecked={item?.bl_smgs_cmr ? true : false}
              style={{ minWidth: "45px" }}
              onChange={(e) => {
                setSingleItem({ ...singleItem, bl_smgs_cmr: e.valueOf() });
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
            defaultValue={item?.td ? "V" : ""}
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
          <DatePickerUpdate
            label="Наличие ОБ"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                availability_of_ob: new Date(e.target.value),
              });
            }}
            defaultValue={item?.availability_of_ob?.substring(0, 10)}
          />
          <DatePickerUpdate
            label="Ответ ОБ"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                answer_of_ob: new Date(e.target.value),
              });
            }}
            defaultValue={item?.answer_of_ob?.substring(0, 10)}
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
        </Form>
      </Modal>
    </>
  );
};
