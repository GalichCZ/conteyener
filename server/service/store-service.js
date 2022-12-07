const StoreSchema = require("../models/store-model");

class StoreService {
  async createStore(receiver, name, address, contact, note) {
    try {
      const doc = new StoreSchema({
        receiver,
        name,
        address,
        contact,
        note,
      });
      const store = await doc.save();

      return store;
    } catch (error) {
      console.log(error);
    }
  }

  async getStores(items) {
    try {
      const stores = items.map(async (store) => {
        return await StoreSchema.findById({ _id: store.store });
      });

      return Promise.all(stores).then((res) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateStore(_id, req) {
    try {
      await StoreSchema.updateOne(
        {
          _id,
        },
        {
          receiver: req.body.store_receiver,
          name: req.body.store_name,
          address: req.body.store_address,
          contact: req.body.store_contact,
          note: req.body.store_note,
        }
      );
      return await StoreSchema.findById(_id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteStore(item) {
    try {
      await StoreSchema.deleteOne({ _id: item.store });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new StoreService();
