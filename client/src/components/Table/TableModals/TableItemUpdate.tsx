import React, { useEffect, useState, useContext } from "react";
import { Modal, Form, Input, Button, Switch } from "antd";
import { IItem } from "../../../Types/Types";
import { Item } from "../../../functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import { SelectDelivery } from "../TableUI/SelectDelivery";
import { TechStoreSelect } from "../TableUI/TechStoreSelect";
import { MyInput } from "../TableUI/MyInput";
import ReDrawContext from "../../../store/redraw-context";
import { DatePickerUpdate } from "../TableUI/DatePickerUpdate";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setOpenItemUpdate } from "../../../store/slices/tableItemUpdateSlice";

const ItemFuncs = new Item();

export const TableItemUpdate = ({}) => {
  const reDraw = useContext(ReDrawContext);

  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.tableItemUpdate.item);
  const open = useAppSelector((state) => state.tableItemUpdate.open);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [err, setErr] = useState<string | null>();
  const [inputFields, setInputFields] = useState<any>();
  const [inputFields2, setInputFields2] = useState<any>();
  const [inputFields3, setInputFields3] = useState<any>();
  const [singleItem, setSingleItem] = useState<IItem>({
    _id: "",
    request_date: "",
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
    ready_date: "",
    load_date: "",
    etd: "",
    eta: "",
    release: "",
    bl_smgs_cmr: false,
    td: false,
    date_do: "",
    port: "",
    is_ds: false,
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
    declaration_issue_date: "",
    availability_of_ob: "",
    answer_of_ob: "",
    expeditor: "",
    destination_station: "",
    km_to_dist: 0,
    train_arrive_date: "",
    bid: 0,
    pickup: "",
    store_arrive_date: "",
    comment: "",
    note: "",
    fraht: "",
  });

  useEffect(() => {
    setInputFields(item?.importers);
    setInputFields2(item?.providers);
    setInputFields3(item?.order_number);
    if (item) setSingleItem(item);
  }, [item]);

  useEffect(() => {
    console.log(singleItem);
  }, [singleItem]);

  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await ItemFuncs.updateItem(singleItem);
    if (response.error) setErr(response.error);
    if (response === 200) {
      reDraw.reDrawHandler(true);
      setConfirmLoading(false);
      dispatch(setOpenItemUpdate());
    }
  };

  const handleCancel = () => {
    dispatch(setOpenItemUpdate());
  };

  const importerHandler = (importer: string) => {
    if (importer !== "") singleItem?.importers?.push({ name: importer });
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
    if (provider !== "") singleItem?.providers?.push({ name: provider });
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
    if (order !== "") singleItem.order_number?.push({ number: order });
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
    if (open && item !== null) setSingleItem(item);
  }, [open]);

  return (
    <>
      <Modal
        title="Редактирование записи"
        open={open}
        onOk={async () => {
          await handleOk();
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Button
          className="delete-btn"
          onClick={async () => {
            if (item) {
              const response = await ItemFuncs.deleteItem(item._id);
              if (response === 200) {
                reDraw.reDrawHandler(true);
                dispatch(setOpenItemUpdate());
              }
            }
          }}
        >
          Удалить запись
        </Button>
        <Form className="table-form" layout="vertical">
          <DatePickerUpdate
            className="required-form"
            label="Дата заявки"
            value={singleItem?.request_date?.toString().substring(0, 10)}
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
                  <div key={key}>
                    <div key={key} style={{ display: "flex" }}>
                      <Input
                        placeholder="Номер заказа"
                        id={input.id}
                        value={input.number}
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
            value={singleItem?.container?.container_number}
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
            value={singleItem?.simple_product_name}
          />
          <SelectDelivery
            value={singleItem?.delivery_method}
            onChange={(value) => {
              setSingleItem({ ...singleItem, delivery_method: value });
            }}
          />
          <Form.Item className="required-form" label="Поставщик">
            {inputFields2?.map(
              (input: { id: string; name: string }, key: number) => {
                return (
                  <div key={key}>
                    <div style={{ display: "flex" }}>
                      <Input
                        placeholder="Поставщик"
                        id={input.id}
                        value={input.name}
                        onBlur={(e) => {
                          providerHandler(e.target.value);
                          item?.importers;
                        }}
                      />
                      <CloseOutlined
                        onClick={() => {
                          deleteProvider(input.name);
                        }}
                      />
                    </div>
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
                  <div key={key}>
                    <div style={{ display: "flex" }}>
                      <Input
                        placeholder="Импортер"
                        id={input.id}
                        value={input.name}
                        onBlur={(e) => {
                          importerHandler(e.target.value);
                          item?.importers;
                        }}
                      />
                      <CloseOutlined
                        onClick={() => {
                          deleteImporter(input.name);
                        }}
                      />
                    </div>
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
            value={singleItem?.conditions}
          />
          <TechStoreSelect
            onChange={(value) => {
              console.log(singleItem.store_name);
              console.log(singleItem.tech_store);
              setSingleItem({ ...singleItem, tech_store: value });
            }}
            value={singleItem?.store_name}
            opened={open}
            className="required-form"
          />
          <MyInput
            className="required-form"
            label="Агент"
            onChange={(e) => {
              setSingleItem({ ...singleItem, agent: e.target.value });
            }}
            value={singleItem?.agent}
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
            value={singleItem?.container?.container_type}
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
            value={singleItem?.place_of_dispatch}
          />
          <MyInput
            label="Линия"
            onChange={(e) => {
              setSingleItem({ ...singleItem, line: e.target.value });
            }}
            value={singleItem?.line}
          />
          <DatePickerUpdate
            label="Дата готовности"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                ready_date: e.target.value,
              });
            }}
            value={singleItem?.ready_date}
          />
          <DatePickerUpdate
            label="Дата загрузки"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                load_date: e.target.value,
              });
            }}
            value={singleItem?.load_date}
          />
          <DatePickerUpdate
            label="ETD"
            onChange={(e) => {
              setSingleItem({ ...singleItem, etd: e.target.value });
            }}
            value={singleItem?.etd}
          />
          <DatePickerUpdate
            label="Релиз"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                release: e.target.value,
              });
            }}
            value={singleItem?.release}
          />
          <Form.Item label="BL/СМГС/CMR">
            <Switch
              defaultChecked={singleItem?.bl_smgs_cmr ? true : false}
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
            value={singleItem?.td ? "V" : ""}
          />
          <MyInput
            label="Порт"
            onChange={(e) => {
              setSingleItem({ ...singleItem, port: e.target.value });
            }}
            value={singleItem?.port}
          />
          <MyInput
            label="ДС для подачи"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                is_ds: e.target.value === "" ? false : true,
              });
            }}
            value={singleItem?.is_ds ? "V" : ""}
          />
          <MyInput
            label="№ декларации"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                declaration_number: e.target.value,
              });
            }}
            value={singleItem?.declaration_number}
          />
          <DatePickerUpdate
            label="Наличие ОБ"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                availability_of_ob: e.target.value,
              });
            }}
            value={singleItem?.availability_of_ob}
          />
          <DatePickerUpdate
            label="Ответ ОБ"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                answer_of_ob: e.target.value,
              });
            }}
            value={singleItem?.answer_of_ob}
          />
          <MyInput
            label="Экспедитор"
            onChange={(e) => {
              setSingleItem({ ...singleItem, expeditor: e.target.value });
            }}
            value={singleItem?.expeditor}
          />
          <MyInput
            label="Станция назначения"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                destination_station: e.target.value,
              });
            }}
            value={singleItem?.destination_station}
          />
          <MyInput
            label="Км. до станции назначения"
            onChange={(e) => {
              setSingleItem({
                ...singleItem,
                km_to_dist: parseInt(e.target.value),
              });
            }}
            value={singleItem?.km_to_dist}
          />
          <MyInput
            label="Ставка"
            onChange={(e) => {
              setSingleItem({ ...singleItem, bid: parseInt(e.target.value) });
            }}
            value={singleItem?.bid}
          />
          <MyInput
            label="Автовывоз"
            onChange={(e) => {
              setSingleItem({ ...singleItem, pickup: e.target.value });
            }}
            value={singleItem?.pickup}
          />
        </Form>
      </Modal>
    </>
  );
};
