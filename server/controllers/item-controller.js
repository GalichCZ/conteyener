const ContainerService = require("../service/container-service");
const ProviderService = require("../service/provider-service");
const ImporterService = require("../service/importer-service");
const StoreService = require("../service/store-service");
const ItemService = require("../service/item-service");

const ItemSchema = require("../models/item-model");
class ItemController {
  async itemCreate(req, res) {
    try {
      const container = await ContainerService.getContainer(req);

      const provider = await ProviderService.createProvider(
        req.body.providers,
        container._id
      );

      const importer = await ImporterService.createImporter(
        req.body.importers,
        container._id
      );

      const store = await StoreService.createStore(
        req.body.store_name,
        req.body.store_address,
        req.body.store_contact
      );

      const item = await ItemService.createItem(req, store, container);

      res.json({ item, provider, importer });
    } catch (error) {
      console.log(error);
    }
  }

  async getItems(req, res) {
    const items = await ItemService.getItems();
    const importers = await ImporterService.getImporters(items);
    const providers = await ProviderService.getProviders(items);
    const stores = await StoreService.getStores(items);

    res.json({ items, importers, providers, stores });
  }

  async updateItem(req, res) {
    try {
      const item = await ItemSchema.findById({ _id: req.body._id });

      const updatedItem = await ItemService.updateItem(item._id, req);
      const updatedContainer = await ContainerService.updateContainer(
        item,
        req
      );

      res.json({ updatedItem, updatedContainer });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(req, res) {
    try {
      const item = await ItemSchema.findById({ _id: req.body._id });

      await ItemService.deleteItem(item._id);
      await ImporterService.deleteImporters(item);
      await ContainerService.deleteContainer(item);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ItemController();
