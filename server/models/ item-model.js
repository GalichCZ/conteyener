const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    date_create: {
      type: Date,
      required: true,
    },
    invoice_number: {
      type: String,
      required: true,
    },
    container: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
    },
    store: {
      type: String,
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
      type: String,
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
      type: String,
    },
    date_do: {
      type: String,
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
      type: String,
    },
    store_arrive_date: {
      type: Date,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", ItemSchema);
