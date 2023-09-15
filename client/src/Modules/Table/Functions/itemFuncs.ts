import {
  FormulaDateUpdate,
  ICalcDate,
  IItem,
  INewItem,
  IsDocsType,
} from "../../../Types/Types";

const URL = import.meta.env.VITE_API_URL;

export class Item {
  async getItems(page: number) {
    const response = await fetch(URL + `/item/${page}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    return response;
  }

  async getHiddenItems(page: number) {
    const response = await fetch(URL + `/item/hidden/${page}`)
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
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Error:", error);
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

export const updateItem = async (itemValues: IItem) => {
  const response = await fetch(URL + "/item", {
    method: "PATCH",
    body: JSON.stringify(itemValues),
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
      return error;
    });
  return response;
};

export const updateItemDistance = async (data: {
  km_to_dist: number | null;
  _id: string;
}) => {
  const response = await fetch(URL + "/item/distance", {
    method: "PATCH",
    body: JSON.stringify(data),
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
      return error;
    });
  return response;
};

export const hideItem = async (_id: string, hidden: boolean) => {
  const response = await fetch(URL + "/item/hide", {
    method: "PATCH",
    body: JSON.stringify({ _id, hidden }),
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
};

export const findItemsBySearch = async (
  query_string: string,
  search_filter: "other" | "products",
  isHidden: boolean
) => {
  const response = await fetch(URL + "/item/search", {
    method: "POST",
    body: JSON.stringify({ query_string, search_filter, isHidden }),
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

export const getItemsFilter = async (
  filter_query: string,
  isHidden: boolean
) => {
  const response = await fetch(URL + `/filter/${isHidden}/${filter_query}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const calculateDates = async (data: ICalcDate) => {
  const response = await fetch(URL + "/item/calculate", {
    method: "PATCH",
    body: JSON.stringify(data),
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
      return error;
    });
  return response;
};

export const updateDocs = async (_id: string, is_docs: IsDocsType) => {
  const response = await fetch(URL + "/item/docs", {
    method: "PATCH",
    body: JSON.stringify({ _id, is_docs }),
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
      return error;
    });
  return response;
};

export const findByKeyValue = async (key: string, value: string) => {
  const response = await fetch(URL + `/item/${key}/${value}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  return response;
};
