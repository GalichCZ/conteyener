import React, { useEffect } from "react";
import { getChannels } from "../Functions/ChannelsApi";

export const Channels = () => {
  useEffect(() => {
    getChannels();
  }, []);

  return <div>Channels</div>;
};
