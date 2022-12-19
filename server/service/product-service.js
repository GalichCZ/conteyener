const ProductSchema = require("../models/product-model");
const FileService = require("./file-service");

class ProductService {
  async createProduct(file, container) {
    try {
      const products = file[0].map(async (product) => {
        const doc = new ProductSchema({
          hs_code: product["HS CODE"],
          article: product.ARTICLE,
          trade_mark: product["TRADE MARK"],
          product_name: product["NAME OF GOODS"],
          model: product.MODEL,
          quantity_pieces: product["QUANTITY, PCS"],
          quantity_places: product.CTNS,
          piece_price: product["UNIT PRICE, USD"],
          total_price: product["TOTAL PRICE, USD"],
          weight_net: product["NET/KG"],
          weight_gross: product["GROSS/KG"],
          cbm: product["M³"],
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
