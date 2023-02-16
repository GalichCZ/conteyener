import {
  Comment,
  FormulaDateUpdate,
  IItem,
  INewItem,
  Store,
} from "../../../Types/Types";

const URL = import.meta.env.VITE_API_URL;

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

  async createItem(itemValues: INewItem) {
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

  async updateItem(itemValues: IItem) {
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

  async updateFormulaDates(data: FormulaDateUpdate) {
    const response = await fetch(URL + "/item/date", {
      method: "PATCH",
      body: JSON.stringify(data),
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

export const findItemsBySearch = async (query_string: string) => {
  const response = await fetch(URL + "/item/search", {
    method: "POST",
    body: JSON.stringify({ query_string }),
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
      console.log("Error:", error);
      return error;
    });

  return response;
};
