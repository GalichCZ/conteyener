const DeclarationService = require("../service/declaration-service");
const ContainerService = require("../service/container-service");
const ProviderService = require("../service/provider-service");
const ImporterService = require("../service/importer-service");
const ProductService = require("../service/product-service");
const IsDocsService = require("../service/isDocs-service");
const StoreService = require("../service/store-service");
const OrderService = require("../service/order-service");
const ItemService = require("../service/item-service");

const ItemSchema = require("../models/item-model");
const UserSchema = require("../models/user-model");

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

    const orders = await OrderService.createOrder(
      req.body.order_number,
      container
    );
    if ("message" in orders[0]) {
      console.log(orders);
      return res.json({ error: orders[0].message });
    }

    const is_docs = await IsDocsService.createDocs(req, container);

    const item = await ItemService.createItem(
      req,
      store,
      container,
      provider,
      importer,
      orders,
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

  async getHiddenItems(req, res) {
    const items = await ItemService.getHiddenItems();

    res.json({ items });
  }

  async updateFormulaDates(req, res) {
    const result = await ItemService.updateFormulaDates(req.body._id, req);

    console.log(result);

    if (result) res.sendStatus(200);
    else res.status(500).json({ message: "server error" });
  }

  async updateComment(req, res) {
    await ItemService.updateComment(req.body._id, req);

    res.sendStatus(200);
  }

  async updateItem(req, res) {
    try {
      const item = await ItemSchema.findById({ _id: req.body._id });

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

  async findItemsBySearch(req, res) {
    try {
      const items = await ItemSchema.find({
        $text: { $search: req.body.query_string },
      });
      res.json(items);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
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
      await ProductService.deleteProduct(item._id);
      await IsDocsService.deleteDocs(item.container);
      await OrderService.deleteOrders(item);

      res.json(200);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ItemController();
