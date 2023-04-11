const TechStoreSchema = require("../models/techStore-model");

class TechStoreService {
  async createTechStore(address, name, receiver, contact, note) {
    try {
      const doc = new TechStoreSchema({
        address,
        name,
        receiver,
        contact,
        note,
      });

      const techStore = await doc.save();

      return techStore;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE TECH STORE ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }

  async getOneTechStore(_id) {
    try {
      const techStore = await TechStoreSchema.findById(_id);

      return techStore;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET ONE TECH STORE ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }

  async getTechStoreByName(name) {
    try {
      const techStore = await TechStoreSchema.find({ name }).exec();
      if (techStore) return techStore[0];
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET ONE TECH STORE BY NAME ERROR:\n${error}`
      );
      console.log(error);
    }
  }

  async getTechStores() {
    try {
      const techStores = await TechStoreSchema.find();

      return techStores;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET ALL TECH STORE ERROR:\n${error}`
      );
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
          address: req.body.address,
          name: req.body.name,
          receiver: req.body.receiver,
          contact: req.body.contact,
          note: req.body.note,
        }
      );

      const newTechStore = await TechStoreSchema.findById(req.body._id);

      return newTechStore;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE TECH STORE ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }

  async deleteTechStore(_id) {
    try {
      await TechStoreSchema.findByIdAndDelete(_id);
      return true;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDELETE TECH STORE ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }
}

module.exports = new TechStoreService();
