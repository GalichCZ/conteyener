import { Modal, Form, DatePicker } from "antd";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { SelectChannel } from "../../../components/SelectChannel";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import ReDrawContext from "../../../store/redraw-context";
import { setOpenDateCalc } from "../../../store/slices/tableDateCalcModal";
import { ICalcDate } from "../../../Types/Types";
import { calculateDates } from "../Functions/itemFuncs";

export const TableDateCalc = () => {
  const reDraw = useContext(ReDrawContext);
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.tableDateCalc.open);
  const itemId = useAppSelector((state) => state.tableDateCalc.itemId);
  const date = useAppSelector((state) => state.tableDateCalc.etd);
  const channel = useAppSelector(
    (state) => state.tableDateCalc.delivery_channel
  );

  const [calcDate, setCalcDate] = useState<ICalcDate>({
    etd: null,
    delivery_channel: "",
    itemId: "",
  });

  const handleOk = () => {
    calculateDatesHandle();
    dispatch(setOpenDateCalc());
  };

  const handleCancel = () => {
    dispatch(setOpenDateCalc());
  };

  const calculateDatesHandle = async () => {
    reDraw.reDrawHandler(true);
    const result = await calculateDates(calcDate);
    if (result) reDraw.reDrawHandler(false);
  };

  useEffect(() => {
    if (open)
      setCalcDate({
        ...calcDate,
        etd: date,
        delivery_channel: channel,
        itemId,
      });
  }, [open]);

  return (
    <Modal
      open={open}
      title="Рассчет дат"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label="ETD">
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(date, dateString) => {
              setCalcDate({
                ...calcDate,
                etd: date?.toISOString(),
              });
            }}
            value={calcDate.etd === null ? null : moment(calcDate.etd)}
          />
        </Form.Item>
        <SelectChannel
          value={calcDate.delivery_channel}
          onChange={(e: any) => {
            setCalcDate({
              ...calcDate,
              delivery_channel: e.target.value,
            });
          }}
        />
      </Form>
    </Modal>
  );
};
