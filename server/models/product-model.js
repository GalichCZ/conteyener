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
    container: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
