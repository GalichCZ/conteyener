import { Button, List } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import ReDrawContext from "../../../store/redraw-context";
import {
  setChannel,
  setItemId,
  setOpenUpdateChannel,
} from "../../../store/slices/updateChannelSlice";
import { IChannelObject } from "../../../Types/Types";
import { getChannels } from "../Functions/ChannelsApi";

interface IChannels {
  loading: boolean;
}

export const Channels: React.FC<IChannels> = ({ loading }) => {
  const dispatch = useAppDispatch();
  const reDraw = useContext(ReDrawContext);

  const [channels, setChannels] = useState<IChannelObject[]>();

  const getChannelHandler = async () => {
    const response = await getChannels();
    if (response) setChannels(response);
  };

  const modalHandler = (channel: IChannelObject) => {
    dispatch(setOpenUpdateChannel());
    dispatch(setChannel(channel));
    dispatch(setItemId(channel._id));
  };

  useEffect(() => {
    if (!loading) getChannelHandler();
  }, [loading, reDraw.reDraw]);

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
            <Button onClick={() => modalHandler(channel)}>Редактировать</Button>
          </List.Item>
        );
      })}
    </List>
  );
};
