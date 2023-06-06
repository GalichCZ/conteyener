const ItemSchema = require("../models/item-model");
const TechStoreSchema = require("../models/techStore-model");
const FormulaService = require("./formula-service");
const ProductService = require("./product-service");
const FileService = require("./file-service");
const StockPlaceSchema = require("../models/stockPlace-model");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const { checkDuplicates, checkDuplicatesArray } = require("./check-duplicates");

const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
dayjs.extend(customParseFormat);

function errorReturn(error) {
  return {
    success: false,
    error,
  };
}

function findNewElements(oldArray, newArray) {
  const oldArraySet = new Set(oldArray);

  const newElements = newArray.filter((element) => !oldArraySet.has(element));

  return newElements;
}

function filterDuplicates(array) {
  return array.filter((element, index) => {
    return dataToFiltr.indexOf(element) === index && element !== null;
  });
}

class ItemService {
  async createItem(req) {
    try {
      const delivery_method = req.body.delivery_method;
      const store_name = await TechStoreSchema.findById({
        _id: req.body.store,
      }).exec();

      const duplicatesOrder = await checkDuplicates(
        req.body.order_number,
        "order_number"
      );

      if (duplicatesOrder.isDuplicate) {
        return errorReturn(
          `Повторяющийся № заказа: ${duplicatesOrder.duplicates}`
        );
      }

      const isDocsArray = [];

      req.body.order_number.map((num) => {
        isDocsArray.push({
          PI: false,
          CI: false,
          PL: false,
          SS_DS: false,
          contract_agrees: false,
          cost_agrees: false,
          instruction: false,
          ED: false,
          bill: false,
          order_number: num,
        });
      });

      const doc = await new ItemSchema({
        request_date: req.body.request_date,
        order_number: req.body.order_number,
        simple_product_name: req.body.simple_product_name,
        delivery_method,
        providers: req.body.providers,
        importers: req.body.importers,
        conditions: req.body.conditions,
        store_name: store_name && store_name.name,
        agent: req.body.agent,
        store: req.body.store,
        direction: req.body.direction,
        container_type: req.body.container_type,
        place_of_dispatch: req.body.place_of_dispatch,
        is_docs: isDocsArray,
      });

      await doc.save();
      return { success: true };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE ITEM ERROR:\n${error}`
      );
      console.log("ERROR LOG:", error);
      return { success: false, error };
    }
  }

  async updateDocs(req) {
    try {
      const item = await ItemSchema.findById(req.body._id);

      const oldArray = item.is_docs;

      const newArray = oldArray.map((doc) =>
        doc.order_number === req.body.is_docs.order_number
          ? req.body.is_docs
          : doc
      );

      await ItemSchema.updateOne({ _id: req.body._id }, { is_docs: newArray });

      return { success: true };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE DOCS ERROR:\n${error}`
      );
      console.log(error);
      return { success: false, error };
    }
  }

  async getItems(page) {
    try {
      const perPage = 100;
      const itemCount = await ItemSchema.countDocuments({
        hidden: false,
      }).exec();

      const totalPages = Math.ceil(itemCount / perPage);

      const skipDocuments = (page - 1) * perPage;

      const items = await ItemSchema.find({
        hidden: false,
      })
        .skip(skipDocuments)
        .limit(perPage)
        .exec();

      return { items, totalPages };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET ITEMS ERROR:\n${error}`
      );
      console.log(error);
    }
  }

  async getItemsFilter(query_keys) {
    try {
      const query = {};
      Object.keys(query_keys).forEach((key) => {
        if (query_keys[key] === "[]") {
          query[key] = { $size: 0 };
        } else if (query_keys[key] === "null") {
          query[key] = { $eq: null };
        } else {
          query[key] = { $in: query_keys[key] };
        }
      });
      console.log(query);
      const items = await ItemSchema.find(query).exec();
      return { success: true, items };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET FILTERED ITEMS ERROR:\n${error}`
      );
      console.log(error);
      return { success: false, error };
    }
  }

  async getHiddenItems() {
    try {
      const items = await ItemSchema.find({
        hidden: true,
      }).exec();

      return items;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nGET HIDDEN ITEMS ERROR:\n${error}`
      );
      console.log(error);
      return error;
    }
  }

  async hideItem(req) {
    try {
      const _id = req.body._id;
      return await ItemSchema.updateOne({ _id }, { hidden: req.body.hidden });
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nHIDE ITEM ERROR:\n${error}`
      );
      return error;
    }
  }

  async updateFormulaDates(_id, req) {
    try {
      const item = await ItemSchema.findById(_id).exec();

      const {
        eta,
        eta_update,
        date_do,
        date_do_update,
        declaration_issue_date,
        declaration_issue_date_update,
        train_depart_date,
        train_depart_date_update,
        train_arrive_date,
        train_arrive_date_update,
        store_arrive_date,
        store_arrive_date_update,
      } = await FormulaService.updateFormulaDates(req, item);

      await ItemSchema.updateOne(
        { _id },
        {
          eta,
          eta_update,
          date_do,
          date_do_update,
          declaration_issue_date,
          declaration_issue_date_update,
          train_depart_date,
          train_depart_date_update,
          train_arrive_date,
          train_arrive_date_update,
          store_arrive_date,
          store_arrive_date_update,
        }
      );

      return { message: "success" };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateComment(_id, req) {
    try {
      return await ItemSchema.updateOne(
        { _id },
        {
          comment: req.body.comment,
        }
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async calculateDates(req) {
    try {
      const _id = req.body.itemId;
      const item = await ItemSchema.findById(_id);

      let delivery_channel = "";
      let etd = null;

      if (req.body.etd) etd = req.body.etd;
      else if (item.etd) etd = item.etd;
      else etd = null;

      if (req.body.delivery_channel.length > 0)
        delivery_channel = req.body.delivery_channel;
      else if (item.delivery_channel.length > 0)
        delivery_channel = item.delivery_channel;
      else delivery_channel = "";

      const formulaRes = await FormulaService.dateFormula(
        etd,
        delivery_channel
      );

      await ItemSchema.updateOne(
        {
          _id,
        },
        {
          etd,
          eta: formulaRes.eta,
          date_do: formulaRes.date_do,
          declaration_issue_date: formulaRes.declaration_issue_date,
          train_depart_date: formulaRes.train_depart_date,
          train_arrive_date: formulaRes.train_arrive_date,
          store_arrive_date: formulaRes.store_arrive_date,
          delivery_channel,
        }
      );
      return { success: true };
    } catch (error) {
      console.log(error);
      return { error, success: false };
    }
  }

  async updateItem(req) {
    try {
      const _id = req.body._id;
      const item = await ItemSchema.findById(_id).exec();

      const duplicatesOrder = await checkDuplicatesArray(
        req.body.order_number,
        "order_number",
        _id
      );

      if (duplicatesOrder.isDuplicate) {
        return errorReturn(
          `Повторяющийся № заказа: ${duplicatesOrder.duplicates}`
        );
      }

      const duplicateContainerNumber = await checkDuplicates(
        req.body.container_number,
        "container_number"
      );

      if (duplicateContainerNumber.isDuplicate) {
        return errorReturn(
          `Повторяющийся № контейнера: ${duplicateContainerNumber.duplicate}`
        );
      }

      const duplicatesInside = await checkDuplicatesArray(
        req.body.inside_number,
        "inside_number",
        _id
      );

      if (duplicatesInside.isDuplicate) {
        return errorReturn(
          `Повторяющийся внутренний №: ${duplicatesInside.duplicates}`
        );
      }

      const duplicatesProform = await checkDuplicatesArray(
        req.body.proform_number,
        "proform_number",
        _id
      );

      if (duplicatesProform.isDuplicate) {
        return errorReturn(
          `Повторяющийся № проформы: ${duplicatesProform.duplicates}`
        );
      }

      const duplicatesDeclaration = await checkDuplicatesArray(
        req.body.declaration_number,
        "declaration_number",
        _id
      );

      if (duplicatesDeclaration.isDuplicate) {
        return errorReturn(
          `Повторяющийся № декларации: ${duplicatesDeclaration.duplicates}`
        );
      }

      const stock_place =
        req.body.stock_place &&
        (await StockPlaceSchema.findById({
          _id: req.body.stock_place,
        }));

      const store_name =
        req.body.store &&
        (await TechStoreSchema.findById({
          _id: req.body.store,
        }));

      const simple = req.body.simple_product_name.map(
        async (simpleName, index) => {
          await ProductService.updateProduct(
            _id,
            undefined,
            simpleName,
            item.simple_product_name[index]
          );
        }
      );

      Promise.all(simple).then((res) => {
        return res;
      });

      const newArray = req.body.is_docs;
      const newOrderNumbers = findNewElements(
        item.order_number,
        req.body.order_number
      );

      if (newOrderNumbers.length > 0) {
        newOrderNumbers.forEach((number) => {
          newArray.push({
            PI: false,
            CI: false,
            PL: false,
            SS_DS: false,
            contract_agrees: false,
            cost_agrees: false,
            instruction: false,
            ED: false,
            bill: false,
            order_number: number,
          });
        });
      }

      await ItemSchema.updateOne(
        {
          _id,
        },
        {
          request_date: req.body.request_date,
          order_number: req.body.order_number,
          inside_number: req.body.inside_number,
          proform_number: req.body.proform_number,
          container_number: req.body.container_number,
          container_type: req.body.container_type,
          providers: req.body.providers,
          importers: req.body.importers,
          simple_product_name: req.body.simple_product_name,
          delivery_method: req.body.delivery_method,
          conditions: req.body.conditions,
          agent: req.body.agent,
          place_of_dispatch: req.body.place_of_dispatch,
          line: req.body.line,
          ready_date: req.body.ready_date,
          load_date: req.body.load_date,
          release: req.body.release,
          bl_smgs_cmr: req.body.bl_smgs_cmr,
          td: req.body.td,
          port: req.body.port,
          is_ds: req.body.is_ds,
          fraht_account: req.body.fraht_account,
          is_docs: req.body.is_docs,
          declaration_number: req.body.declaration_number,
          availability_of_ob: req.body.availability_of_ob,
          answer_of_ob: req.body.answer_of_ob,
          direction: req.body.direction,
          expeditor: req.body.expeditor,
          destination_station: req.body.destination_station,
          km_to_dist: req.body.km_to_dist,
          pickup: req.body.pickup,
          comment: req.body.comment,
          stock_place_name: stock_place && stock_place.name,
          stock_place: req.body.stock_place,
          store_name: store_name && store_name.name,
          store: req.body.store,
          fraht: req.body.fraht,
          bid: req.body.bid,
          note: req.body.note,
        }
      );
      return { success: true };
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE ITEM ERROR:\n${error}`
      );
      console.log(error);
      return { success: false, error };
    }
  }

  async deleteItem(_id) {
    try {
      await ItemSchema.deleteOne({ _id });
    } catch (error) {
      console.log(error);
    }
  }

  async updateDistance(req) {
    try {
      await ItemSchema.updateOne(
        {
          _id: req.body._id,
        },
        {
          km_to_dist: req.body.km_to_dist,
        }
      );
      return { success: true };
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE DISTANCE ERROR:\n${error}`
      );
      return { success: false, error };
    }
  }

  async uploadExcel(file) {
    try {
      const json = await FileService.createFile(file);
      //TODO: parse all items in excel and change items by container number,
      //also add column names to buffer "ctrl+v" on button click
      console.log(json);
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  }

  async findByKeyValue(req) {
    try {
      const key = req.params.key;
      const value = req.params.keyValue;
      const query = {};
      query[key] = { $regex: value, $options: "i" };
      const items = await ItemSchema.find(query).exec();
      console.log(items[key]);
      const response = filterDuplicates(items[key]);

      return { success: true, response };
    } catch (error) {
      return errorReturn(error);
    }
  }

  async uploadGlobal(file) {
    try {
      const json = await FileService.createFile(file);

      function checkBoolean(value) {
        if (value === "+") return true;
        return false;
      }
      function checkDate(value) {
        if (value instanceof Date) return value;
        else return null;
      }
      function splitStrings(value) {
        if (value !== undefined && typeof value === "string")
          return value.split("\n");
        else return [];
      }
      function castToNum(value) {
        if (value && typeof value === "string") {
          const number = parseInt(value.replace(/[^\d.-]/g, ""));
          return number;
        } else return value;
      }
      splitStrings(json[0][1]["Поставщик"]);
      const items = json[0].map(async (item) => {
        const doc = new ItemSchema({
          request_date: checkDate(item["Дата получения заявки"]),
          inside_number: splitStrings(item["Внутренний Номер"]),
          proform_number: splitStrings(item["Номер проформы"]),
          order_number: splitStrings(item["Номер заказа"]),
          container_number: item["Номер контейнера"],
          simple_product_name: splitStrings(item["Товар"]),
          delivery_method: item["способ доставки"],
          providers: splitStrings(item["Поставщик"]),
          importers: splitStrings(item["Импортер"]),
          conditions: splitStrings(item["Условия поставки"]),
          direction: item["Направление"],
          store_name: item["Склад"],
          agent: item["агент"],
          container_type: item["Тип конт."],
          place_of_dispatch: item["Место отправки"],
          line: item["Линия"],
          ready_date: checkDate(item["Дата готовн."]),
          load_date: checkDate(item["Дата загрузки"]),
          etd: checkDate(item.ETD),
          eta: checkDate(item.ETA),
          release: checkDate(item["Релиз"]),
          bl_smgs_cmr: checkBoolean(item["BL/СМГС/CMR"]),
          date_do: checkDate(item["Дата ДО"]),
          port: item["Порт"],
          is_ds: checkBoolean(item["Д/С для подачи"]),
          fraht_account: item["фр счет"],
          declaration_number: splitStrings(item["Номер декларации"]),
          declaration_issue_date: checkDate(item["Дата выпуска декларации"]),
          answer_of_ob: checkDate(item["ответ ОБ"]),
          expeditor: item["Экспедитор"],
          destination_station: item["ст. прибытия"],
          km_to_dist: castToNum(item["Осталось км до ст. н."]),
          train_depart_date: checkDate(item["Дата отправки по ЖД"]),
          pickup: item["Автовывоз"],
          train_arrive_date: checkDate(item["Дата прибытия по ЖД"]),
          store_arrive_date: checkDate(item["Дата выгрузки"]),
        });
        const docs = await doc.save();
        return docs;
      });

      const response = Promise.all(items).then(async (result) => {});

      return { success: true, response };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  }
}

module.exports = new ItemService();
