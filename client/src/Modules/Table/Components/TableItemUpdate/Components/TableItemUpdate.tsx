import React, { useEffect, useState, useContext } from "react";
import { Modal, Form, Input, Button, Switch } from "antd";
import { IItem } from "../../../../../Types/Types";
import { Item } from "../../../Functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import ReDrawContext from "../../../../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import { setOpenItemUpdate } from "../../../../../store/slices/tableItemUpdateSlice";
import { DatePickerUpdate } from "../../../../../components/DatePickerUpdate";
import {
  MyInput,
  SelectDelivery,
  TechStoreSelect,
} from "../../../../../components";
import { SelectChannel } from "../../../../../components/SelectChannel";
import {
  handleProviderChange,
  handleAddProvider,
  handleDeleteProvider,
  handleAddDeclarationNumber,
  handleDeclarationNumberChange,
  handleDeleteDeclarationNumber,
  handleAddImporter,
  handleDeleteImporter,
  handleImporterChange,
  handleAddOrder,
  handleDeleteOrder,
  handleOrderChange,
} from "../Functions/MultipleInputHandler";

const ItemFuncs = new Item();

export const TableItemUpdate = ({}) => {
  const reDraw = useContext(ReDrawContext);

  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.tableItemUpdate.item);
  const open = useAppSelector((state) => state.tableItemUpdate.open);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [err, setErr] = useState<string | null>();
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
    delivery_channel: "",
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
    declaration_number: [],
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

  function checkDuplicate() {
    let duplicates: any[] = [];

    // singleItem.order_number.forEach((order, index) => {
    //   if (
    //     singleItem.order_number.indexOf(order.number, index + 1) !== -1 &&
    //     duplicates.indexOf(order) === -1
    //   ) {
    //     duplicates.push(order);
    //   }
    // });
  }

  useEffect(() => {
    console.log(singleItem);
  }, [singleItem]);

  useEffect(() => {
    if (open && item !== null) setSingleItem({ ...item });
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
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                request_date: new Date(e.target.value),
              });
            }}
          />
          <Form.Item className="required-form" label="№ заказа">
            <>
              {singleItem.order_number.map((order, index) => {
                return (
                  <div key={index} style={{ display: "flex" }}>
                    <Input
                      placeholder="Номер заказа"
                      id={order._id}
                      value={order.number}
                      onChange={(event) =>
                        handleOrderChange(
                          index,
                          event,
                          singleItem,
                          setSingleItem
                        )
                      }
                    />
                    <CloseOutlined
                      onClick={() => {
                        handleDeleteOrder(index, singleItem, setSingleItem);
                      }}
                    />
                  </div>
                );
              })}
              <Button onClick={() => handleAddOrder(singleItem, setSingleItem)}>
                Добавить поле
              </Button>
            </>
          </Form.Item>
          <MyInput
            label="Номер контейнера"
            onChange={(e: { target: HTMLInputElement }) => {
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
          <SelectChannel
            value={singleItem.delivery_channel}
            onChange={(value: string) => {
              setSingleItem({ ...singleItem, delivery_channel: value });
            }}
          />
          <MyInput
            label="Товар"
            className="required-form"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                simple_product_name: e.target.value,
              });
            }}
            value={singleItem?.simple_product_name}
          />
          <SelectDelivery
            value={singleItem?.delivery_method}
            onChange={(value: string) => {
              setSingleItem({ ...singleItem, delivery_method: value });
            }}
          />
          <Form.Item className="required-form" label="Поставщик">
            {singleItem.providers.map((provider, index) => {
              return (
                <div key={index} style={{ display: "flex" }}>
                  <Input
                    placeholder="Номер заказа"
                    id={provider._id}
                    value={provider.name}
                    onChange={(event) =>
                      handleProviderChange(
                        index,
                        event,
                        singleItem,
                        setSingleItem
                      )
                    }
                  />
                  <CloseOutlined
                    onClick={() => {
                      handleDeleteProvider(index, singleItem, setSingleItem);
                    }}
                  />
                </div>
              );
            })}
            <Button
              onClick={() => handleAddProvider(singleItem, setSingleItem)}
            >
              Добавить поле
            </Button>
          </Form.Item>
          <Form.Item className="required-form" label="Импортер">
            {singleItem.importers.map((importer, index) => {
              return (
                <div key={index} style={{ display: "flex" }}>
                  <Input
                    placeholder="Номер заказа"
                    id={importer._id}
                    value={importer.name}
                    onChange={(event) =>
                      handleImporterChange(
                        index,
                        event,
                        singleItem,
                        setSingleItem
                      )
                    }
                  />
                  <CloseOutlined
                    onClick={() => {
                      handleDeleteImporter(index, singleItem, setSingleItem);
                    }}
                  />
                </div>
              );
            })}
            <Button
              onClick={() => handleAddImporter(singleItem, setSingleItem)}
            >
              Добавить поле
            </Button>
          </Form.Item>
          <MyInput
            className="required-form"
            label="Условия поставки"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({ ...singleItem, conditions: e.target.value });
            }}
            value={singleItem?.conditions}
          />
          <TechStoreSelect
            onChange={(value: string) => {
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
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({ ...singleItem, agent: e.target.value });
            }}
            value={singleItem?.agent}
          />
          <MyInput
            label="Тип контейнера"
            onChange={(e: { target: HTMLInputElement }) => {
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
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                place_of_dispatch: e.target.value,
              });
            }}
            value={singleItem?.place_of_dispatch}
          />
          <MyInput
            label="Линия"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({ ...singleItem, line: e.target.value });
            }}
            value={singleItem?.line}
          />
          <DatePickerUpdate
            label="Дата готовности"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                ready_date: e.target.value,
              });
            }}
            value={singleItem?.ready_date}
          />
          <DatePickerUpdate
            label="Дата загрузки"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                load_date: e.target.value,
              });
            }}
            value={singleItem?.load_date}
          />
          <DatePickerUpdate
            label="ETD"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({ ...singleItem, etd: e.target.value });
            }}
            value={singleItem?.etd}
          />
          <DatePickerUpdate
            label="Релиз"
            onChange={(e: { target: HTMLInputElement }) => {
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
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                td: e.target.value === "" ? false : true,
              });
            }}
            value={singleItem?.td ? "V" : ""}
          />
          <MyInput
            label="Порт"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({ ...singleItem, port: e.target.value });
            }}
            value={singleItem?.port}
          />
          <MyInput
            label="ДС для подачи"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                is_ds: e.target.value === "" ? false : true,
              });
            }}
            value={singleItem?.is_ds ? "V" : ""}
          />
          <Form.Item className="required-form" label="№ декларации">
            {singleItem.declaration_number.map((declaration, index) => {
              return (
                <div key={index} style={{ display: "flex" }}>
                  <Input
                    placeholder="№ декларации"
                    id={index.toString()}
                    value={declaration}
                    onChange={(event) =>
                      handleDeclarationNumberChange(
                        index,
                        event,
                        singleItem,
                        setSingleItem
                      )
                    }
                  />
                  <CloseOutlined
                    onClick={() => {
                      handleDeleteDeclarationNumber(
                        index,
                        singleItem,
                        setSingleItem
                      );
                    }}
                  />
                </div>
              );
            })}
            <Button
              onClick={() =>
                handleAddDeclarationNumber(singleItem, setSingleItem)
              }
            >
              Добавить поле
            </Button>
          </Form.Item>
          <DatePickerUpdate
            label="Наличие ОБ"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                availability_of_ob: e.target.value,
              });
            }}
            value={singleItem?.availability_of_ob}
          />
          <DatePickerUpdate
            label="Ответ ОБ"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                answer_of_ob: e.target.value,
              });
            }}
            value={singleItem?.answer_of_ob}
          />
          <MyInput
            label="Экспедитор"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({ ...singleItem, expeditor: e.target.value });
            }}
            value={singleItem?.expeditor}
          />
          <MyInput
            label="Станция назначения"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                destination_station: e.target.value,
              });
            }}
            value={singleItem?.destination_station}
          />
          <MyInput
            label="Км. до станции назначения"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                km_to_dist: parseInt(e.target.value),
              });
            }}
            value={singleItem?.km_to_dist}
          />
          <MyInput
            label="Ставка"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({ ...singleItem, bid: parseInt(e.target.value) });
            }}
            value={singleItem?.bid}
          />
          <MyInput
            label="Автовывоз"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({ ...singleItem, pickup: e.target.value });
            }}
            value={singleItem?.pickup}
          />
        </Form>
      </Modal>
    </>
  );
};
