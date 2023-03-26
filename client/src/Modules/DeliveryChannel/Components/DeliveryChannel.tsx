import React, { useEffect, useState } from "react";
import { IChannelObject } from "../../../Types/Types";
import { createChannel } from "../Functions/ChannelsApi";
import DeliveryChannelForm from "../UI/DeliveryChannelForm";
import { Channels } from "./Channels";

export const DeliveryChannel: React.FC = () => {
  const [channel, setChannel] = useState<IChannelObject>({
    name: "",
    eta: 0,
    date_do: 0,
    declaration_issue_date: 0,
    train_depart_date: 0,
    train_arrive_date: 0,
    store_arrive_date: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const createChannelHandler = async () => {
    setLoading(true);
    const response = await createChannel(channel);
    setChannel({
      name: "",
      eta: 0,
      date_do: 0,
      declaration_issue_date: 0,
      train_depart_date: 0,
      train_arrive_date: 0,
      store_arrive_date: 0,
    });
    if (response) setLoading(false);
  };

  useEffect(() => {
    console.log(channel);
  }, [channel]);

  return (
    <div className="delivery-channel">
      <DeliveryChannelForm
        submit={createChannelHandler}
        setChannel={setChannel}
        channel={channel}
      />
      <Channels loading={loading} />
    </div>
  );
};
