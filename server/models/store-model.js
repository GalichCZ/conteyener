const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    receiver: String,
    contact: String,
    note: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
