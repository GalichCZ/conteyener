const URL = "http://localhost:4444";

const item = {
  request_date: "2022/12/09",
  invoice_number: "invoiceodf;dfio;afjn;db",
  container_number: "1",
  container_type: "H20",
  providers: [
    { name: "postavshik1" },
    { name: "postavshik2" },
    { name: "postavshik3" },
  ],
  importers: [
    { name: "importer1" },
    { name: "importer2" },
    { name: "importer3" },
  ],
  store_name: "  store",
  store_address: "store address",
  store_contact: "store contact",
  conditions: "good conditions",
  line: "straight line",
  agent: "agent 1",
  fraht: "fraht 1",
  expeditor: "expeditor 1",
  bid: 12341234,
  delivery_method: "train",
  place_of_dispatch: "China",
  arrive_place: "Russia",
  dispatch_date: "2022/12/09",
  arrive_date: "2022/12/11",
  date_do: "2022/12/12",
  is_ds: true,
  is_docs: true,
  declaration_submit_date: "2022/12/13",
  declaration_number: "123qwe456rt143425y",
  declaration_issue_date: "2022/12/14",
  train_dispatch_date: "2022/12/15",
  train_arrive_date: "2022/12/16",
  destination_station: "Petushki",
  km_to_dist: 123,
  store_arrive_date: "2022/12/17",
  note: "intersting note!",
};

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
    console.log(item);
    const response = await fetch(URL + "/item", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return response;
  }
}
