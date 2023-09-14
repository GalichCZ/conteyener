export type StockPlace = {
  _id: string;
  name: string;
};

export type TableProps = {
  empty?: "";
  _id: string;
  request_date: string;
  order_number: string[];
  inside_number: string[];
  proform_number: string[];
  container?: {
    container_number: string;
    container_type: string;
  };
  container_number: string;
  container_type: string;
  simple_product_name: string[];
  product: string[];
  delivery_method: string;
  providers: string[];
  importers: string[];
  conditions: string[];
  store_name: string;
  store: string;
  delivery_channel: string;
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
  fraht_account: string;
  is_docs: IsDocsType[];
  declaration_number: string[];
  declaration_issue_date: string;
  declaration_issue_date_update: boolean;
  declaration_status: string;
  availability_of_ob: string;
  answer_of_ob: string;
  expeditor: string;
  destination_station: string;
  km_to_dist: number | null;
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
  stock_place_name: any;
  stock_place: any;
  hidden: boolean;
  direction: string;
};

export interface INewItem {
  request_date: Date | string | undefined;
  order_number: string[];
  simple_product_name: string[];
  delivery_method: string;
  providers: string[];
  importers: string[];
  conditions: string[];
  store_name: string;
  store: string;
  agent: string;
  container_type: string;
  place_of_dispatch: string;
  direction: string;
}

export interface IItem extends INewItem {
  [key: string]: any;
  _id: string;
  inside_number: string[];
  proform_number: string[];
  container?: {
    container_number: string;
    container_type: string;
  };
  container_number: string;
  store_receiver?: string;
  store_address?: string;
  store_contact?: string;
  place_of_dispatch: string;
  arrive_place?: string;
  line: string;
  ready_date: string | undefined | null;
  load_date: string | undefined | null;
  etd: string | undefined | null;
  eta: string;
  release: string | undefined | null;
  bl_smgs_cmr: boolean;
  td: boolean;
  date_do: string;
  port: string;
  is_ds: boolean;
  fraht_account: string;
  delivery_channel: string | null;
  is_docs: IsDocsType[];
  declaration_number: string[];
  declaration_issue_date: string;
  availability_of_ob: string | undefined | null;
  answer_of_ob: string | undefined | null;
  expeditor: string;
  destination_station: string;
  km_to_dist: number | null;
  train_arrive_date: string;
  bid: number | null;
  pickup: string;
  store_arrive_date: string;
  comment: string;
  note: string;
  fraht: string;
  stock_place_name: any;
  stock_place: any;
  hidden: boolean;
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
  manufacturer: string;
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
  PI: boolean;
  CI: boolean;
  PL: boolean;
  SS_DS: boolean;
  contract_agrees: boolean;
  cost_agrees: boolean;
  instruction: boolean;
  ED: boolean;
  bill: boolean;
  order_number: string;
}

export interface TechStoreData {
  name: string;
  address: string;
  receiver: string;
  contact: string;
  note: string;
  _id?: string;
}

export interface FormulaDateUpdate {
  eta?: Date | string | null;
  date_do?: Date | string | null;
  declaration_issue_date?: Date | string | null;
  train_depart_date?: Date | string | null;
  train_arrive_date?: Date | string | null;
  store_arrive_date?: Date | string | null;
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

export interface IComment {
  _id?: string;
  comment_text: string;
  comment_date: string;
  comment_item: string;
  creator_name?: UserData;
}

export interface IUpdateComment {
  _id?: string;
  comment_text?: string;
}

export interface ICalcDate {
  etd: string | null | undefined;
  delivery_channel: string;
  itemId: string;
}

export interface IRoles {
  [key: string]: string[];
  manager_patriot: string[];
  manager_buyer: string[];
  head: string[];
  manager_int: string[];
  manager_sales: string[];
  manager_treasury: string[];
  manager_store: string[];
}
