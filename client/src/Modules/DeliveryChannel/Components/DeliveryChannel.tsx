import React, { useEffect, useState } from "react";
import { IChannelObject } from "../../../Types/Types";
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

  return (
    <div>
      <div></div>
      <Channels />
    </div>
  );
};
