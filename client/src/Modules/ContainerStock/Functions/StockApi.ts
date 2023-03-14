import { IStockData } from "../Types";

const URL = import.meta.env.VITE_API_URL;

export const getStockPlaces = async () => {
  const response = await fetch(URL + "/stock")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));

  return response;
};

export const createStockPlace = async (stock: IStockData) => {
  const response = await fetch(URL + "/stock", {
    method: "POST",
    body: JSON.stringify(stock),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response;
};

export const getOneStockPlace = async (_id: string) => {
  const response = await fetch(URL + `/stock/${_id}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));

  return response;
};

export const updateStockPlace = async (stockUpdate: IStockData) => {
  const response = await fetch(URL + "/stock", {
    method: "PATCH",
    body: JSON.stringify(stockUpdate),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response;
};
