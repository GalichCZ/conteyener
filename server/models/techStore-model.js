const mongoose = require("mongoose");

const TechStoreSchema = new mongoose.Schema(
  {
    address: String,
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TechStore", TechStoreSchema);
