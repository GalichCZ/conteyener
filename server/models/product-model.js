const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    simple_name: String,
    hs_code: Number,
    article: String,
    trade_mark: String,
    model: String,
    modification: String,
    product_name: String,
    manufacturer: String,
    quantity_pieces: Number,
    quantity_places: Number,
    piece_price: Number,
    total_price: Number,
    weight_net: Number,
    weight_gross: Number,
    cbm: Number,
    item_id: String,
  },
  {
    timestamps: true,
  }
);

ProductSchema.index(
  { article: "text" },
  {
    language_override: "simple",
    default_language: "none",
  }
);

module.exports = mongoose.model("Product", ProductSchema);
