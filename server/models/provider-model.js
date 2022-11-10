const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    container: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Provider", ProviderSchema);
