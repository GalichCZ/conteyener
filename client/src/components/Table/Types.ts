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
  request_date: Date | null;
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
  arrive_place: string;
  line: string;
  ready_date: Date | null;
  load_date: Date | null;
  etd: Date | null;
  eta: Date | null;
  release: Date | null;
  bl_smgs_cmr: boolean | null;
  td: boolean | null;
  date_do: Date | null;
  port: string;
  is_ds: boolean | null;
  is_docs: boolean | null;
  declaration_number: string;
  declaration_issue_date: Date | null;
  availability_of_ob: boolean | null;
  answer_of_ob: boolean | null;
  expeditor: string;
  destination_station: string;
  km_to_dist: number | null;
  train_arrive_date: Date | null;
  bid: number | null;
  pickup: string;
  store_arrive_date: Date | null;
  comment: string;
  note: string;
  fraht: string;
};

export type SingleItem = {
  opened: boolean;
  setOpen: (c: any) => any;
  item:
    | any
    | {
        _id: string;
        request_date: Date | null;
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
        arrive_place: string;
        line: string;
        ready_date: Date | null;
        load_date: Date | null;
        etd: Date | null;
        eta: Date | null;
        release: Date | null;
        bl_smgs_cmr: boolean | null;
        td: boolean | null;
        date_do: Date | null;
        port: string;
        is_ds: boolean | null;
        is_docs: boolean | null;
        declaration_number: string;
        declaration_issue_date: Date | null;
        availability_of_ob: boolean | null;
        answer_of_ob: boolean | null;
        expeditor: string;
        destination_station: string;
        km_to_dist: number | null;
        train_arrive_date: Date | null;
        bid: number | null;
        pickup: string;
        store_arrive_date: Date | null;
        comment: string;
        note: string;
        fraht: string;
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
  arrive_place: string;
  line: string;
  ready_date: Date | null;
  load_date: Date | null;
  etd: Date | null;
  eta: Date | null;
  release: Date | null;
  bl_smgs_cmr: boolean | null;
  td: boolean | null;
  date_do: Date | null;
  port: string;
  is_ds: boolean | null;
  is_docs: boolean | null;
  declaration_number: string;
  declaration_issue_date: Date | null;
  availability_of_ob: boolean | null;
  answer_of_ob: boolean | null;
  expeditor: string;
  destination_station: string;
  km_to_dist: number | null;
  train_arrive_date: Date | null;
  bid: number | null;
  pickup: string;
  store_arrive_date: Date | null;
  comment: string;
  note: string;
  fraht: string;
}

export interface Writes {
  _id: string;
  declaration_number: string;
  declaration_status: string;
  declaration_status_date: string;
  declaration_status_message: string;
}

export interface Products {
  _id: string;
  hs_code: number;
  article: string;
  trade_mark: string;
  model: string;
  product_name: string;
  quantity_pieces: number;
  quantity_places: number;
  piece_price: number;
  total_price: number;
  weight_net: number;
  weight_gross: number;
  cbm: number;
  container: string;
}
