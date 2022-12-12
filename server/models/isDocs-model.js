const mongoose = require("mongoose");

const IsDocsSchema = new mongoose.Schema({
  PI: Boolean,
  CI: Boolean,
  PL: Boolean,
  SS_DS: Boolean,
  contract_agrees: Boolean,
  cost_agrees: Boolean,
  instruction: Boolean,
  ED: Boolean,
  bill: Boolean,
  container: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Container",
    required: true,
  },
});

module.exports = mongoose.model("IsDocs", IsDocsSchema);
