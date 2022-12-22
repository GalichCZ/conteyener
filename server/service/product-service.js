const ProductSchema = require("../models/product-model");
const FileService = require("./file-service");

class ProductService {
  async createProduct(file, item_id) {
    try {
      const products = file[0].map(async (product) => {
        const doc = new ProductSchema({
          hs_code: product["HS CODE"],
          article: product.ARTICLE,
          trade_mark: product["TRADE MARK"],
          product_name: product["NAME OF GOODS"],
          model: product.MODEL,
          modification: product.MODIFICATION,
          quantity_pieces: product["QUANTITY, PCS"],
          quantity_places: product.CTNS,
          piece_price: product["UNIT PRICE, USD"],
          total_price: product["TOTAL PRICE, USD"],
          weight_net: product["NET/KG"],
          weight_gross: product["GROSS/KG"],
          cbm: product["M³"],
          item_id,
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

  async updateProduct(item_id, file) {
    try {
      await this.deleteProduct(item_id);

      const products = await FileService.createFile(file);

      return await this.createProduct(products);
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(item_id) {
    try {
      const products = await ProductSchema.find({ item_id });

      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(item_id) {
    try {
      await ProductSchema.deleteMany({ item_id });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductService();
