import { Form, Select } from "antd";
import React, { useState } from "react";
import { getChannels } from "../Modules/DeliveryChannel/Functions/ChannelsApi";
import { IChannelObject } from "../Types/Types";

interface ISelectChannel {
  className?: string;
  onChange: (value: string) => void;
  value?: string;
}

export const SelectChannel: React.FC<ISelectChannel> = ({
  className,
  onChange,
  value,
}) => {
  const [channels, setChannels] = useState<IChannelObject[]>();

  const getChannelHandler = async () => {
    const response = await getChannels();
    console.log(response);
    if (response) setChannels(response);
  };

  return (
    <Form.Item className={className} name="select_delivery">
      <Select
        value={value}
        onChange={onChange}
        options={channels?.map((channel) => {
          return { value: channel._id, label: channel.name };
        })}
      />
    </Form.Item>
  );
};
