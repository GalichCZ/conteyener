import React, { useContext, useEffect, useState } from "react";
import { Modal, Form } from "antd";
import { FormulaDateUpdate } from "../../../Types/Types";
import { TechStore } from "../../../Modules/TechStore/Functions/techStoreFuncs";
import { Item } from "../Functions/itemFuncs";
import ReDrawContext from "../../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setOpenFormula } from "../../../store/slices/tableFormulaDateSlice";
import { DatePickerUpdate } from "../../../components/DatePickerUpdate";
const TechStoreFuncs = new TechStore();
const ItemFuncs = new Item();

export const TableFormulaDate = ({}) => {
  const reDraw = useContext(ReDrawContext);

  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.tableFormulaDate.open);
  const techStore = useAppSelector((state) => state.tableFormulaDate.techStore);
  const _id = useAppSelector((state) => state.tableFormulaDate._id);
  const dateType = useAppSelector((state) => state.tableFormulaDate.dateType);
  const value = useAppSelector((state) => state.tableFormulaDate.value);

  const [err, setErr] = useState<string>("");
  const [data, setData] = useState<FormulaDateUpdate>({
    _id: "",
    delivery_time: 0,
  });

  const handleOk = async () => {
    getOneTechStore(techStore);
    // if (data.delivery_time !== 0) updateFormulaDate();
  };

  const handleCancel = () => {
    dispatch(setOpenFormula());
  };

  const updateFormulaDate = async () => {
    const response = await ItemFuncs.updateFormulaDates(data);
    console.log(response);
    if (response === 200) {
      setData({ _id: "", delivery_time: 0 });
      dispatch(setOpenFormula());
    }
    reDraw.reDrawHandler(true);
  };

  const getOneTechStore = async (_id: string) => {
    const response = await TechStoreFuncs.getOneTechStore(_id);
    if ("error" in response) setErr(response.error);
    else {
      setData({ ...data, delivery_time: response.delivery_time });
    }
  };

  useEffect(() => {
    if (data.delivery_time !== 0) updateFormulaDate();
  }, [data]);

  useEffect(() => {
    if (open) {
      setData({ ...data, _id });
    }
  }, [open]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Modal
      title="Изменение даты"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {dateType === 1 && (
        <DatePickerUpdate
          value={value.substring(0, 10)}
          label="ETA"
          onChange={(e) => {
            setData({ ...data, eta: e.target.value, eta_update: true });
          }}
        />
      )}
      {dateType === 2 && (
        <DatePickerUpdate
          value={value.substring(0, 10)}
          label="Дата ДО"
          onChange={(e) => {
            setData({ ...data, date_do: e.target.value, date_do_update: true });
          }}
        />
      )}
      {dateType === 3 && (
        <DatePickerUpdate
          value={value.substring(0, 10)}
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
          value={value.substring(0, 10)}
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
      {dateType === 5 && (
        <DatePickerUpdate
          value={value.substring(0, 10)}
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
