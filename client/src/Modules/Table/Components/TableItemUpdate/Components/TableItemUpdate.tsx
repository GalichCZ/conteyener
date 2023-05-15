import { useEffect, useState, useContext } from "react";
import { Modal, Form, Input, Button, Switch, message, DatePicker } from "antd";
import { IItem } from "../../../../../Types/Types";
import { Item, updateItem } from "../../../Functions/itemFuncs";
import { CloseOutlined } from "@ant-design/icons";
import ReDrawContext from "../../../../../store/redraw-context";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/hooksRedux";
import { setOpenItemUpdate } from "../../../../../store/slices/tableItemUpdateSlice";
import { MyInput, TechStoreSelect } from "../../../../../components";
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
  handleInsideNumberChange,
  handleDeleteInsideNumber,
  handleAddInsideNumber,
  handleProformNumberChange,
  handleDeleteProformNumber,
  handleAddProformNumber,
  handleConditionsChange,
  handleDeleteConditions,
  handleAddConditions,
  handleSimpleProductNameChange,
  handleDeleteSimpleProductName,
  handleAddSimpleProductName,
} from "../../../Functions/MultipleInputHandler";
import { checkDuplicate } from "../Functions/DuplicateHandler";
import { callError } from "../../../Functions/ErrorHandlers";
import { resetInputs } from "../Functions/ResetInputs";
import { hideItem } from "../../../Functions/itemFuncs";
import StockPlaceSelect from "../../../../../components/StockPlaceSelect";
import moment from "moment";
import { DeliveryMethodSelect } from "../../../../../components/DeliveryMethodSelect";

const ItemFuncs = new Item();

