import { IItem } from "../../../../../Types/Types";

export const resetInputs = (setSingleItem: (c: IItem) => void): void => {
  setSingleItem({
    _id: "",
    request_date: "",
    order_number: [],
    container: {
      _id: "",
      container_number: "",
      container_type: "",
    },
    simple_product_name: "",
    delivery_method: "",
    providers: [],
    importers: [],
    conditions: "",
    tech_store: "",
    agent: "",
    store_name: "",
    delivery_channel: "",
    container_type: "",
    place_of_dispatch: "",
    arrive_place: "",
    line: "",
    ready_date: null,
    load_date: null,
    etd: null,
    eta: "",
    release: null,
    bl_smgs_cmr: false,
    td: false,
    date_do: "",
    port: "",
    is_ds: false,
    is_docs: {
      PI: false,
      CI: false,
      PL: false,
      SS_DS: false,
      contract_agrees: false,
      cost_agrees: false,
      instruction: false,
      ED: false,
      bill: false,
    },
    declaration_number: [],
    declaration_issue_date: "",
    availability_of_ob: null,
    answer_of_ob: null,
    expeditor: "",
    destination_station: "",
    km_to_dist: 0,
    train_arrive_date: "",
    bid: 0,
    pickup: "",
    store_arrive_date: "",
    comment: "",
    stock_place: "",
    hidden: false,
    note: "",
    fraht: "",
  });
};
