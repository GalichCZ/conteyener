import { useContext, useEffect, useState } from "react";
import { DatePicker, Form, Modal } from "antd";
import { FormulaDateUpdate } from "../../../Types/Types";
import { Item } from "../Functions/itemFuncs";
import ReDrawContext from "../../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { setOpenFormula } from "../../../store/slices/tableFormulaDateSlice";
import { DatePickerUpdate } from "../../../components/DatePickerUpdate";
import moment from "moment";
const ItemFuncs = new Item();

export const TableFormulaDate = () => {
  const reDraw = useContext(ReDrawContext);

  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.tableFormulaDate.open);
  const _id = useAppSelector((state) => state.tableFormulaDate._id);
  const dateType = useAppSelector((state) => state.tableFormulaDate.dateType);
  const delivery_channel = useAppSelector(
    (state) => state.tableFormulaDate.delivery_channel
  );
  const value = useAppSelector((state) => state.tableFormulaDate.value);

  const [err, setErr] = useState<string>("");
  const [data, setData] = useState<FormulaDateUpdate>({
    _id: "",
    dateType,
    delivery_channel,
  });

  const handleOk = async () => {
    reDraw.reDrawHandler(true);
    await updateFormulaDate();
    setData({
      _id: "",
      dateType: 0,
      delivery_channel: "",
    });
  };

  const handleCancel = () => {
    dispatch(setOpenFormula());
    setData({
      _id: "",
      dateType: 0,
      delivery_channel: "",
    });
  };

  const updateFormulaDate = async () => {
    const response = await ItemFuncs.updateFormulaDates(data);
    if (response === 200) {
      dispatch(setOpenFormula());
      reDraw.reDrawHandler(false);
    }
    reDraw.reDrawHandler(false);
  };

  useEffect(() => {
    if (open) {
      switch (dateType) {
        case 1:
          setData({ ...data, _id, dateType, delivery_channel, eta: value });
          break;
        case 2:
          setData({ ...data, _id, dateType, delivery_channel, date_do: value });
          break;
        case 3:
          setData({
            ...data,
            _id,
            dateType,
            delivery_channel,
            declaration_issue_date: value,
          });
          break;
        case 4:
          setData({
            ...data,
            _id,
            dateType,
            delivery_channel,
            train_depart_date: value,
          });
          break;
        case 5:
          setData({
            ...data,
            _id,
            dateType,
            delivery_channel,
            train_arrive_date: value,
          });
          break;
        case 6:
          setData({
            ...data,
            _id,
            dateType,
            delivery_channel,
            store_arrive_date: value,
          });
          break;
        default:
          break;
      }
    }
  }, [open]);

  return (
    <Modal
      title="Изменение даты"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {dateType === 1 && (
        <Form.Item label="ETA">
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(date, dateString) => {
              setData({
                ...data,
                eta: date?.toISOString(),
              });
            }}
            value={data.eta === null ? null : moment(data.eta)}
          />
        </Form.Item>
      )}
      {dateType === 2 && (
        <Form.Item label="Дата ДО">
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(date, dateString) => {
              setData({
                ...data,
                date_do: date?.toISOString(),
              });
            }}
            value={data.date_do === null ? null : moment(data.date_do)}
          />
        </Form.Item>
      )}
      {dateType === 3 && (
        <Form.Item label="Дата выпуска декларации">
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(date, dateString) => {
              setData({
                ...data,
                declaration_issue_date: date?.toISOString(),
              });
            }}
            value={
              data.declaration_issue_date === null
                ? null
                : moment(data.declaration_issue_date)
            }
          />
        </Form.Item>
      )}
      {dateType === 4 && (
        <Form.Item label="Дата отправки по ЖД">
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(date, dateString) => {
              setData({
                ...data,
                train_depart_date: date?.toISOString(),
              });
            }}
            value={
              data.train_depart_date === null
                ? null
                : moment(data.train_depart_date)
            }
          />
        </Form.Item>
      )}
      {dateType === 5 && (
        <Form.Item label="Дата прибытия по ЖД">
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(date, dateString) => {
              setData({
                ...data,
                train_arrive_date: date?.toISOString(),
              });
            }}
            value={
              data.train_arrive_date === null
                ? null
                : moment(data.train_arrive_date)
            }
          />
        </Form.Item>
      )}
      {dateType === 6 && (
        <Form.Item label="Дата прибытия на склад">
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(date, dateString) => {
              setData({
                ...data,
                store_arrive_date: date?.toISOString(),
              });
            }}
            value={
              data.store_arrive_date === null
                ? null
                : moment(data.store_arrive_date)
            }
          />
        </Form.Item>
      )}
    </Modal>
  );
};
