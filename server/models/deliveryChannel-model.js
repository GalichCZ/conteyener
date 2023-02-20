const mongoose = require("mongoose");

const DeliveryChannelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    eta: Number,
    date_do: Number,
    declaration_issue_date: Number,
    train_depart_date: Number,
    train_arrive_date: Number,
    store_arrive_date: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryChannel", DeliveryChannelSchema);
