type Container = {
  container_number: string;
  container_type: string;
  _id: string;
};
type Importers = {
  name: string;
  _id: string;
};
type NewImporters = {
  name: string;
};
type Providers = {
  name: string;
  _id: string;
};
type NewProviders = {
  name: string;
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
        order_number: string;
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
        port: string;
        place_of_dispatch: string;
        arrive_place: string;
        etd: string;
        eta: string;
        date_do: string;
        is_ds: boolean;
        is_docs: boolean;
        declaration_submit_date: string;
        declaration_number: string;
        declaration_issue_date: string;
        train_etd: string;
        train_arrive_date: string;
        destination_station: string;
        km_to_dist: number;
        store_arrive_date: string;
        note: string;
      }[]
    | undefined;
};

export type NewItem = {
  request_date: Date | null;
  order_number: String;
  container_number: String;
  container_type: String;
  importers: NewImporters[];
  providers: NewProviders[];
  store_name: String;
  store_address: String;
  store_contact: String;
  conditions: String;
  line: String;
  agent: String;
  fraht: String;
  expeditor: String;
  bid: Number | null;
  port: String;
  place_of_dispatch: String;
  arrive_place: String;
  etd: Date | null;
  eta: Date | null;
  date_do: Date | null;
  is_ds: Boolean | null;
  is_docs: Boolean | null;
  declaration_submit_date: Date | null;
  declaration_number: String;
  declaration_issue_date: Date | null;
  train_etd: Date | null;
  train_arrive_date: Date | null;
  destination_station: String;
  km_to_dist: String;
  store_arrive_date: Date | null;
  note: String;
};

export type SingleItem = {
  opened: boolean;
  setOpen: (c: any) => any;
  item:
    | any
    | {
        _id: string;
        request_date: string;
        order_number: string;
        container: Container;
        importers: NewImporters[] | null;
        providers: NewProviders[] | null;
        store: Store;
        conditions: string;
        line: string;
        agent: string;
        fraht: string;
        expeditor: string;
        bid: number;
        port: string;
        place_of_dispatch: string;
        arrive_place: string;
        etd: string;
        eta: string;
        date_do: string;
        is_ds: boolean;
        is_docs: boolean;
        declaration_submit_date: string;
        declaration_number: string;
        declaration_issue_date: string;
        train_etd: string;
        train_arrive_date: string;
        destination_station: string;
        km_to_dist: number;
        store_arrive_date: string;
        note: string;
      };
};

export interface UpdatedItem {
  _id: string | null;
  request_date: string | null;
  order_number: string | null;
  container: {
    _id: string;
    container_number: string;
    container_type: string;
  };
  importers: NewImporters[] | null;
  providers: NewProviders[] | null;
  store_name: String | null;
  store_address: String | null;
  store_contact: String | null;
  conditions: string | null;
  line: string | null;
  agent: string | null;
  fraht: string | null;
  expeditor: string | null;
  bid: number | null;
  port: string | null;
  place_of_dispatch: string | null;
  arrive_place: string | null;
  etd: string | null;
  eta: string | null;
  date_do: string | null;
  is_ds: boolean | null;
  is_docs: boolean | null;
  declaration_submit_date: string | null;
  declaration_number: string | null;
  declaration_issue_date: string | null;
  train_etd: string | null;
  train_arrive_date: string | null;
  destination_station: string | null;
  km_to_dist: number | null;
  store_arrive_date: string | null;
  note: string | null;
}
