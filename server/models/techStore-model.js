const mongoose = require("mongoose");

const TechStoreSchema = new mongoose.Schema(
  {
    delivery_time: Number,
    address: String,
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TechStore", TechStoreSchema);
