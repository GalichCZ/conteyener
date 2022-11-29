const ProductSchema = require("../models/product-model");
const FileService = require("./file-service");

class ProductService {
  async createProduct(file, container) {
    try {
      const products = file[0].map(async (product) => {
        const doc = new ProductSchema({
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
          container,
        });
        const docs = await doc.save();
        return docs;
      });
      return Promise.all(products).then((res) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(container, file) {
    try {
      await this.deleteProduct(container);

      const products = await FileService.createFile(file);

      return await this.createProduct(products);
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(container) {
    try {
      const products = await ProductSchema.find({ container });

      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(container) {
    try {
      await ProductSchema.deleteMany({ container });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductService();
