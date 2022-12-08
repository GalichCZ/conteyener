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
      required: true,
    },
    simple_product_name: String,
    product: {
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
      type: String,
      required: true,
    },
    store: {
      type: Object,
      required: true,
    },
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
    ready_date: Date,
    load_date: Date,
    etd: Date,
    eta: Date,
    release: Date,
    bl_smgs_cmr: Boolean,
    td: Boolean,
    date_do: Date,
    port: String,
    is_ds: Boolean,
    is_docs: Object,
    declaration_number: String,
    declaration_issue_date: Date,
    declaration_status: Array,
    availability_of_ob: Boolean,
    answer_of_ob: Boolean,
    expeditor: String,
    destination_station: String,
    km_to_dist: Number,
    train_arrive_date: Date,
    pickup: String,
    store_arrive_date: Date,
    comment: String,
    fraht: String,
    bid: Number,
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

module.exports = mongoose.model("Item", ItemSchema);
