import React, { useEffect, useState } from "react";
import { Modal, Form } from "antd";
import { DatePickerUpdate } from "../TableUI/DatePickerUpdate";
import { FormulaDateUpdate } from "../../../Types/Types";

interface TableFormulaDateProps {
  opened: boolean;
  setOpen: (c: boolean) => void;
  _id: string;
  dateType: number;
  defaultValue: string;
}

export const TableFormulaDate: React.FC<TableFormulaDateProps> = ({
  opened,
  setOpen,
  _id,
  dateType,
  defaultValue,
}) => {
  const [data, setData] = useState<FormulaDateUpdate>({ _id: "" });

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (opened) setData({ ...data, _id: _id });
  }, [opened]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Modal
      title="Изменение даты"
      open={opened}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {dateType === 1 && (
        <DatePickerUpdate
          defaultValue={defaultValue.substring(0, 10)}
          label="ETA"
          onChange={(e) => {
            setData({ ...data, eta: e.target.value, eta_update: true });
          }}
        />
      )}
      {dateType === 2 && (
        <DatePickerUpdate
          defaultValue={defaultValue.substring(0, 10)}
          label="Дата ДО"
          onChange={(e) => {
            setData({ ...data, date_do: e.target.value, date_do_update: true });
          }}
        />
      )}
      {dateType === 3 && (
        <DatePickerUpdate
          defaultValue={defaultValue.substring(0, 10)}
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
          defaultValue={defaultValue.substring(0, 10)}
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
          defaultValue={defaultValue.substring(0, 10)}
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
