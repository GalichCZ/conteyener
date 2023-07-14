const ProductSchema = require("../models/product-model");
const ItemSchema = require("../models/item-model");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");

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
          manufacturer: product["Manufacturer"],
          cbm: product["M³"],
          item_id,
          simple_name: simple_product_name,
        });
        const docs = await doc.save();
        return docs;
      });
      return Promise.all(products).then(async (res) => {
        const ids = res.map((i) => {
          return i._id;
        });
        const beforeId = await ItemSchema.findById(item_id).exec();
        await ItemSchema.findByIdAndUpdate(item_id, {
          product: [...ids, ...beforeId.product],
        });

        console.log(ids);
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
      const res = await ProductSchema.updateMany(
        { item_id, simple_name: old_name },
        { simple_name }
      );
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

  async getProducts(products_id) {
    try {
      const findProducts = products_id.map(
        async (id) => await ProductSchema.findById(id)
      );
      const products = await Promise.all(findProducts);

      return { success: true, products };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDELETE PRODUCT ERROR:\n${error}`
      );
      console.log(error);
      return { success: false, error };
    }
  }

  async deleteProduct(product_id, itemId) {
    try {
      await ProductSchema.findByIdAndDelete({ _id: product_id });
      const products = await ProductSchema.find({ item_id: itemId }).exec();

      const newIds = products.map((prod) => {
        return prod._id;
      });

      await ItemSchema.findByIdAndUpdate(itemId, { product: newIds });

      return { success: true };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDELETE PRODUCT ERROR:\n${error}`
      );
      console.log(error);
      return { success: false, error };
    }
  }
}

module.exports = new ProductService();