export const TableItemUpdate = ({}) => {
  const reDraw = useContext(ReDrawContext);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.tableItemUpdate.item);
  const open = useAppSelector((state) => state.tableItemUpdate.open);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [singleItem, setSingleItem] = useState<IItem>({
    _id: "",
    request_date: "",
    inside_number: [],
    proform_number: [],
    order_number: [],
    container_number: "",
    container_type: "",
    simple_product_name: [],
    delivery_method: "",
    providers: [],
    importers: [],
    conditions: [],
    store: "",
    agent: "",
    store_name: "",
    delivery_channel: "",
    place_of_dispatch: "",
    arrive_place: "",
    line: "",
    ready_date: null,
    load_date: null,
    etd: null,
    eta: "",
    release: null,
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
    availability_of_ob: null,
    answer_of_ob: null,
    expeditor: "",
    destination_station: "",
    km_to_dist: null,
    train_arrive_date: "",
    bid: 0,
    pickup: "",
    store_arrive_date: "",
    comment: "",
    note: "",
    stock_place: "",
    stock_place_name: "",
    fraht: "",
    hidden: false,
    direction: "",
  });

  const handleOk = async () => {
    const duplicatesOrders = checkDuplicate(singleItem, "order_number");
    const duplicatesDeclarations = checkDuplicate(
      singleItem,
      "declaration_number"
    );
    const duplicatesProform = checkDuplicate(singleItem, "proform_number");
    console.log(duplicatesProform);
    const duplicatesInside = checkDuplicate(singleItem, "declaration_number");
    reDraw.reDrawHandler(true);
    if (
      duplicatesOrders.success &&
      duplicatesDeclarations.success &&
      duplicatesProform.success &&
      duplicatesInside.success
    ) {
      setConfirmLoading(true);
      const response = await updateItem(singleItem);
      if (response.error) {
        setConfirmLoading(false);
        return callError(messageApi, response.error);
      }
      if (response.success) {
        resetInputs(setSingleItem);
        setConfirmLoading(false);
        dispatch(setOpenItemUpdate());
        reDraw.reDrawHandler(false);
      }
    } else {
      duplicatesOrders.duplicates &&
        callError(
          messageApi,
          `Повторяющийся № заказа: ${duplicatesOrders.duplicates}`
        );
      duplicatesDeclarations.duplicates &&
        callError(
          messageApi,
          `Повторяющийся № декларации: ${duplicatesDeclarations.duplicates}`
        );
      duplicatesInside.duplicates &&
        callError(
          messageApi,
          `Повторяющийся внутренний №: ${duplicatesInside.duplicates}`
        );
      duplicatesProform.duplicates &&
        callError(
          messageApi,
          `Повторяющийся № проформы: ${duplicatesProform.duplicates}`
        );
    }
  };

  const handleCancel = () => {
    dispatch(setOpenItemUpdate());
  };

  async function deleteItem() {
    reDraw.reDrawHandler(true);
    const response = item && (await ItemFuncs.deleteItem(item._id));
    if (response === 200) {
      reDraw.reDrawHandler(false);
      dispatch(setOpenItemUpdate());
    }
  }

  async function hideItemHandler() {
    reDraw.reDrawHandler(true);
    const response = item && (await hideItem(item._id, !item.hidden));
    if (response) {
      reDraw.reDrawHandler(false);
      dispatch(setOpenItemUpdate());
    }
  }

  useEffect(() => {
    if (open && item !== null) setSingleItem({ ...item });
  }, [open]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Редактирование записи"
        open={open}
        onOk={async () => {
          await handleOk();
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Button className="delete-btn" onClick={deleteItem}>
          Удалить запись
        </Button>
        <Button className="hide-btn" onClick={hideItemHandler}>
          Скрыть запись
        </Button>
        <Form className="table-form" layout="vertical">
          <Form.Item label="Дата заявки">
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(date, dateString) => {
                setSingleItem({
                  ...singleItem,
                  request_date: date?.toISOString(),
                });
              }}
              value={
                singleItem.request_date === null
                  ? null
                  : moment(singleItem.request_date)
              }
            />
          </Form.Item>
          <DeliveryMethodSelect
            className="required-form"
            value={singleItem.delivery_method}
            onChange={(value) =>
              setSingleItem({ ...singleItem, delivery_method: value })
            }
          />
          <Form.Item label="Внутренний номер">
            <>
              {singleItem.inside_number.map((num, index) => {
                return (
                  <div key={index} style={{ display: "flex" }}>
                    <Input
                      placeholder="Внутренний номер"
                      id={num}
                      value={num}
                      onChange={(event) =>
                        handleInsideNumberChange(
                          index,
                          event,
                          singleItem,
                          setSingleItem
                        )
                      }
                    />
                    <CloseOutlined
                      onClick={() => {
                        handleDeleteInsideNumber(
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
                onClick={() => {
                  handleAddInsideNumber(singleItem, setSingleItem);
                }}
              >
                Добавить поле
              </Button>
            </>
          </Form.Item>
          <Form.Item label="Номер проформы">
            <>
              {singleItem.proform_number.map((num, index) => {
                return (
                  <div key={index} style={{ display: "flex" }}>
                    <Input
                      placeholder="Номер проформы"
                      id={num}
                      value={num}
                      onChange={(event) =>
                        handleProformNumberChange(
                          index,
                          event,
                          singleItem,
                          setSingleItem
                        )
                      }
                    />
                    <CloseOutlined
                      onClick={() => {
                        handleDeleteProformNumber(
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
                onClick={() => {
                  handleAddProformNumber(singleItem, setSingleItem);
                }}
              >
                Добавить поле
              </Button>
            </>
          </Form.Item>
          <Form.Item className="required-form" label="№ заказа">
            <>
              {singleItem.order_number.map((order, index) => {
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
                          singleItem,
                          undefined,
                          setSingleItem,
                          undefined
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
              <Button
                onClick={() =>
                  handleAddOrder(
                    undefined,
                    undefined,
                    singleItem,
                    setSingleItem
                  )
                }
              >
                Добавить поле
              </Button>
            </>
          </Form.Item>
          <MyInput
            label="Номер контейнера"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({
                ...singleItem,
                container_number: e.target.value,
              });
            }}
            value={
              singleItem?.container_number
                ? singleItem?.container_number
                : singleItem.container?.container_number
            }
          />
          <Form.Item name="name3" className="required-form" label="Товар">
            <>
              {singleItem.simple_product_name.map((simpleName, index) => {
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
                          singleItem,
                          undefined,
                          setSingleItem,
                          undefined
                        )
                      }
                    />
                    <CloseOutlined
                      onClick={() => {
                        handleDeleteSimpleProductName(
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
                  handleAddSimpleProductName(
                    undefined,
                    undefined,
                    singleItem,
                    setSingleItem
                  )
                }
              >
                Добавить поле
              </Button>
            </>
          </Form.Item>
          <Form.Item className="required-form" label="Поставщик">
            {singleItem.providers.map((provider, index) => {
              return (
                <div key={index} style={{ display: "flex" }}>
                  <Input
                    placeholder="Номер заказа"
                    id={provider}
                    value={provider}
                    onChange={(event) =>
                      handleProviderChange(
                        index,
                        event,
                        singleItem,
                        setSingleItem,
                        undefined,
                        undefined
                      )
                    }
                  />
                  <CloseOutlined
                    onClick={() => {
                      handleDeleteProvider(
                        index,
                        undefined,
                        undefined,
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
                handleAddProvider(
                  undefined,
                  undefined,
                  singleItem,
                  setSingleItem
                )
              }
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
                    id={importer}
                    value={importer}
                    onChange={(event) =>
                      handleImporterChange(
                        index,
                        event,
                        undefined,
                        undefined,
                        singleItem,
                        setSingleItem
                      )
                    }
                  />
                  <CloseOutlined
                    onClick={() => {
                      handleDeleteImporter(
                        index,
                        undefined,
                        undefined,
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
                handleAddImporter(
                  undefined,
                  undefined,
                  singleItem,
                  setSingleItem
                )
              }
            >
              Добавить поле
            </Button>
          </Form.Item>
          <Form.Item className="required-form" label="Условия поставки">
            <>
              {singleItem.conditions.map((condition, index) => {
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
                          singleItem,
                          undefined,
                          setSingleItem,
                          undefined
                        )
                      }
                    />
                    <CloseOutlined
                      onClick={() => {
                        handleDeleteConditions(
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
                  handleAddConditions(
                    undefined,
                    undefined,
                    singleItem,
                    setSingleItem
                  )
                }
              >
                Добавить поле
              </Button>
            </>
          </Form.Item>
          <MyInput
            className="required-form"
            label="Направление"
            value={singleItem.direction}
            onChange={(e) => {
              setSingleItem({ ...singleItem, direction: e.target.value });
            }}
          />
          <TechStoreSelect
            onChange={(value: string) => {
              setSingleItem({ ...singleItem, store: value });
            }}
            value={singleItem?.store}
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
                container_type: e.target.value,
              });
            }}
            value={
              singleItem?.container_type
                ? singleItem?.container_type
                : singleItem.container?.container_type
            }
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
          <Form.Item label="Дата готовности">
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(date, dateString) => {
                setSingleItem({
                  ...singleItem,
                  ready_date: date?.toISOString(),
                });
              }}
              value={
                singleItem.ready_date === null
                  ? null
                  : moment(singleItem.ready_date)
              }
            />
          </Form.Item>
          <Form.Item label="Дата загрузки">
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(date, dateString) => {
                setSingleItem({
                  ...singleItem,
                  load_date: date?.toISOString(),
                });
              }}
              value={
                singleItem.load_date === null
                  ? null
                  : moment(singleItem.load_date)
              }
            />
          </Form.Item>
          <Form.Item label="Релиз">
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(date, dateString) => {
                setSingleItem({
                  ...singleItem,
                  release: date?.toISOString(),
                });
              }}
              value={
                singleItem.release === null ? null : moment(singleItem.release)
              }
            />
          </Form.Item>
          <Form.Item label="BL/СМГС/CMR">
            <Switch
              checked={singleItem?.bl_smgs_cmr}
              style={{ minWidth: "45px" }}
              onChange={(e) => {
                setSingleItem({ ...singleItem, bl_smgs_cmr: e.valueOf() });
              }}
            />
          </Form.Item>
          <Form.Item label="ТД">
            <Switch
              checked={singleItem?.td}
              style={{ minWidth: "45px" }}
              onChange={(e) => {
                setSingleItem({ ...singleItem, td: e.valueOf() });
              }}
            />
          </Form.Item>
          <MyInput
            label="Порт"
            onChange={(e: { target: HTMLInputElement }) => {
              setSingleItem({ ...singleItem, port: e.target.value });
            }}
            value={singleItem?.port}
          />
          <Form.Item label="ДС для подачи">
            <Switch
              checked={singleItem?.is_ds}
              style={{ minWidth: "45px" }}
              onChange={(e) => {
                setSingleItem({ ...singleItem, is_ds: e.valueOf() });
              }}
            />
          </Form.Item>
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
          <Form.Item label="Наличие ОБ">
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(date, dateString) => {
                setSingleItem({
                  ...singleItem,
                  availability_of_ob: date?.toISOString(),
                });
              }}
              value={
                singleItem.availability_of_ob === null
                  ? null
                  : moment(singleItem.availability_of_ob)
              }
            />
          </Form.Item>
          <Form.Item label="Ответ ОБ">
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(date, dateString) => {
                setSingleItem({
                  ...singleItem,
                  answer_of_ob: date?.toISOString(),
                });
              }}
              value={
                singleItem.answer_of_ob === null
                  ? null
                  : moment(singleItem.answer_of_ob)
              }
            />
          </Form.Item>
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
          <StockPlaceSelect
            opened={open}
            value={singleItem?.stock_place}
            onChange={(value) =>
              setSingleItem({ ...singleItem, stock_place: value })
            }
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
