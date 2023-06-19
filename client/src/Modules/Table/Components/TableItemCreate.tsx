import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form, Input, DatePicker, message } from "antd";
import { INewItem } from "../../../Types/Types";
import { Item } from "../Functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import { MyInput, TechStoreSelect } from "../../../components/index";
import { Required } from "../../../UI/index";
import ReDrawContext from "../../../store/redraw-context";
import {
  handleProviderChange,
  handleAddProvider,
  handleDeleteProvider,
  handleAddImporter,
  handleDeleteImporter,
  handleImporterChange,
  handleAddOrder,
  handleDeleteOrder,
  handleOrderChange,
  handleConditionsChange,
  handleDeleteConditions,
  handleAddConditions,
  handleSimpleProductNameChange,
  handleDeleteSimpleProductName,
  handleAddSimpleProductName,
} from "../Functions/MultipleInputHandler";
import { callError } from "../Functions/ErrorHandlers";
import { dropInput } from "../Functions/TableHandlers";
import { checkFilledPoles } from "../Functions/TableHandlers";
import { DeliveryMethodSelect } from "../../../components/DeliveryMethodSelect";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { setOpenItemCreate } from "../../../store/slices/tableItemCreateSlice";

const ItemFuncs = new Item();

export const TableItemCreate: React.FC = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const reDrawCtx = useContext(ReDrawContext);
  const [form] = Form.useForm();
  // const [open, setOpen] = useState(false);
  const [filled, setFilled] = useState(false);
  const [item, setItem] = useState<INewItem>({
    agent: "",
    conditions: [],
    container_type: "",
    delivery_method: "",
    importers: [],
    order_number: [],
    place_of_dispatch: "",
    providers: [],
    request_date: "",
    simple_product_name: [],
    store_name: "",
    store: "",
    direction: "",
  });
  const open = useAppSelector((state) => state.tableItemCreate.open);
  const dispatch = useAppDispatch();

  const handleOk = async () => {
    if (filled) {
      reDrawCtx.reDrawHandler(true);
      setConfirmLoading(true);
      const response: any = await ItemFuncs.createItem(item);
      if (!response.ok) {
        setConfirmLoading(false);
        callError(messageApi, "Ошибка при создании записи");
        reDrawCtx.reDrawHandler(false);
      } else {
        form.resetFields();
        dropInput(setItem);
        setConfirmLoading(false);
        reDrawCtx.reDrawHandler(false);
        dispatch(setOpenItemCreate());
      }
    } else callError(messageApi, "Fill the all poles !");
  };

  const handleCancel = () => {
    dispatch(setOpenItemCreate());
  };

  useEffect(() => {
    checkFilledPoles(item, setFilled);
  }, [item]);

  return (
    <>
      {contextHolder}
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
          <Form
            form={form}
            id="form-create"
            className="table-form"
            layout="vertical"
          >
            <Form.Item
              name="name"
              className="required-form"
              label="Дата заявки"
            >
              <DatePicker
                format="DD/MM/YYYY"
                onChange={(date, dateString) => {
                  setItem({
                    ...item,
                    request_date: date?.toISOString(),
                  });
                }}
                placeholder="Дата заявки"
              />
            </Form.Item>
            <Form.Item
              name="name2"
              className="required-form"
              label="Номер заказа"
            >
              <>
                {item.order_number.map((order, index) => {
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      <Input
                        placeholder="Номер заказа"
                        id={order}
                        value={order}
                        onChange={(event) =>
                          handleOrderChange(
                            index,
                            event,
                            undefined,
                            item,
                            undefined,
                            setItem
                          )
                        }
                      />
                      <CloseOutlined
                        onClick={() => {
                          handleDeleteOrder(
                            index,
                            undefined,
                            undefined,
                            item,
                            setItem
                          );
                        }}
                      />
                    </div>
                  );
                })}
                <Button onClick={() => handleAddOrder(item, setItem)}>
                  Добавить поле
                </Button>
              </>
            </Form.Item>
            <Form.Item name="name3" className="required-form" label="Товар">
              <>
                {item.simple_product_name.map((simpleName, index) => {
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      <Input
                        placeholder="Товар"
                        id={simpleName}
                        value={simpleName}
                        onChange={(event) =>
                          handleSimpleProductNameChange(
                            index,
                            event,
                            undefined,
                            item,
                            undefined,
                            setItem
                          )
                        }
                      />
                      <CloseOutlined
                        onClick={() => {
                          handleDeleteSimpleProductName(
                            index,
                            undefined,
                            undefined,
                            item,
                            setItem
                          );
                        }}
                      />
                    </div>
                  );
                })}
                <Button
                  onClick={() => handleAddSimpleProductName(item, setItem)}
                >
                  Добавить поле
                </Button>
              </>
            </Form.Item>
            <DeliveryMethodSelect
              className="required-form"
              value={item.delivery_method}
              onChange={(value) => setItem({ ...item, delivery_method: value })}
            />
            <Form.Item name="name5" className="required-form" label="Поставщик">
              <>
                {item.providers.map((provider, index) => {
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      <Input
                        placeholder="Поставщик"
                        id={provider}
                        value={provider}
                        onChange={(event) =>
                          handleProviderChange(
                            index,
                            event,
                            undefined,
                            undefined,
                            item,
                            setItem
                          )
                        }
                      />
                      <CloseOutlined
                        onClick={() => {
                          handleDeleteProvider(index, item, setItem);
                        }}
                      />
                    </div>
                  );
                })}
                <Button onClick={() => handleAddProvider(item, setItem)}>
                  Добавить поле
                </Button>
              </>
            </Form.Item>
            <Form.Item name="name6" className="required-form" label="Импортер">
              <>
                {item.importers.map((importer, index) => {
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      <Input
                        placeholder="Импортер"
                        id={importer}
                        value={importer}
                        onChange={(event) =>
                          handleImporterChange(
                            index,
                            event,
                            item,
                            setItem,
                            undefined,
                            undefined
                          )
                        }
                      />
                      <CloseOutlined
                        onClick={() => {
                          handleDeleteImporter(index, item, setItem);
                        }}
                      />
                    </div>
                  );
                })}
                <Button onClick={() => handleAddImporter(item, setItem)}>
                  Добавить поле
                </Button>
              </>
            </Form.Item>
            <Form.Item
              name="name2"
              className="required-form"
              label="Условия поставки"
            >
              <>
                {item.conditions.map((condition, index) => {
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      <Input
                        placeholder="Номер заказа"
                        id={condition}
                        value={condition}
                        onChange={(event) =>
                          handleConditionsChange(
                            index,
                            event,
                            undefined,
                            item,
                            undefined,
                            setItem
                          )
                        }
                      />
                      <CloseOutlined
                        onClick={() => {
                          handleDeleteConditions(
                            index,
                            undefined,
                            undefined,
                            item,
                            setItem
                          );
                        }}
                      />
                    </div>
                  );
                })}
                <Button onClick={() => handleAddConditions(item, setItem)}>
                  Добавить поле
                </Button>
              </>
            </Form.Item>
            <TechStoreSelect
              name="name8"
              onChange={(value) => {
                setItem({ ...item, store: value });
              }}
              value={item.store}
              opened={open}
              className="required-form"
            />
            <MyInput
              className="required-form"
              label="Направление"
              value={item.direction}
              onChange={(e) => {
                setItem({ ...item, direction: e.target.value });
              }}
            />
            <MyInput
              name="name9"
              className="required-form"
              label="Агент"
              value={item.agent}
              onChange={(e) => {
                setItem({ ...item, agent: e.target.value });
              }}
            />
            <MyInput
              name="name10"
              className="required-form"
              label="Тип контейнера"
              value={item.container_type}
              onChange={(e) => {
                setItem({ ...item, container_type: e.target.value });
              }}
            />
            <MyInput
              name="name11"
              value={item.place_of_dispatch}
              className="required-form"
              label="Место отправки"
              onChange={(e) => {
                setItem({ ...item, place_of_dispatch: e.target.value });
              }}
            />
          </Form>
        </div>
        <Required />
      </Modal>
    </>
  );
};
