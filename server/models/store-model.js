const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    receiver: String,
    contact: String,
    note: String,
    techStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechStore",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
