const ContainerService = require("../service/container-service");
const ProviderService = require("../service/provider-service");
const ImporterService = require("../service/importer-service");
const StoreService = require("../service/store-service");
const ItemService = require("../service/item-service");

const ItemSchema = require("../models/item-model");
const UserSchema = require("../models/user-model");

class ItemController {
  async itemCreate(req, res) {
    try {
      const creator = await UserSchema.findById(req.userId);

      if (!creator) return res.status(403).json({ message: "Bad Request" });

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

      const item = await ItemService.createItem(
        req,
        store,
        container,
        provider,
        importer,
        creator
      );

      res.json(item);
    } catch (error) {
      console.log(error);
    }
  }

  async getItems(req, res) {
    const items = await ItemService.getItems();
    const stores = await StoreService.getStores(items);

    res.json({
      items,
      stores,
    });
  }

  async updateItem(req, res) {
    try {
      const item = await ItemSchema.findById({ _id: req.body._id });

      await ItemService.updateItem(item._id, req);
      await ContainerService.updateContainer(item, req);
      await StoreService.updateStore(item, req);
      await ProviderService.updateProviders(item, req);
      await ImporterService.updateImporters(item, req);

      res.json(await ItemSchema.findById({ _id: req.body._id }));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(req, res) {
    try {
      const item = await ItemSchema.findById(req.body._id).exec();

      await ItemService.deleteItem(req.body._id);
      await ImporterService.deleteImporters(item);
      await ContainerService.deleteContainer(item);
      await StoreService.deleteStore(item);
      await ProviderService.deleteProviders(item);

      res.json(200);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ItemController();
