const DeclarationService = require("../service/declaration-service");
const ProductService = require("../service/product-service");
const ItemService = require("../service/item-service");

const ItemSchema = require("../models/item-model");
const ProductSchema = require("../models/product-model");
const UserSchema = require("../models/user-model");
const dayjs = require("dayjs");

class ItemController {
  async itemCreate(req, res) {
    const creator = await UserSchema.findById(req.userId);

    if (!creator)
      return res.status(403).json({ message: "NO CREATOR FOUND !" });

    const item = await ItemService.createItem(req);

    if (item.success) return res.sendStatus(200);
    else return res.status(400).json({ error: item.error });
  }

  async getItems(req, res) {
    const result = await ItemService.getItems(req.params.page);
    res.json({
      items: result.items,
      totalPages: result.totalPages,
    });
  }

  async calculateDates(req, res) {
    const result = await ItemService.calculateDates(req);

    if (result.success) res.json({ message: "success" });
    else res.status(500).json(result.error);
  }

  async getHiddenItems(req, res) {
    const items = await ItemService.getHiddenItems();

    res.json({ items });
  }

  async hideItem(req, res) {
    const result = await ItemService.hideItem(req);

    res.json(result);
  }

  async updateFormulaDates(req, res) {
    const result = await ItemService.updateFormulaDates(req.body._id, req);

    if (result) res.sendStatus(200);
    else res.status(500).json({ message: "server error" });
  }

  async updateComment(req, res) {
    await ItemService.updateComment(req.body._id, req);

    res.sendStatus(200);
  }

  async updateItem(req, res) {
    const response = await ItemService.updateItem(req);

    console.log(response);

    if (response.success) res.status(200).json({ success: response.success });
    else res.status(400).json({ error: response.error });
  }

  async findItemsBySearch(req, res) {
    try {
      const isDate = isNaN(
        new Date(dayjs(req.body.query_string).format("DD/MM/YYYY")).getTime()
      );

      const searchDate = new Date(
        dayjs(req.body.query_string).format("DD/MM/YYYY")
      );

      const startDate = new Date(
        searchDate.getFullYear(),
        searchDate.getMonth(),
        searchDate.getDate()
      );
      const endDate = new Date(
        searchDate.getFullYear(),
        searchDate.getMonth(),
        searchDate.getDate() + 1
      );

      const searchTerm = isDate
        ? req.body.query_string
        : new Date(dayjs(req.body.query_string).format("DD/MM/YYYY"));

      const searchFilter = req.body.search_filter;

      const dateQuery = {
        $or: [
          { request_date: { $gte: startDate, $lt: endDate } },
          { ready_date: { $gte: startDate, $lt: endDate } },
          { etd: { $gte: startDate, $lt: endDate } },
          { load_date: { $gte: startDate, $lt: endDate } },
          { eta: { $gte: startDate, $lt: endDate } },
          { release: { $gte: startDate, $lt: endDate } },
          { date_do: { $gte: startDate, $lt: endDate } },
          { declaration_issue_date: { $gte: startDate, $lt: endDate } },
          { availability_of_ob: { $gte: startDate, $lt: endDate } },
          { answer_of_ob: { $gte: startDate, $lt: endDate } },
          { train_arrive_date: { $gte: startDate, $lt: endDate } },
          { train_depart_date: { $gte: startDate, $lt: endDate } },
          { store_arrive_date: { $gte: startDate, $lt: endDate } },
        ],
      };

      const items =
        searchFilter === "other"
          ? await ItemSchema.find(
              isDate
                ? {
                    hidden: false,
                    $text: { $search: req.body.query_string },
                  }
                : dateQuery
            ).exec()
          : [];

      if (items.length === 0) {
        const products = await ProductSchema.find({
          $or: [
            { hs_code: searchTerm },
            { article: { $regex: searchTerm, $options: "i" } },
            { trade_mark: { $regex: searchTerm, $options: "i" } },
            { model: { $regex: searchTerm, $options: "i" } },
            { modification: { $regex: searchTerm, $options: "i" } },
            { product_name: { $regex: searchTerm, $options: "i" } },
            { manufacturer: { $regex: searchTerm, $options: "i" } },
          ],
        }).exec();
        const itemIds = products.map((product) => {
          return product.item_id;
        });
        const uniqueIds = itemIds.filter((element, index) => {
          return itemIds.indexOf(element) === index;
        });

        const getItems = uniqueIds.map(async (id) => {
          return await ItemSchema.findById(id);
        });
        Promise.all(getItems).then((result) => {
          return res.json(result.filter((res) => res !== null && !res.hidden));
        });
      } else {
        res.json(items.filter((item) => item !== null && !item.hidden));
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json([]);
    }
  }

  async deleteItem(req, res) {
    try {
      const item = await ItemSchema.findById(req.params._id).exec();

      await ItemService.deleteItem(req.params._id);
      await DeclarationService.deleteDeclarationStatus(item.declaration_number);
      await ProductService.deleteProduct(item._id);

      res.json(200);
    } catch (error) {
      console.log(error);
    }
  }

  async updateDistance(req, res) {
    const result = await ItemService.updateDistance(req);

    if (result.success) res.status(200).json({ message: "success" });
    else res.status(400).json(result.error);
  }

  async getItemsFilter(req, res) {
    const result = await ItemService.getItemsFilter(req.query);

    if (result.success) res.status(200).json({ items: result.items });
    else res.status(400).json(result.error);
  }

  async updateDocs(req, res) {
    const result = await ItemService.updateDocs(req);

    if (result.success) res.status(200).json({ success: result.success });
    else res.status(400).json(result.error);
  }

  async uploadExcel(req, res) {
    const result = ItemService.uploadExcel(req.file.path);

    res.sendStatus(200);
  }

  async findByKeyValue(req, res) {
    const result = await ItemService.findByKeyValue(req);

    if (result.success) res.status(200).json(result.response);
    else res.status(400).json({ error: result.error });
  }

  async uploadGlobal(req, res) {
    const result = await ItemService.uploadGlobal(req.file.path);

    console.log(result);

    if (result.success) res.status(200).json(result.response);
    else res.status(400).json({ error: result.error });
  }
}

module.exports = new ItemController();
