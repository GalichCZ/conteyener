const ProductSchema = require("../models/product-model");
const FileService = require("./file-service");

class ProductService {
  async createProduct(file, item_id, simple_product_name) {
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
          simple_name: simple_product_name,
        });
        const docs = await doc.save();
        return docs;
      });
      return Promise.all(products).then((res) => {
        return res;
      });
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE PRODUCT ERROR:\n${error}`
      );
      console.log(error);
    }
  }

  async updateProduct(item_id, file, simple_name, old_name) {
    try {
      // await this.deleteProduct(item_id);

      // const products = await FileService.createFile(file);

      // return await this.createProduct(products);
      await ProductSchema.updateMany({ item_id, old_name }, { simple_name });
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE PRODUCT ERROR:\n${error}`
      );
      console.log(error);
    }
  }

  async getProduct(item_id, simple_name) {
    try {
      const products = await ProductSchema.find({ item_id, simple_name });

      return products;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET PRODUCT ERROR:\n${error}`
      );
      console.log(error);
    }
  }

  async deleteProduct(item_id) {
    try {
      await ProductSchema.deleteMany({ item_id });
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDELETE PRODUCT ERROR:\n${error}`
      );
      console.log(error);
    }
  }
}

module.exports = new ProductService();
