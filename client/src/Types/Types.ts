type Container = {
  container_number: string;
  container_type: string;
  _id: string;
};

type Importers = {
  name: string;
  _id?: string;
};

// type OrderNumber = {
//   number: string;
//   _id?: string;
// };

type Providers = {
  name: string;
  _id?: string;
};

export type Store = {
  _id?: string;
  receiver: string | undefined;
  contact: string;
  note: string;
  techStore: string;
};

export type TableProps = {
  _id: string;
  request_date: string;
  order_number: string[];
  container: Container;
  simple_product_name: string;
  delivery_method: string;
  providers: string[];
  importers: string[];
  conditions: string;
  store_name: string;
  delivery_channel: string;
  store: Store;
  agent: string;
  place_of_dispatch: string;
  line: string;
  ready_date: string;
  load_date: string;
  etd: string;
  eta: string;
  eta_update: boolean;
  release: string;
  bl_smgs_cmr: boolean;
  td: boolean;
  date_do: string;
  date_do_update: boolean;
  port: string;
  is_ds: boolean;
  is_docs: IsDocsType;
  declaration_number: string[];
  declaration_issue_date: string;
  declaration_issue_date_update: boolean;
  declaration_status: string;
  availability_of_ob: string;
  answer_of_ob: string;
  expeditor: string;
  destination_station: string;
  km_to_dist: number;
  train_depart_date: string;
  train_depart_date_update: boolean;
  train_arrive_date: string;
  train_arrive_date_update: boolean;
  pickup: string;
  store_arrive_date: string;
  store_arrive_date_update: boolean;
  comment: string;
  fraht: string;
  bid: number;
  note: string;
  creator: string;
};

export interface INewItem {
  request_date: Date | string;
  order_number: string[];
  simple_product_name: string;
  delivery_method: string;
  providers: string[];
  importers: string[];
  conditions: string;
  store_name: string;
  tech_store?: string;
  agent: string;
  container_type?: string;
  place_of_dispatch: string;
  is_docs: IsDocsType;
}

export interface IItem extends INewItem {
  _id: string;
  container_number?: string;
  container: Container;
  store_receiver?: string;
  store_address?: string;
  store_contact?: string;
  place_of_dispatch: string;
  arrive_place?: string;
  line: string;
  ready_date: string;
  load_date: string;
  etd: string;
  eta: string;
  release: string;
  bl_smgs_cmr: boolean | null;
  td: boolean | null;
  date_do: string | null;
  port: string;
  is_ds: boolean | null;
  delivery_channel: string;
  is_docs: IsDocsType;
  declaration_number: string[];
  declaration_issue_date: string;
  availability_of_ob: string;
  answer_of_ob: string;
  expeditor: string;
  destination_station: string;
  km_to_dist: number;
  train_arrive_date: string;
  bid: number;
  pickup: string;
  store_arrive_date: string;
  comment: string;
  note: string;
  fraht: string;
}

export interface Comment {
  comment: string;
  _id: string;
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
  modification: string;
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

export interface UserData {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_activated: boolean;
  activation_link: string;
  createdAt: Date;
}

export interface IsDocsType {
  PI: boolean | null;
  CI: boolean | null;
  PL: boolean | null;
  SS_DS: boolean | null;
  contract_agrees: boolean | null;
  cost_agrees: boolean | null;
  instruction: boolean | null;
  ED: boolean | null;
  bill: boolean | null;
}

export interface TechStoreData {
  delivery_time: number;
  name: string;
  address: string;
  _id?: string;
}

export interface FormulaDateUpdate {
  eta?: Date | string;
  date_do?: Date | string;
  declaration_issue_date?: Date | string;
  train_depart_date?: Date | string;
  train_arrive_date?: Date | string;
  store_arrive_date?: Date | string;
  _id: string;
  eta_update?: boolean;
  date_do_update?: boolean;
  declaration_issue_date_update?: boolean;
  train_depart_date_update?: boolean;
  train_arrive_date_update?: boolean;
  store_arrive_date_update?: boolean;
  dateType: number;
  delivery_channel: string;
}

export interface IChannelObject {
  _id?: string;
  name: string;
  eta: number | null;
  date_do: number | null;
  declaration_issue_date: number | null;
  train_depart_date: number | null;
  train_arrive_date: number | null;
  store_arrive_date: number | null;
}
