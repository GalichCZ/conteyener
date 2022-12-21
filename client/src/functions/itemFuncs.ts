import { Comment, NewItem, Store, UpdatedItem } from "../Types/Types";

// const URL = "https://api-automycka.space/api";
const URL = "http://localhost:4444/api";

export class Item {
  async getItems() {
    const response = await fetch(URL + "/item")
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    return response;
  }

  async createItem(itemValues: NewItem) {
    const response = await fetch(URL + "/item", {
      method: "POST",
      body: JSON.stringify(itemValues),
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
  }

  async updateItem(itemValues: UpdatedItem) {
    const response = await fetch(URL + "/item", {
      method: "PATCH",
      body: JSON.stringify(itemValues),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.status)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return error;
      });
    return response;
  }

  async updateComment(commentUpdate: Comment) {
    const response = await fetch(URL + "/item/comment", {
      method: "PATCH",
      body: JSON.stringify(commentUpdate),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.status)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return error;
      });
    return response;
  }

  async updateStore(updateStore: Store, itemId: string) {
    const response = await fetch(URL + "/item/store", {
      method: "PATCH",
      body: JSON.stringify({ updateStore, itemId }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.status)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return error;
      });
    return response;
  }

  async deleteItem(_id: string) {
    const response = await fetch(URL + `/item/${_id}`, {
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
