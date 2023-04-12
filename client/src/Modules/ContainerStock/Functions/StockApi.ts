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

export const getOneStockPlaceByName = async (name: string) => {
  const response = await fetch(URL + `/stock/${name}/name`)
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

export const deleteStockPlace = async (_id: string | undefined) => {
  const response = await fetch(URL + `/stock/${_id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response;
};
