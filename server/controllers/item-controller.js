const ContainerSchema = require("../models/container-model");
const ContainerService = require("../service/container-service");
const ProviderService = require("../service/provider-service");
const ImporterService = require("../service/importer-service");
class ItemController {
  async itemCreate(req, res) {
    try {
      let container = await ContainerSchema.findOne({
        number: req.body.number,
      });
      if (!container)
        container = await ContainerService.createContainer(
          req.body.number,
          req.body.type
        );

      const provider = await ProviderService.createProvider(
        req.body.providers,
        container._id
      );

      res.json({ container, provider });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ItemController();
