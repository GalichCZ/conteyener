const URL = "http://localhost:4444";

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

  async createItem(itemValues: object) {
    const response = await fetch(URL + "/item", {
      method: "POST",
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
      });
    return response;
  }
}
