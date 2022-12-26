const FileService = require("../service/file-service");
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

class UploadOnceController {
  async uploadItems(req, res) {
    try {
      const file = await FileService.createFile(req.file.path);
      file[0].map(async (item) => {
        // console.log(item);
        if (!item["Дата выгрузки"]) {
          const container = await ContainerService.getContainerOnce(
            item["Номер контейнера"],
            item["Тип конт."]
          );
          const provider = await ProviderService.createProviderOnce(
            [item["Поставщик"]],
            container
          );
          const importer = await ImporterService.createImporterOnce(
            [item["Получатель"]],
            container
          );
          const store = await StoreService.createStoreUpload(item["Склад"]);
          const orders = await OrderService.createOrderOnce(
            [item["Номер заказа"]],
            container
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

          // const doc = new ItemSchema({
          //   request_date: item["Дата получения заявки"],
          //   order_number:
          //     item["Номер заказа"] &&
          //     (await OrderService.createOrder([item["Номер заказа"]])),
          //   container: await ContainerService.createContainer(
          //     item["Номер контейнера"],
          //     item["Тип конт."]
          //   ),
          //   simple_product_name: item["Товар"],
          //   providers:
          //     item["Поставщик"] &&
          //     (await ProviderService.createProvider([item["Поставщик"]])),
          //   importers:
          //     item["Получатель"] &&
          //     (await ImporterService.createImporter([item["Получатель"]])),
          //   store_name: item["Склад"],
          //   store:
          //     item["Склад"] &&
          //     (await StoreService.createStoreUpload(item["Склад"])),
          //   place_of_dispatch: item["Место отправки"],
          //   line: item["Линия"],
          //   ready_date: item["Дата готовн."],
          //   load_date: item["Дата загрузки"],
          //   etd: item["Дата выхода в море"],
          //   eta: item["Дата прибытия"],
          //   release: item[""],
          //   bl_smgs_cmr: item["КС"] === "+" ? true : false,
          //   td: item["ТД"] === "+" ? true : false,
          //   date_do: item["Дата ДО"],
          //   port: item["Порт"],
          //   declaration_number: item["Номер декларации"],
          //   declaration_issue_date: item["Дата выпуска декларации"],
          //   destination_station: item["ст. прибытия"],
          //   km_to_dist: item["Осталось км до ст. н."],
          //   train_arrive_date: item["Дата отправки по ЖД"],
          //   comment: item["Комментарий"],
          // });
          // // await doc.save();
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
