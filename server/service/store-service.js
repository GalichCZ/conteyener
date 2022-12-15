const StoreSchema = require("../models/store-model");
const ItemSchema = require("../models/item-model");
class StoreService {
  async createStore(techStore) {
    try {
      const doc = new StoreSchema({
        techStore,
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

  async updateStore(_id, req, itemId) {
    try {
      await StoreSchema.findByIdAndUpdate(
        {
          _id,
        },
        {
          receiver: req.body.updateStore.receiver,
          contact: req.body.updateStore.contact,
          note: req.body.updateStore.note,
          techStore: req.body.updateStore.techStore,
        }
      );

      const newStore = await StoreSchema.findById(_id);

      const doc = await ItemSchema.findById(itemId);
      doc.store = newStore;
      await doc.save();

      return newStore;
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
