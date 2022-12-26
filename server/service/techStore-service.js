const TechStoreSchema = require("../models/techStore-model");

class TechStoreService {
  async createTechStore(delivery_time, address, name) {
    try {
      const doc = new TechStoreSchema({
        delivery_time,
        address,
        name,
      });

      const techStore = await doc.save();

      return techStore;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getOneTechStore(_id) {
    try {
      const techStore = await TechStoreSchema.findById(_id);

      return techStore;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getTechStoreByName(name) {
    try {
      const techStore = await TechStoreSchema.find({ name }).exec();
      if (techStore) return techStore[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getTechStores() {
    try {
      const techStores = await TechStoreSchema.find();

      return techStores;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateTechStores(req) {
    try {
      await TechStoreSchema.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          delivery_time: req.body.delivery_time,
          address: req.body.address,
          name: req.body.name,
        }
      );

      const newTechStore = await TechStoreSchema.findById(req.body._id);

      return newTechStore;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteTechStore(_id) {
    try {
      await TechStoreSchema.findByIdAndDelete(_id);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new TechStoreService();
