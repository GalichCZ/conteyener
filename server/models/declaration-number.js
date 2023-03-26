const mongoose = require("mongoose");

const DeclarationNumberSchema = new mongoose.Schema({
  number: String,
});

module.exports = mongoose.model("DeclarationNumber", DeclarationNumberSchema);
