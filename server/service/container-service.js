const ContainerSchema = require("../models/container-model");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
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
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCONTAINER CREATE ERROR:\n${error}`
      );
      console.log(error);
    }
  }

  async getContainer(req) {
    try {
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
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCONTAINER GET ERROR:\n${error}`
      );
    }
  }

  async getContainerOnce(number, type) {
    const doc = await ContainerSchema.findOne({
      container_number: number,
    });
    if (doc) {
      return doc;
    } else {
      return await this.createContainer(number, type);
    }
  }

  async updateContainer(_id, req) {
    try {
      if (
        req.body.container.container_number ||
        req.body.container.container_type
      ) {
        await ContainerSchema.updateOne(
          {
            _id,
          },
          {
            container_number: req.body.container.container_number,
            container_type: req.body.container.container_type,
          }
        );
        return await ContainerSchema.findById(_id);
      }
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCONTAINER UPDATE ERROR:\n${error}`
      );
    }
  }

  async deleteContainer(item) {
    try {
      if (item.container)
        await ContainerSchema.deleteOne({ _id: item.container });
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCONTAINER DELETE ERROR:\n${error}`
      );
    }
  }
}

module.exports = new ContainerService();
