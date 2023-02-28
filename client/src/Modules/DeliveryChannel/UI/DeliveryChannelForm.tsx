import React, { ChangeEvent, useEffect } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { IChannelObject } from "../../../Types/Types";

interface IForm {
  setChannel: (c: IChannelObject) => void;
  channel: IChannelObject;
  submit: () => void;
}

const DeliveryChannelForm: React.FC<IForm> = ({
  setChannel,
  channel,
  submit,
}) => {
  return (
    <Form layout="vertical" className="delivery-channel_form">
      <Form.Item label="Название">
        <Input
          placeholder="Название канала"
          name="Название канала"
          value={channel.name}
          onChange={(e: any) =>
            setChannel({ ...channel, name: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="ETA">
        <InputNumber
          name="eta"
          value={channel.eta}
          defaultValue={0}
          onChange={(value) => setChannel({ ...channel, eta: value })}
        />
      </Form.Item>
      <Form.Item label="Дата ДО">
        <InputNumber
          name="date_do"
          value={channel.date_do}
          defaultValue={0}
          onChange={(value) => setChannel({ ...channel, date_do: value })}
        />
      </Form.Item>
      <Form.Item label="Дата выпуска декларации">
        <InputNumber
          name="declaration_issue_date"
          value={channel.declaration_issue_date}
          defaultValue={0}
          onChange={(value) =>
            setChannel({ ...channel, declaration_issue_date: value })
          }
        />
      </Form.Item>
      <Form.Item label="Дата отправки по жд">
        <InputNumber
          name="train_depart_date"
          value={channel.train_depart_date}
          defaultValue={0}
          onChange={(value) =>
            setChannel({ ...channel, train_depart_date: value })
          }
        />
      </Form.Item>
      <Form.Item label="Дата прибытия по ЖД">
        <InputNumber
          name="train_arrive_date"
          value={channel.train_arrive_date}
          defaultValue={0}
          onChange={(value) =>
            setChannel({ ...channel, train_arrive_date: value })
          }
        />
      </Form.Item>
      <Form.Item label="Дата прибытия на склад">
        <InputNumber
          name="store_arrive_date"
          value={channel.store_arrive_date}
          defaultValue={0}
          onChange={(value) =>
            setChannel({ ...channel, store_arrive_date: value })
          }
        />
      </Form.Item>
      <Button onClick={submit} type="primary">
        Создать
      </Button>
    </Form>
  );
};

export default DeliveryChannelForm;
