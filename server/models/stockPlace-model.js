const mongoose = require("mongoose");

const StockPlaceSchema = new mongoose.Schema(
  {
    address: String,
    name: String,
    contact: String,
    note: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockPlace", StockPlaceSchema);
