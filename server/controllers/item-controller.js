const ContainerSchema = require("../models/container-model");
const ContainerService = require("../service/container-service");
const ProviderService = require("../service/provider-service");
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

      const provider = req.body.providers.map((provider) => {
        return ProviderService.createProvider(provider.name, container._id);
      });

      Promise.all(provider).then((providers) => {
        res.json({ container, providers });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ItemController();
