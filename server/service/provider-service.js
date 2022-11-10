const ProviderSchema = require("../models/provider-model");

class ContainerService {
  async createProvider(name, container) {
    try {
      const doc = new ProviderSchema({
        name,
        container,
      });

      const provider = await doc.save();

      return provider;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ContainerService();
