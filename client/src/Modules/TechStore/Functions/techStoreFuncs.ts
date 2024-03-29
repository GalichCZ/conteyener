const URL = import.meta.env.VITE_API_URL;

import { TechStoreData } from "../../../Types/Types";

export class TechStore {
  async createTechStore(techStoreData: TechStoreData) {
    const response = await fetch(URL + "/store/tech/", {
      method: "POST",
      body: JSON.stringify(techStoreData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
  }
  async getOneTechStore(_id?: string) {
    const response = await fetch(URL + `/store/tech/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return response;
  }
  async getTechStore() {
    const response = await fetch(URL + "/store/tech/")
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return response;
  }
  async updateTechStore(techStoreDataUpdate: TechStoreData) {
    const response = await fetch(URL + "/store/tech/", {
      method: "PATCH",
      body: JSON.stringify(techStoreDataUpdate),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
  }
  async deleteTechStore(_id: string | undefined) {
    const response = await fetch(URL + `/store/tech/${_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return response;
  }
}
