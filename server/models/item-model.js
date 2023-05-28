const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    request_date: {
      type: Date,
      required: true,
    },
    inside_number: {
      type: Array,
      default: null,
    },
    proform_number: {
      type: Array,
      default: null,
    },
    order_number: {
      type: Array,
      required: true,
      unique: true,
    },
    container_number: {
      type: String,
      default: null,
    },
    container_type: {
      type: String,
    },
    simple_product_name: {
      type: Array,
      required: true,
    },
    providers: {
      type: Array,
      required: true,
    },
    importers: {
      type: Array,
      required: true,
    },
    conditions: {
      type: Array,
      required: true,
    },
    direction: {
      type: String,
    },
    store_name: {
      type: String,
      required: true,
    },
    store: {
      default: null,
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechStore",
    },
    delivery_channel: {
      type: String,
      default: "",
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    agent: {
      type: String,
      required: true,
    },
    place_of_dispatch: {
      type: String,
      required: true,
    },
    delivery_method: String,
    line: String,
    ready_date: {
      type: Date,
      default: null,
    },
    load_date: {
      type: Date,
      default: null,
    },
    etd: {
      type: Date,
      default: null,
    },
    eta: {
      type: Date,
      default: null,
    },
    eta_update: {
      type: Boolean,
      default: false,
    },
    release: {
      type: Date,
      default: null,
    },
    bl_smgs_cmr: {
      type: Boolean,
      default: false,
    },
    td: {
      type: Boolean,
      default: false,
    },
    date_do: {
      type: Date,
      default: null,
    },
    date_do_update: {
      type: Boolean,
      default: false,
    },
    port: String,
    is_ds: Boolean,
    is_docs: {
      type: [Object],
    },
    declaration_number: {
      type: Array,
    },
    declaration_issue_date: {
      type: Date,
      default: null,
    },
    declaration_issue_date_update: {
      type: Boolean,
      default: false,
    },
    declaration_status: Array,
    availability_of_ob: {
      type: Date,
      default: null,
    },
    answer_of_ob: {
      type: Date,
      default: null,
    },
    expeditor: String,
    destination_station: String,
    km_to_dist: {
      type: Number,
      default: null,
    },
    train_depart_date: {
      type: Date,
      default: null,
    },
    train_depart_date_update: {
      type: Boolean,
      default: false,
    },
    train_arrive_date: {
      type: Date,
      default: null,
    },
    train_arrive_date_update: {
      type: Boolean,
      default: false,
    },
    pickup: String,
    store_arrive_date: {
      type: Date,
      default: null,
    },
    store_arrive_date_update: {
      type: Boolean,
      default: false,
    },
    stock_place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StockPlace",
    },
    stock_place_name: String,
    comment: String,
    fraht: String,
    bid: { type: Number, default: 0 },
    note: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ItemSchema.index(
  {
    request_date: "text",
    inside_number: "text",
    proform_number: "text",
    order_number: "text",
    simple_product_name: "text",
    providers: "text",
    importers: "text",
    container_number: "text",
    container_type: "text",
    conditions: "text",
    direction: "text",
    store_name: "text",
    delivery_channel: "text",
    agent: "text",
    place_of_dispatch: "text",
    delivery_method: "text",
    line: "text",
    ready_date: "text",
    load_date: "text",
    etd: "text",
    eta: "text",
    release: "text",
    bl_smgs_cmr: "text",
    td: "text",
    date_do: "text",
    port: "text",
    is_ds: "text",
    declaration_number: "text",
    declaration_issue_date: "text",
    declaration_status: "text",
    answer_of_ob: "text",
    expeditor: "text",
    destination_station: "text",
    km_to_dist: "text",
    train_depart_date: "text",
    train_arrive_date: "text",
    pickup: "text",
    store_arrive_date: "text",
    stock_place_name: "text",
  },
  {
    language_override: "simple",
    default_language: "none",
  }
);

module.exports = mongoose.model("Item", ItemSchema);
