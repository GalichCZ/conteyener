const StockPlaceSchema = require("../models/stockPlace-model");
const ItemSchema = require("../models/item-model");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
class StockPlaceService {
  async createStockPlace(address, name, contact, note) {
    try {
      const doc = new StockPlaceSchema({
        address,
        name,
        contact,
        note,
      });

      const stockPlace = await doc.save();

      return stockPlace;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE STOCK PLACE ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }

  async getOneStockPlace(_id) {
    try {
      const stockPlace = await StockPlaceSchema.findById(_id);

      return stockPlace;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET ONE STOCK PLACE ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }

  async getOneStockPlaceByName(name) {
    try {
      const stockPlace = await StockPlaceSchema.findOne({ name }).exec();

      return stockPlace;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET ONE STOCK PLACE BY NAME ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }

  async getStockPlaces() {
    try {
      const stockPlaces = await StockPlaceSchema.find();

      return stockPlaces;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET ALL STOCK PLACE ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }

  async updateTechStores(_id, address, name, contact, note) {
    try {
      await StockPlaceSchema.findByIdAndUpdate(
        {
          _id,
        },
        {
          address,
          name,
          contact,
          note,
        }
      );

      const newStockPlace = await StockPlaceSchema.findById(_id);

      return newStockPlace;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE STOCK PLACE ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }

  async deleteStockPlace(_id) {
    try {
      await ItemSchema.updateMany(
        { stock_place: _id },
        { stock_place: null, stock_place_name: "" }
      );
      await StockPlaceSchema.findByIdAndDelete(_id);

      return { success: true };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDELETE STOCK PLACE ERROR:\n${error}`
      );
      console.log(error);
      return { success: true, error };
    }
  }
}

module.exports = new StockPlaceService();
