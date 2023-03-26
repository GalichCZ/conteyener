const FileService = require("../service/file-service");
const DeclarationService = require("../service/declaration-service");
const ContainerService = require("../service/container-service");
const ProductService = require("../service/product-service");
const IsDocsService = require("../service/isDocs-service");
const ItemService = require("../service/item-service");

const ItemSchema = require("../models/item-model");
const UserSchema = require("../models/user-model");

class UploadOnceController {
  async uploadItems(req, res) {
    try {
      const file = await FileService.createFile(req.file.path);
      file[0].map(async (item) => {
        if (!item["Дата выгрузки"]) {
          const container = await ContainerService.getContainerOnce(
            item["Номер контейнера"],
            item["Тип конт."]
          );

          await ItemService.createItemOnce(
            item["Дата выхода в море"],
            item["Дата получения заявки"],
            item["Товар"],
            item["Склад"],
            item["Место отправки"],
            item["Линия"],
            item["Дата готовн."],
            item["Дата загрузки"],
            item["КС"],
            item["ТД"],
            item["Порт"],
            item["Номер декларации"],
            item["ст. прибытия"],
            item["Осталось км до ст. н."],
            item["Комментарий"],
            store,
            container,
            provider,
            importer,
            orders
          );
        }
      });
      res.json("success");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

module.exports = new UploadOnceController();
