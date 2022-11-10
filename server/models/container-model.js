const mongoose = require("mongoose");

const ContainerSchema = new mongoose.Schema(
  {
    number: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Caontainer", ContainerSchema);
