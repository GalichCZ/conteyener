const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    invoice_number: {
      type: String,
      required: true,
      unique: true,
    },
    container: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    providers: {
      type: Array,
    },
    importers: {
      type: Array,
    },
    conditions: {
      type: String,
    },
    line: {
      type: String,
    },
    agent: {
      type: String,
    },
    fraht: {
      type: String,
    },
    expeditor: {
      type: String,
    },
    bid: {
      type: Number,
    },
    delivery_method: {
      type: String,
    },
    place_of_dispatch: {
      type: String,
    },
    arrive_place: {
      type: String,
    },
    distpatch_date: {
      type: Date,
    },
    arrive_date: {
      type: Date,
    },
    date_do: {
      type: Date,
    },
    is_ds: {
      type: Boolean,
    },
    is_docs: {
      type: Boolean,
    },
    declaration_submit_date: {
      type: Date,
    },
    declaration_number: {
      type: String,
    },
    declaration_issue_date: {
      type: Date,
    },
    train_dispatch_date: {
      type: Date,
    },
    train_arrive_date: {
      type: Date,
    },
    destination_station: {
      type: String,
    },
    km_to_dist: {
      type: Number,
    },
    store_arrive_date: {
      type: Date,
    },
    note: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
