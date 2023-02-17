const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    request_date: {
      type: Date,
      required: true,
    },
    order_number: {
      type: Array,
      required: true,
      unique: true,
    },
    container: {
      type: Object,
      // required: true,
    },
    simple_product_name: { type: String, required: true },
    providers: {
      type: Array,
      required: true,
    },
    importers: {
      type: Array,
      required: true,
    },
    conditions: {
      type: String,
      required: true,
    },
    store_name: { type: String, required: true },
    product: Array,
    store: Object,
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
    ready_date: { type: Date, default: null },
    load_date: { type: Date, default: null },
    etd: { type: Date, default: null },
    eta: { type: Date, default: null },
    eta_update: {
      type: Boolean,
      default: false,
    },
    release: { type: Date, default: null },
    bl_smgs_cmr: { type: Boolean, default: false },
    td: { type: Boolean, default: false },
    date_do: { type: Date, default: null },
    date_do_update: {
      type: Boolean,
      default: false,
    },
    port: String,
    is_ds: Boolean,
    is_docs: Object,
    declaration_number: String,
    declaration_issue_date: { type: Date, default: null },
    declaration_issue_date_update: {
      type: Boolean,
      default: false,
    },
    declaration_status: Array,
    availability_of_ob: { type: Date, default: null },
    answer_of_ob: { type: Date, default: null },
    expeditor: String,
    destination_station: String,
    km_to_dist: { type: Number, default: 0 },
    train_arrive_date: { type: Date, default: null },
    train_arrive_date_update: {
      type: Boolean,
      default: false,
    },
    pickup: String,
    store_arrive_date: { type: Date, default: null },
    store_arrive_date_update: {
      type: Boolean,
      default: false,
    },
    comment: String,
    fraht: String,
    bid: { type: Number, default: 0 },
    note: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    updator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

ItemSchema.index({
  request_date: "text",
  order_number: "text",
  simple_product_name: "text",
  providers: "text",
  importers: "text",
  conditions: "text",
  store_name: "text",
  agent: "text",
  place_of_dispatch: "text",
  delivery_method: "text",
  line: "text",
  ready_date: "text",
  load_date: "text",
  etd: "text",
  eta: "text",
  release: "text",
  date_do: "text",
  port: "text",
  declaration_number: "text",
  declaration_issue_date: "text",
  answer_of_ob: "text",
  expeditor: "text",
  destination_station: "text",
  train_arrive_date: "text",
  pickup: "text",
  store_arrive_date: "text",
});

module.exports = mongoose.model("Item", ItemSchema);
