const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      unique: true,
    },
    container: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);