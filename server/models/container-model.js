const mongoose = require("mongoose");

const ContainerSchema = new mongoose.Schema(
  {
    container_number: {
      type: String,
      unique: true,
    },
    container_type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Caontainer", ContainerSchema);
