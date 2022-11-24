const ContainerSchema = require("../models/container-model");

class ContainerService {
  async createContainer(number, type) {
    try {
      const doc = new ContainerSchema({
        container_number: number,
        container_type: type,
      });

      const container = doc.save();

      return container;
    } catch (error) {
      console.log(error);
    }
  }

  async getContainer(req) {
    const doc = await ContainerSchema.findOne({
      container_number: req.body.container_number,
    });
    if (doc) {
      return doc;
    } else {
      return await this.createContainer(
        req.body.container_number,
        req.body.container_type
      );
    }
  }

  async updateContainer(item, req) {
    try {
      return await ContainerSchema.updateOne(
        {
          _id: item.container,
        },
        {
          container_number: req.body.container_number,
          container_type: req.body.container_type,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteContainer(item) {
    try {
      if (item.container)
        await ContainerSchema.deleteOne({ _id: item.container });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ContainerService();
