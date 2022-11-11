const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
