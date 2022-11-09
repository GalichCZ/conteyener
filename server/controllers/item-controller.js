const ContainerSchema = require("../models/container-model");
const ContainerService = require("../service/container-service");

class ItemController {
  async itemCreate(req, res) {
    try {
      const container = await ContainerService.createContainer(
        req.body.number,
        req.body.type
      );

      res.json(container);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ItemController();
