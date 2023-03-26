import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, InputNumber } from "antd";
import { MyInput } from "../../../components";
import { IChannelObject } from "../../../Types/Types";
import { updateChannel } from "../Functions/ChannelsApi";
import ReDrawContext from "../../../store/redraw-context";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setOpenUpdateChannel } from "../../../store/slices/updateChannelSlice";

export const ChannelUpdate = () => {
  const dispatch = useAppDispatch();
  const reDraw = useContext(ReDrawContext);
  const open = useAppSelector((state) => state.updateChannel.open);
  const channel = useAppSelector((state) => state.updateChannel.channel);

  const [data, setData] = useState<IChannelObject>({
    name: "",
    eta: 0,
    date_do: 0,
    declaration_issue_date: 0,
    train_depart_date: 0,
    train_arrive_date: 0,
    store_arrive_date: 0,
  });

  const handleOk = () => {
    updateChannelHandler();
    dispatch(setOpenUpdateChannel());
  };

  const handleCancel = () => {
    dispatch(setOpenUpdateChannel());
  };

  const updateChannelHandler = async () => {
    reDraw.reDrawHandler(true);
    const result = await updateChannel(data);
    result && reDraw.reDrawHandler(false);
  };

  useEffect(() => {
    open && setData(channel);
  }, [open]);
  return (
    <Modal onOk={handleOk} onCancel={handleCancel} open={open}>
      <Form layout="vertical" className="delivery-channel_form">
        <MyInput
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          label="Название канала"
        />
        <Form.Item label="ETA">
          <InputNumber
            name="eta"
            value={data.eta}
            defaultValue={0}
            onChange={(value) => setData({ ...data, eta: value })}
          />
        </Form.Item>
        <Form.Item label="Дата ДО">
          <InputNumber
            name="date_do"
            value={data.date_do}
            defaultValue={0}
            onChange={(value) => setData({ ...data, date_do: value })}
          />
        </Form.Item>
        <Form.Item label="Дата выпуска декларации">
          <InputNumber
            name="declaration_issue_date"
            value={data.declaration_issue_date}
            defaultValue={0}
            onChange={(value) =>
              setData({ ...data, declaration_issue_date: value })
            }
          />
        </Form.Item>
        <Form.Item label="Дата отправки по жд">
          <InputNumber
            name="train_depart_date"
            value={data.train_depart_date}
            defaultValue={0}
            onChange={(value) => setData({ ...data, train_depart_date: value })}
          />
        </Form.Item>
        <Form.Item label="Дата прибытия по ЖД">
          <InputNumber
            name="train_arrive_date"
            value={data.train_arrive_date}
            defaultValue={0}
            onChange={(value) => setData({ ...data, train_arrive_date: value })}
          />
        </Form.Item>
        <Form.Item label="Дата прибытия на склад">
          <InputNumber
            name="store_arrive_date"
            value={data.store_arrive_date}
            defaultValue={0}
            onChange={(value) => setData({ ...data, store_arrive_date: value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
