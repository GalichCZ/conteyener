const StockPlaceSchema = require("../models/stockPlace-model");

class StockPlaceService {
  async createStockPlace(address, name) {
    try {
      const doc = new StockPlaceSchema({
        address,
        name,
      });

      const stockPlace = await doc.save();

      return stockPlace;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getOneStockPlace(_id) {
    try {
      const stockPlace = await StockPlaceSchema.findById(_id);

      return stockPlace;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getStockPlaces() {
    try {
      const stockPlaces = await StockPlaceSchema.find();

      return stockPlaces;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateTechStores(_id, address, name) {
    try {
      await StockPlaceSchema.findByIdAndUpdate(
        {
          _id,
        },
        {
          address,
          name,
        }
      );

      const newStockPlace = await StockPlaceSchema.findById(_id);

      return newStockPlace;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new StockPlaceService();