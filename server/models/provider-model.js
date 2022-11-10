const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // unique: true,
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

module.exports = mongoose.model("Provider", ProviderSchema);
