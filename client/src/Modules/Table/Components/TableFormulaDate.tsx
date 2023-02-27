import { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { FormulaDateUpdate } from "../../../Types/Types";
import { Item } from "../Functions/itemFuncs";
import ReDrawContext from "../../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setOpenFormula } from "../../../store/slices/tableFormulaDateSlice";
import { DatePickerUpdate } from "../../../components/DatePickerUpdate";
import dayjs from "dayjs";
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
    await updateFormulaDate();
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
    console.log(response);
    if (response === 200) {
      dispatch(setOpenFormula());
    }
    reDraw.reDrawHandler(true);
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  function formatDate(date: string | undefined | Date) {
    return dayjs(date).format("YYYY/MM/DD").replace(/\//g, "-");
  }

  return (
    <Modal
      title="Изменение даты"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {dateType === 1 && (
        <DatePickerUpdate
          value={formatDate(data.eta)}
          label="ETA"
          onChange={(e) => {
            setData({ ...data, eta: e.target.value, eta_update: true });
          }}
        />
      )}
      {dateType === 2 && (
        <DatePickerUpdate
          value={formatDate(data.date_do)}
          label="Дата ДО"
          onChange={(e) => {
            setData({ ...data, date_do: e.target.value, date_do_update: true });
          }}
        />
      )}
      {dateType === 3 && (
        <DatePickerUpdate
          value={formatDate(data.declaration_issue_date)}
          label="Дата выпуска декларации"
          onChange={(e) => {
            setData({
              ...data,
              declaration_issue_date: e.target.value,
              declaration_issue_date_update: true,
            });
          }}
        />
      )}
      {dateType === 4 && (
        <DatePickerUpdate
          value={formatDate(data.train_depart_date)}
          label="Дата отправки по ЖД"
          onChange={(e) => {
            setData({
              ...data,
              train_depart_date: e.target.value,
              train_depart_date_update: true,
            });
          }}
        />
      )}
      {dateType === 5 && (
        <DatePickerUpdate
          value={formatDate(data.train_arrive_date)}
          label="Дата прибытия по ЖД"
          onChange={(e) => {
            setData({
              ...data,
              train_arrive_date: e.target.value,
              train_arrive_date_update: true,
            });
          }}
        />
      )}
      {dateType === 6 && (
        <DatePickerUpdate
          value={formatDate(data.store_arrive_date)}
          label="Дата прибытия на склад"
          onChange={(e) => {
            setData({
              ...data,
              store_arrive_date: e.target.value,
              store_arrive_date_update: true,
            });
          }}
        />
      )}
    </Modal>
  );
};
