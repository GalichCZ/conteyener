const ProviderSchema = require("../models/provider-model");
const ItemSchema = require("../models/item-model");

class ProviderService {
  async createProvider(names, container) {
    try {
      const providers = names.map(async (provider) => {
        const doc = new ProviderSchema({
          name: provider.name,
          container,
        });
        const docs = await doc.save();
        return docs;
      });

      return Promise.all(providers).then((res) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getProviders(items) {
    try {
      const providers = items.map(async (provider) => {
        return await ProviderSchema.find({ container: provider.container });
      });

      return Promise.all(providers).then((res) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProviders(item, req) {
    try {
      const doc = await ItemSchema.findOne({
        _id: item._id,
      });

      if (req.body.providers) {
        console.log(req.body.providers);
        await this.deleteProviders(item);

        const providers = await this.createProvider(
          req.body.providers,
          item.container
        );

        doc.providers = providers;
        await doc.save();
      } else {
        doc.providers = [];
        await doc.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProviders(item) {
    try {
      await ProviderSchema.deleteMany({ container: item.container });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProviderService();
