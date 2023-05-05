import { Form } from "antd";
import React, { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getChannels } from "../Modules/DeliveryChannel/Functions/ChannelsApi";
import { IChannelObject } from "../Types/Types";
import { FormControl, InputLabel } from "@mui/material";

interface ISelectChannel {
  className?: string;
  onChange: (value: any) => void;
  value?: string | null;
}

export const SelectChannel: React.FC<ISelectChannel> = ({
  className,
  onChange,
  value,
}) => {
  const [channels, setChannels] = useState<IChannelObject[]>([
    {
      _id: "",
      name: "",
      eta: 0,
      date_do: 0,
      declaration_issue_date: 0,
      train_arrive_date: 0,
      train_depart_date: 0,
      store_arrive_date: 0,
    },
  ]);

  const getChannelHandler = async () => {
    const response = await getChannels();
    if (response) setChannels([...channels, ...response]);
  };

  useEffect(() => {
    getChannelHandler();
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">
        Канал Поставки
      </InputLabel>
      <Select
        placeholder="Выберете канал поставки"
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">
          <p>Нет</p>
        </MenuItem>
        {channels.map((channel) => {
          return (
            <MenuItem key={channel._id} value={channel._id}>
              {channel.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
    // </Form.Item>
  );
};
