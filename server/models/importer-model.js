const mongoose = require("mongoose");

const ImporterSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Importer", ImporterSchema);
