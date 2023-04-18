const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    simple_name: { type: String, index: true },
    hs_code: { type: Number, index: true },
    article: { type: String, index: true },
    trade_mark: { type: String, index: true },
    model: { type: String, index: true },
    modification: { type: String, index: true },
    product_name: { type: String, index: true },
    manufacturer: { type: String, index: true },
    quantity_pieces: Number,
    quantity_places: Number,
    piece_price: Number,
    total_price: Number,
    weight_net: Number,
    weight_gross: Number,
    cbm: Number,
    item_id: { type: String, index: true },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({
  hs_code: "text",
  article: "text",
  trade_mark: "text",
  model: "text",
  modification: "text",
  product_name: "text",
  manufacturer: "text",
  quantity_pieces: "text",
  quantity_places: "text",
  piece_price: "text",
  total_price: "text",
  weight_net: "text",
  weight_gross: "text",
  cbm: "text",
});

module.exports = mongoose.model("Product", ProductSchema);
