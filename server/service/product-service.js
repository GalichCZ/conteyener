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
          article_ved: product.ARTICLE,
          article_erp: '',
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
        const productsAdded = beforeId.product_has_added ? beforeId.product_has_added : {}
        productsAdded[simple_product_name] = true
        await ItemSchema.findByIdAndUpdate(item_id, {
          product: [...ids, ...beforeId.product],
          product_has_added: productsAdded
        });
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

  async createProductHand(product, itemId, simpleName) {
    try {
      const beforeId = await ItemSchema.findById(itemId).exec();
      const newProduct = await ProductSchema.create({...product, simple_name:simpleName, item_id: itemId})

      const productsAdded = beforeId.product_has_added ? beforeId.product_has_added : {}

      productsAdded[simpleName] = true

      await ItemSchema.findByIdAndUpdate(itemId, {product: [newProduct._id, ...beforeId.product], product_has_added: productsAdded})
    } catch (e) {
      SendBotMessage(
          `${dayjs(new Date()).format(
              "MMMM D, YYYY h:mm A"
          )}\nCREATE HAND PRODUCT ERROR:\n${e}`
      );
      console.log(e)
      throw new Error(e)
    }
  }

  async updateProduct(item_id, file, simple_name, old_name) {
    try {
      await ProductSchema.updateMany(
        { item_id, simple_name: old_name },
        { simple_name }
      );

      const item = await ItemSchema.findById(item_id).exec();

      const oldProductHasAddedValue = item.product_has_added ? item.product_has_added[old_name] : false

      if(item.product_has_added && item.product_has_added[old_name] !== undefined) {
        delete item.product_has_added[old_name]
      }

      const newProductHasAdded = item.product_has_added

      newProductHasAdded[simple_name] = oldProductHasAddedValue

      await ItemSchema.findByIdAndUpdate(item_id, {product_has_added: newProductHasAdded})

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

      const item = await ItemSchema.findById(itemId).exec()

      const newIds = products.map((prod) => {
        return prod._id;
      });

      // const product_has_added = newIds.length === 0 ? {} : item.product_has_added

      await ItemSchema.findByIdAndUpdate(itemId, { product: newIds});

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
