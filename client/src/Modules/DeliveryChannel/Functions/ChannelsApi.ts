import { IChannelObject } from "../../../Types/Types";

const URL = import.meta.env.VITE_API_URL;

export const createChannel = async (channel: IChannelObject) => {
  const response = await fetch(URL + "/channel", {
    method: "POST",
    body: JSON.stringify(channel),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response;
};

export const getChannels = async () => {
  const response = await fetch(URL + "/channel")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));

  console.log(response);
  return response;
};
