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
export type Store = {
  receiver: string;
  name: string;
  address: string;
  contact: string;
  note: string;
};
export type TableProps = {
  data:
    | {
        _id: string;
        request_date: string;
        order_number: string;
        container: Container;
        simple_product_name: string;
        providers: Providers[];
        importers: Importers[];
        conditions: string;
        store: Store;
        agent: string;
        place_of_dispatch: string;
        line: string;
        ready_date: string;
        load_date: string;
        etd: string;
        eta: string;
        release: string;
        bl_smgs_cmr: boolean;
        td: string;
        date_do: string;
        port: string;
        is_ds: boolean;
        is_docs: boolean;
        declaration_number: string;
        declaration_issue_date: string;
        declaration_status: string;
        availability_of_ob: boolean;
        answer_of_ob: boolean;
        expeditor: string;
        destination_station: string;
        km_to_dist: number;
        train_arrive_date: string;
        pickup: string;
        store_arrive_date: string;
        comment: string;
        fraht: string;
        bid: number;
        note: string;
        creator: string;
      }[]
    | undefined;
};

export type NewItem = {
  request_date: Date;
  order_number: string;
  container_number: string;
  simple_product_name: string;
  providers: NewProviders[];
  importers: NewImporters[];
  conditions: string;
  store_receiver: string;
  store_name: string;
  store_address: string;
  store_contact: string;
  agent: string;
  container_type: string;
  place_of_dispatch: string;
  line: string;
  ready_date: Date;
  load_date: Date;
  etd: string;
  eta: string;
  release: string;
  bl_smgs_cmr: boolean;
  td: boolean;
  date_do: Date;
  port: string;
  is_ds: boolean;
  is_docs: boolean;
  declaration_number: string;
  declaration_issue_date: Date;
  availability_of_ob: boolean;
  answer_of_ob: boolean;
  expeditor: string;
  destination_station: string;
  km_to_dist: number;
  train_arrive_date: Date;
  bid: number;
  pickup: string;
  store_arrive_date: Date;
  comment: string;
  note: string;
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
