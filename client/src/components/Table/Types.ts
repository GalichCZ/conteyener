type Container = {
  container_number: string;
  container_type: string;
  _id: string;
};
type Importers = {
  name: string;
  _id: string;
};
type Providers = {
  name: string;
  _id: string;
};
type Store = {
  name: string;
  address: string;
  contact: string;
};
export type TableProps = {
  data:
    | {
        _id: string;
        request_date: string;
        invoice_number: string;
        container: Container;
        importers: Importers[];
        providers: Providers[];
        store: Store;
        conditions: string;
        line: string;
        agent: string;
        fraht: string;
        expeditor: string;
        bid: number;
        delivery_method: string;
        place_of_dispatch: string;
        arrive_place: string;
        arrive_date: string;
        date_do: string;
        is_ds: boolean;
        is_docs: boolean;
        declaration_submit_date: string;
        declaration_number: string;
        declaration_issue_date: string;
        train_dispatch_date: string;
        train_arrive_date: string;
        destination_station: string;
        km_to_dist: number;
        store_arrive_date: string;
        note: string;
      }[]
    | undefined;
};

export type NewItem = {
  request_date: String;
  invoice_number: String;
  container_number: String;
  container_type: String;
  importers: String[] | undefined;
  providers: String[] | undefined;
  store_name: String;
  store_address: String;
  store_contact: String;
  conditions: String;
  line: String;
  agent: String;
  fraht: String;
  expeditor: String;
  bid: String;
  delivery_method: String;
  place_of_dispatch: String;
  arrive_place: String;
  dispatch_date: String;
  arrive_date: String;
  date_do: String;
  is_ds: String;
  is_docs: String;
  declaration_submit_date: String;
  declaration_number: String;
  declaration_issue_date: String;
  train_dispatch_date: String;
  train_arrive_date: String;
  destination_station: String;
  km_to_dist: String;
  store_arrive_date: String;
  note: String;
};
