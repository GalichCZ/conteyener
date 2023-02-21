import React, { ChangeEvent } from "react";
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
          onChange={(e: any) =>
            setChannel({ ...channel, name: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="ETA">
        <InputNumber
          defaultValue={0}
          onChange={(value) => setChannel({ ...channel, eta: value })}
        />
      </Form.Item>
      <Form.Item label="Дата ДО">
        <InputNumber
          defaultValue={0}
          onChange={(value) => setChannel({ ...channel, date_do: value })}
        />
      </Form.Item>
      <Form.Item label="Дата выпуска декларации">
        <InputNumber
          defaultValue={0}
          onChange={(value) =>
            setChannel({ ...channel, declaration_issue_date: value })
          }
        />
      </Form.Item>
      <Form.Item label="Дата отправки по жд">
        <InputNumber
          defaultValue={0}
          onChange={(value) =>
            setChannel({ ...channel, train_depart_date: value })
          }
        />
      </Form.Item>
      <Form.Item label="Дата прибытия по ЖД">
        <InputNumber
          defaultValue={0}
          onChange={(value) =>
            setChannel({ ...channel, train_arrive_date: value })
          }
        />
      </Form.Item>
      <Form.Item label="Дата прибытия на склад">
        <InputNumber
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
