const ContainerSchema = require("../models/container-model");

class ContainerService {
  async createContainer(number, type) {
    try {
      const doc = new ContainerSchema({
        number,
        type,
      });

      const container = doc.save();

      return container;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ContainerService();
