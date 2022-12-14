const URL = "http://localhost:4444/store/tech";

import { TechStoreData } from "../Types/Types";

export class TechStore {
  async createTechStore(techStoreData: TechStoreData) {
    const response = await fetch(URL, {
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
  async getTechStore() {
    const response = await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return response;
  }
  async updateTechStore(techStoreDataUpdate: TechStoreData) {
    const response = await fetch(URL, {
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
    const response = await fetch(URL + `/${_id}`, {
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
