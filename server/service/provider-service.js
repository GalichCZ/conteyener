const ProviderSchema = require("../models/provider-model");

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
}

module.exports = new ProviderService();
