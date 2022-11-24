const ProdctSchema = require("../models/product-model");

class ProductService {
  async createProduct(products, container) {
    try {
      const _products = products.map(async (product) => {
        const doc = new ProdctSchema({
          hs_code: product.hs_code,
          article: product.article,
          trade_mark: product.trade_mark,
          model: product.model,
          product_name: product.product_name,
          quantity_pieces: product.quantity_pieces,
          quantity_places: product.quantity_places,
          piece_price: product.piece_price,
          total_price: product.total_price,
          weight_net: product.weight_net,
          weight_gross: product.weight_gross,
          cbm: product.cbm,
          container,
        });
        const docs = await doc.save();
        return docs;
      });
      return Promise.all(_products).then((res) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductService();
