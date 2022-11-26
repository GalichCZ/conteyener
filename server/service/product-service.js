const ProdctSchema = require("../models/product-model");

class ProductService {
  async createProduct(products) {
    try {
      const _products = products[0].map(async (product) => {
        console.log(product);
        const doc = new ProdctSchema({
          hs_code: product.HS_CODE,
          article: product.ARTICLE,
          trade_mark: product.TRADE_MARK,
          product_name: product.NAME_OF_GOODS,
          model: product.MODEL,
          quantity_pieces: product.PCS,
          quantity_places: product.CTNS,
          piece_price: product.UNIT_PRICE_USD,
          total_price: product.TOTAL_PRICE_USD,
          weight_net: product.NET_KG,
          weight_gross: product.GROSS_KG,
          cbm: product.CBM,
          // container,
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
