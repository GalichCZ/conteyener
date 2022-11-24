const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    receiver: String,
    name: String,
    address: String,
    contact: String,
    note: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
