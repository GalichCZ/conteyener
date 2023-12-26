const ItemSchema = require("../models/item-model");
const TechStoreSchema = require("../models/techStore-model");
const ProductSchema = require("../models/product-model");
const FormulaService = require("./formula-service");
const ProductService = require("./product-service");
const StoreRepository = require("../repositories/store.repository");
const StockRepository = require("../repositories/stockPlace.repository");
const DeliveryChannelRepository = require("../repositories/deliveryChannel.repository");
const ItemRepository = require("../repositories/item.repository");
const FileService = require("./file-service");
const StockPlaceSchema = require("../models/stockPlace-model");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const { checkDuplicates, checkDuplicatesArray } = require("./check-duplicates");
const {
  checkBoolean,
  checkDate,
  splitStrings,
  castToNum,
} = require("../utils/tableDataHandle");
const { getDateNameByType } = require("../utils/getDateNameByType");
const { createDocsArray } = require("../utils/createDocsArray");
const { clearString } = require("../utils/clearString");
const { BidColumns, datesColumns } = require("../enums/bidColumns.enum");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
dayjs.extend(customParseFormat);

function errorReturn(error) {
  return {
    success: false,
    error,
  };
}
function successReturn(result) {
  return { success: true, result };
}

class ItemService {
  async createItem(req) {
    try {
      const delivery_method = req.body.delivery_method;
      const store_name = await TechStoreSchema.findById({
        _id: req.body.store,
      }).exec();

      const orderNumbers = Object.values(req.body.order_number).map(order => order.order_number);

      const duplicatesOrder = await checkDuplicates(
          orderNumbers,
        "order_number"
      );

      if (duplicatesOrder.isDuplicate) {
        return errorReturn(
          `Повторяющийся № заказа: ${duplicatesOrder.duplicate.join(", ")}`
        );
      }

      const isDocsArray = [];

      orderNumbers.map((num) => {
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
        request_date: checkDate(req.body.request_date),
        order_number: orderNumbers,
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
      const item = await ItemSchema.findById(req.body.bidId);

      const oldArray = item.is_docs;

      const newArray = oldArray.map((doc) =>
        doc.order_number === req.body.is_docs.order_number
          ? req.body.is_docs
          : doc
      );

      await ItemSchema.updateOne(
        { _id: req.body.bidId },
        { is_docs: newArray }
      );

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

  async getItems(page, hidden) {
    try {
      const _page = page === "0" ? 1 : page;
      const perPage = 50;
      const itemCount = await ItemSchema.countDocuments({
        hidden,
      }).exec();

      const totalPages = Math.ceil(itemCount / perPage);

      const skipDocuments = (_page - 1) * perPage;

      const items = await ItemSchema.find({
        hidden,
      }).sort({request_date: 1})
        .populate("delivery_channel", "name")
        .populate("store", "name")
        .populate("stock_place", "name")
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

  async getHiddenItems(page) {
    try {
      const perPage = 50;

      const itemCount = await ItemSchema.countDocuments({
        hidden: true,
      }).exec();

      const totalPages = Math.ceil(itemCount / perPage);
      const skipDocuments = (page - 1) * perPage;

      const items = await ItemSchema.find({ hidden: true }).sort({request_date: 1})
        .skip(skipDocuments)
        .limit(perPage)
        .exec();

      return { items, totalPages };
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

  /**
   * create api request that returns all values of exact key
   * get requesrt
   * param?key_name=
   * returns array of values
   */

  removeDuplicates(arr) {
    const isDate = arr[0] instanceof Date;
    const stringArr = isDate ? arr.map(item=>item.toISOString()) : arr;
    return [...new Set(stringArr)]
  }

  async getKeyFilters(key_name, isHidden) {
    try {
      const declarationNumbers = await ItemSchema.find(
        { hidden: isHidden },
        key_name
      ).populate("delivery_channel", "name")
          .populate("store", "name")
          .populate("stock_place", "name")
          .exec();
      const valuesArrays = declarationNumbers.map((num) => num[key_name]);
      const values = Array.isArray(valuesArrays[0])
        ? [].concat(...valuesArrays)
        : valuesArrays;

      const clearArr = this.removeDuplicates(values.filter((val) => val !== null && val !== undefined))

      const booleans = {
        bl_smgs_cmr:"bl_smgs_cmr",
        td:"td",
        is_ds:"is_ds",
      }

      function sort() {
        if(key_name === "km_to_dist"){
          return clearArr.sort((a, b) => a - b)
        }
        if(booleans[key_name]){
          return clearArr
        }
        return clearArr.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      }

      const sortedData = sort()

      return {
        success: true,
        values: sortedData
      };
    } catch (error) {
      return { success: false, error };
    }
  }

  async findItemsBySearch(query_string, search_filter, isHidden) {
    try {
      const regex = new RegExp(query_string, "i");
      const query = { $regex: regex };
      const items =
        search_filter === "other"
          ? await ItemSchema.find({
              $or: [
                { inside_number: query },
                { proform_number: query },
                { order_number: query },
                { simple_product_name: query },
                { providers: query },
                { importers: query },
                { container_number: query },
                { container_type: query },
                { conditions: query },
                { direction: query },
                { store_name: query },
                { agent: query },
                { fraht: query },
                { fraht_account: query },
                { place_of_dispatch: query },
                { delivery_method: query },
                { line: query },
                { port: query },
                { declaration_number: query },
                { expeditor: query },
                { destination_station: query },
                { pickup: query },
                { stock_place_name: query },
                { stock_place_name: query },
              ],
              hidden: isHidden,
            }).sort({request_date: 1})
              .populate("delivery_channel", "name")
              .populate("store", "name")
              .populate("stock_place", "name")
              .exec()
          : [];

      if (items.length === 0) {
        const query = { $regex: regex };

        const products = await ProductSchema.find({
          $or: [
            { hs_code: query },
            { article: query },
            { trade_mark: query },
            { model: query },
            { modification: query },
            { product_name: query },
            { manufacturer: query },
          ],
        }).exec();

        const itemIds = products.map((product) => {
          return product.item_id;
        });
        const uniqueIds = itemIds.filter((element, index) => {
          return itemIds.indexOf(element) === index;
        });
        const getItems = uniqueIds.map(async (id) => {
          return await ItemSchema.findById(id).sort({request_date: 1})
            .populate("delivery_channel", "name")
            .populate("store", "name")
            .populate("stock_place", "name");
        });
        return this.test(getItems, isHidden)
          .then((filteredArray) => {
            return filteredArray;
          })
          .catch((error) => {
            console.error("Error:", error);
            return [];
          });
      } else {
        return items.filter(
          (item) => item !== null && item.hidden === isHidden
        )
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async test(getItems, isHidden) {
    try {
      const result = await Promise.all(getItems);
      return result.filter(
        (res) => res !== null && res.hidden === isHidden
      );
    } catch (error) {
      return [];
    }
  }

  async getItemsFilter(query_keys, isHidden) {
    try {
      const objectForQuery = {};

      query_keys.forEach((key) => {
        const keyName = Object.keys(key)[0];
        const hasNull = key[keyName].includes("null");
        const hasNotNull = key[keyName].includes("not_null");
        const whatToSet = hasNull ? "null" : "not_null";

        if(hasNull || hasNotNull) {
          objectForQuery[keyName] = whatToSet;
        }
        else {
          objectForQuery[keyName] = key[keyName];
        }
      })

      const valuesToMatch = [null, ""];
      let isAggregate = false;
      let query = { hidden: isHidden };

      const isArrayPole = (key) =>
        key === "declaration_number" ||
        key === "order_number" ||
        key === "proform_number" ||
        key === "inside_number" ||
        key === "simple_product_name" ||
        key === "providers" ||
        key === "importers" ||
        key === "conditions";

      const ascDescSort = {}

      Object.keys(objectForQuery).forEach((key) => {
        if (key === 'is_docs') {
          const elemMatch = {}
          const names = {
            PI: "PI",
            CI: "CI",
            PL: "PL",
            SS_DS: "SS_DS",
            CONTRACT_AGREES: "contract_agrees",
            COST_AGREES: "cost_agrees",
            INSTRUCTION: "instruction",
            ED: "ED",
            BILL: "bill",
          }
          objectForQuery[key].forEach(fieldName => (elemMatch[names[fieldName]] = false));
          return query[key] = {
              $elemMatch: elemMatch
          }
        }

        if (objectForQuery[key] === "null" && isArrayPole(key)) {
          return (query[key] = { $size: 0 });
        } else if (objectForQuery[key] === "not_null" && isArrayPole(key)) {
          isAggregate = true;
          return (query = [
            {
              $match: {
                $expr: {
                  $gt: [{ $size: `$${key}` }, 0],
                },
              },
            },
          ]);
        }

        // if (objectForQuery[key].includes('asc') || objectForQuery[key].includes('desc')) {
        //   return ascDescSort[key] = objectForQuery[key];
        // }

        if (objectForQuery[key] === "null") {
          query[key] = { $in: valuesToMatch };
        } else if (objectForQuery[key] === "not_null") {
           query[key] = { $ne: null };
        } else {
           query[key] = { $in: objectForQuery[key] };
        }
      });

      const items = isAggregate
        ? await ItemSchema.aggregate([
            ...query,
            { $sort: { request_date: 1 } },
            {
              $lookup: {
                from: 'delivery_channels',
                localField: 'delivery_channel',
                foreignField: '_id',
                as: 'delivery_channel'
              }
            },
            {
              $lookup: {
                from: 'stores',
                localField: 'store',
                foreignField: '_id',
                as: 'store'
              }
            },
            {
              $lookup: {
                from: 'stock_places',
                localField: 'stock_place',
                foreignField: '_id',
                as: 'stock_place'
              }
            },
          ]).exec()
        : await ItemSchema.find(query).sort({request_date: 1})
            .populate("delivery_channel", "name")
            .populate("store", "name")
            .populate("stock_place", "name")
            .exec();

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

  async hideItem(req) {
    try {
      const _id = req.body._id;
      return await ItemSchema.updateOne({ _id }, { hidden: true });
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

  async updateFormulaDatesAfterUpload(dataForChanges) {
    try {
      const result = dataForChanges.map(async (data) => {
        const { _id, delivery_channel, newDate, dateType } = data;

        if (!newDate || !delivery_channel) {
          return;
        }

        const dateName = getDateNameByType(dateType);
        const query = {};
        query[dateName] = null;
        const item = await ItemSchema.findById(_id).exec();
        if (newDate === null) {
          await ItemSchema.updateOne({ _id }, query);
        } else {
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
          } = await FormulaService.updateFormulaDates(
            newDate,
            dateType,
            item,
            delivery_channel
          );

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
        }
      });

      await Promise.all(result);

      return { success: true };
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE DATES AFTER UPLOAD ERROR:\n${error}`
      );
      return { success: false, error };
    }
  }

  async updateFormulaDates(_id, dateType, newDate, deliveryChannel) {
    try {
      const item = await ItemSchema.findById(_id).exec();
      const dateName = getDateNameByType(dateType);
      const query = {};
      query[dateName] = null;
      if (newDate === null) {
        await ItemSchema.updateOne({ _id }, query);
      } else {
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
        } = await FormulaService.updateFormulaDates(
          newDate,
          dateType,
          item,
          deliveryChannel
        );

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
      }

      return { message: "success" };
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE FORMULA DATES ERROR:\n${error}`
      );
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
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE COMMENT ERROR:\n${error}`
      );
      return error;
    }
  }

  async calculateDates(req) {
    try {
      const _id = req.body.bidId;
      const item = await ItemSchema.findById(_id);

      if (req.body.date === null) {
        await ItemSchema.updateOne({ _id }, {
            etd: req.body.date,
            eta: null,
            date_do: null,
            declaration_issue_date: null,
            train_depart_date: null,
            train_arrive_date: null,
            store_arrive_date: null,
            store_arrive_date_update: false,
            train_arrive_date_update: false,
            train_depart_date_update: false,
            declaration_issue_date_update: false,
            date_do_update: false,
            eta_update: false,
        });
      } else {
        let delivery_channel = "";
        let etd = null;

        if (req.body.date) etd = req.body.date;
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
            etd: checkDate(etd),
            eta: checkDate(formulaRes.eta),
            date_do: checkDate(formulaRes.date_do),
            declaration_issue_date: checkDate(formulaRes.declaration_issue_date),
            train_depart_date: checkDate(formulaRes.train_depart_date),
            train_arrive_date: checkDate(formulaRes.train_arrive_date),
            store_arrive_date: checkDate(formulaRes.store_arrive_date),
            delivery_channel,
          }
        );
      }

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

      const orderNumbers = Object.values(req.body.order_number).map(order => order.order_number);

      const duplicatesOrder = await checkDuplicatesArray(
        orderNumbers,
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
        "container_number",
        _id
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

      //TODO: fix declarations
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

      const docs = req.body.is_docs;
      const oldOrderNumbers = item.order_number;
      const newDocs = createDocsArray(docs, oldOrderNumbers, orderNumbers);
      if(newDocs === null) {
        return { success: false, error:"Такой способ изменения № заказа приведет к потере документов для подачи, изменения НЕ сохранены" };
      }

      await ItemSchema.updateOne(
        {
          _id,
        },
        {
          request_date: checkDate(req.body.request_date),
          order_number: orderNumbers,
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
          ready_date: checkDate(req.body.ready_date),
          load_date: checkDate(req.body.load_date),
          release: checkDate(req.body.release),
          bl_smgs_cmr: req.body.bl_smgs_cmr,
          td: req.body.td,
          port: req.body.port,
          is_ds: req.body.is_ds,
          fraht_account: req.body.fraht_account,
          is_docs: newDocs,
          declaration_number: req.body.declaration_number,
          availability_of_ob: checkDate(req.body.availability_of_ob),
          answer_of_ob: checkDate(req.body.answer_of_ob),
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

  async findByKeyValue(req) {
    try {
      const key = req.params.key;
      const value = req.params.keyValue;
      const regex = new RegExp(value, "i");
      const query = {};
      query[key] = { $regex: regex };
      const items = await ItemSchema.find(query).exec();
      const response = [...new Set(items.map((item) => item[key]))];
      return { success: true, response };
    } catch (error) {
      console.log(error);
      return errorReturn(error);
    }
  }

  getLastChangedData(bid) {
    let dateName = null;
    let dateType = null;
    if (checkDate(bid["ETD"])) {
      dateName = "ETD";
      dateType = 1;
    }
    if (checkDate(bid["ETA"])) {
      dateName = "ETA";
      dateType = 2;
    }
    if (checkDate(bid["Дата выпуска декларации"])) {
      dateName = "Дата выпуска декларации";
      dateType = 3;
    }
    if (checkDate(bid["Дата отправки по ЖД"])) {
      dateName = "Дата отправки по ЖД";
      dateType = 4;
    }
    if (checkDate(bid["Дата прибытия по ЖД"])) {
      dateName = "Дата прибытия по ЖД";
      dateType = 5;
    }
    if (checkDate(bid["Дата прибытия на склад"])) {
      dateName = "Дата прибытия на склад";
      dateType = 6;
    }
    return { dateType, dateName };
  }

  async uploadExcel(file) {
    try {
      const { json, colNames } = await FileService.createFile(file);

      const containerNums = json.map((item) => {
        return item["Номер контейнера"];
      });

      const filteredContainers = containerNums.filter(
        (num) => num !== null && num !== undefined
      );

      const lastDatesMap = []; //id, last changed date, delivery channel

      const itemsUpdate = filteredContainers.map(async (num, index) => {
        const tableRow = json[index];

        const requestObject = {};

        const item = await ItemSchema.findOne({ container_number: num });
        const { dateType, dateName } = this.getLastChangedData(tableRow);

        if (item) {
          const objectToAdd = {};
          objectToAdd["_id"] = item._id;
          objectToAdd["delivery_channel"] = item.delivery_channel;
          objectToAdd["newDate"] = tableRow[dateName];
          objectToAdd["dateType"] = dateType;

          lastDatesMap.push(objectToAdd);
        }

        const dateNames = Object.keys(datesColumns);

        //colNames, enum
        for (const col of Object.keys(BidColumns)) {
          const isCol = colNames.includes(col);
          if (isCol) {
            const isDate = dateNames.includes(col);

            const isDecl = BidColumns[col] === "declaration_number";

            if (isDecl) {
              requestObject[BidColumns[col]] = splitStrings(tableRow[col]);
            }
            else if (BidColumns[col] === "store") {
                requestObject[BidColumns[col]] = await StoreRepository.getStoreByName(tableRow[col]);
            }
            else if (isDate && datesColumns[col]) {
              requestObject[BidColumns[col]] = checkDate(tableRow[col])
              requestObject[datesColumns[col]] =
                checkDate(tableRow[col]) !== null;
            } else {
              requestObject[BidColumns[col]] = isDate
                ? checkDate(tableRow[col])
                : clearString(tableRow[col]);
            }
          }
        }

        await ItemSchema.findOneAndUpdate(
          { container_number: num, hidden: false },
          requestObject
        );
      });

      await Promise.all(itemsUpdate);

      return { success: true, lastDatesMap };
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nLOAD EXCEL ERROR:\n${error}`
      );
      return { success: false, error };
    }
  }

  async uploadGlobal(file) {
    try {
      await ItemRepository.deleteAllItems()

      const json = await FileService.createFileOld(file);

      function isDocsHandler(order_number) {
        const orders = splitStrings(order_number);
        const isDocsArray = [];

        orders.map((num) => {
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
        return isDocsArray;
      }

      const items = json[0].map(async (item) => {
        const doc = new ItemSchema({
          request_date: checkDate(item["Дата заявки"]),

          inside_number: splitStrings(item["Внутренний номер"]),

          proform_number: splitStrings(item["Номер проформы"]),

          order_number: splitStrings(item["Номер заказа"]),

          container_number: item["Номер контейнера"],
          /*----------------------------------------*/
          simple_product_name: splitStrings(item["Товар"]),

          delivery_method: item["Способ доставки"],

          providers: splitStrings(item["Поставщик"]),

          importers: splitStrings(item["Импортер"]),

          conditions: splitStrings(item["Условия поставки"]),

          direction: item["Направление"],

          store: (await StoreRepository.getStoreByName(item["Склад"]))?._id,

          delivery_channel: (await DeliveryChannelRepository.getDeliveryChannelByName(item["Канал поставки"]))?._id,

          agent: clearString(item["Агент"]),

          container_type: clearString(item["Тип контейенра"]),

          place_of_dispatch: clearString(item["Место отправки"]),

          line: clearString(item["Линия"]),

          ready_date: checkDate(item["Дата готовности"]),

          load_date: checkDate(item["Дата загрузки"]),

          etd: checkDate(item["ETD"]),

          eta: checkDate(item["ETA"]),

          release: checkDate(item["Релиз"]),

          bl_smgs_cmr: checkBoolean(item["BL/СМГС/CMR"]),

          td: checkBoolean(item["ТД"]),

          date_do: checkDate(item["Дата ДО"]),

          port: clearString(item["Порт"]),

          is_docs: isDocsHandler(item["Номер заказа"]),

          is_ds: checkBoolean(item["Д/С для подачи"]),

          fraht_account: item["Фрахтовый счет"],

          declaration_number: splitStrings(item["Номер декларации"]),

          declaration_issue_date: checkDate(item["Дата выпуска декларации"]),

          availability_of_ob: checkDate(item["Наличие ОБ"]),

          answer_of_ob: checkDate(item["Ответ ОБ"]),

          expeditor: item["Экспедитор"],

          destination_station: clearString(item["Станция прибытия"]),

          km_to_dist: castToNum(item["Осталось км до ст. назначения"]),

          train_depart_date: checkDate(item["Дата отправки по ЖД"]),

          train_arrive_date: checkDate(item["Дата прибытия по ЖД"]),

          pickup: clearString(item["Автовывоз"]),

          store_arrive_date: checkDate(item["Дата прибытия на склад"]),

          stock_place: (await StockRepository.getStockPlaceByName(item["Сток Сдачи"]))?._id,

          eta_update: checkDate(item["ETA"]) !== null,

          date_do_update: checkDate(item["Дата ДО"]) !== null,

          declaration_issue_date_update:
            checkDate(item["Дата выпуска декларации"]) !== null,

          train_depart_date_update:
            checkDate(item["Дата отправки по ЖД"]) !== null,

          train_arrive_date_update:
            checkDate(item["Дата прибытия по ЖД"]) !== null,

          store_arrive_date_update:
            checkDate(item["Дата прибытия на склад"]) !== null,

          hidden:
            checkDate(item["Дата прибытия на склад"]) !== null,
        });
        return await doc.save();
      });

      const response = Promise.all(items).then(async (result) => {});

      return successReturn(response);
    } catch (error) {
      console.log(error);
      return errorReturn(error);
    }
  }
}

module.exports = new ItemService();
