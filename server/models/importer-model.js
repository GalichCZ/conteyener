const mongoose = require("mongoose");

const ImporterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // unique: true,
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
