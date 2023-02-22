import { List } from "antd";
import React, { useEffect, useState } from "react";
import { IChannelObject } from "../../../Types/Types";
import { getChannels } from "../Functions/ChannelsApi";

interface IChannels {
  loading: boolean;
}

export const Channels: React.FC<IChannels> = ({ loading }) => {
  const [channels, setChannels] = useState<IChannelObject[]>();

  const getChannelHandler = async () => {
    const response = await getChannels();
    console.log(response);
    if (response) setChannels(response);
  };

  useEffect(() => {
    if (!loading) getChannelHandler();
  }, [loading]);

  return (
    <List className="channels">
      {channels?.map((channel, key) => {
        return (
          <List.Item key={key}>
            <div className="channel-point">
              <b>Название:</b>
              <b>{channel.name}</b>
            </div>
            <div className="channel-point">
              <p>ETA:</p>
              <p>{channel.eta}</p>
            </div>
            <div className="channel-point">
              <p>Дата ДО:</p>
              <p>{channel.date_do}</p>
            </div>
            <div className="channel-point">
              <p>Дата выпуска декларации:</p>
              <p>{channel.declaration_issue_date}</p>
            </div>
            <div className="channel-point">
              <p>Дата отправки по ЖД:</p>
              <p>{channel.train_depart_date}</p>
            </div>
            <div className="channel-point">
              <p>Дата прибытия по ЖД:</p>
              <p>{channel.train_arrive_date}</p>
            </div>
            <div className="channel-point">
              <p>Дата прибытия на склад:</p>
              <p>{channel.store_arrive_date}</p>
            </div>
          </List.Item>
        );
      })}
    </List>
  );
};
