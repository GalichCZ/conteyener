const mongoose = require("mongoose");

const DeclarationSchema = new mongoose.Schema({
  declaration_status_date: Date,
  declaration_status: String,
  declaration_status_message: String,
  declaration_number: String,
});

module.exports = mongoose.model("Declaration", DeclarationSchema);
