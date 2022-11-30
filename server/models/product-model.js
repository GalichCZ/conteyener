const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    hs_code: Number,
    article: String,
    trade_mark: String,
    model: String,
    product_name: String,
    quantity_pieces: Number,
    quantity_places: Number,
    piece_price: Number,
    total_price: Number,
    weight_net: Number,
    weight_gross: Number,
    cbm: Number,
    container: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
