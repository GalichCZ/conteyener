const DeclarationService = require("../service/declaration-service");
const ContainerService = require("../service/container-service");
const ProviderService = require("../service/provider-service");
const ImporterService = require("../service/importer-service");
const ProductService = require("../service/product-service");
const IsDocsService = require("../service/isDocs-service");
const StoreService = require("../service/store-service");
const ItemService = require("../service/item-service");

const ItemSchema = require("../models/item-model");
const UserSchema = require("../models/user-model");
const OrderService = require("../service/order-service");

class ItemController {
  async itemCreate(req, res) {
    const creator = await UserSchema.findById(req.userId);

    if (!creator)
      return res.status(403).json({ message: "NO CREATOR FOUND !" });

    const container = await ContainerService.getContainer(req);

    const provider = await ProviderService.createProvider(
      req.body.providers,
      container._id
    );

    const importer = await ImporterService.createImporter(
      req.body.importers,
      container._id
    );

    const store = await StoreService.createStore(req.body.tech_store);

    console.log(req.body.tech_store);
    console.log(store);

    const is_docs = await IsDocsService.createDocs(req, container);

    const item = await ItemService.createItem(
      req,
      store,
      container,
      provider,
      importer,
      creator,
      is_docs
    );

    if ("code" in item) return res.json({ error: "duplicated key" });

    res.status(200).json(item);
  }

  async getItems(req, res) {
    const items = await ItemService.getItems();

    res.json({
      items,
    });
  }

  async updateComment(req, res) {
    await ItemService.updateComment(req.body._id, req);

    res.sendStatus(200);
  }

  async updateItem(req, res) {
    try {
      const item = await ItemSchema.findById({ _id: req.body._id });

      console.log(req.body);

      const container = await ContainerService.updateContainer(
        item.container._id,
        req
      );
      await ProviderService.updateProviders(item, req);
      await ImporterService.updateImporters(item, req);
      await OrderService.updateOrders(item, req);

      await ItemService.updateItem(item._id, req, container);

      res.json(await ItemSchema.findById({ _id: req.body._id }));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(req, res) {
    try {
      const item = await ItemSchema.findById(req.params._id).exec();

      await ItemService.deleteItem(req.params._id);
      await ImporterService.deleteImporters(item);
      await ContainerService.deleteContainer(item);
      await StoreService.deleteStore(item);
      await ProviderService.deleteProviders(item);
      await DeclarationService.deleteDeclarationStatus(item.declaration_number);
      await ProductService.deleteProduct(item.container.container_number);
      await IsDocsService.deleteDocs(item.container);
      await OrderService.deleteOrders(item);

      res.json(200);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ItemController();
