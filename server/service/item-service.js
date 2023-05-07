const ItemSchema = require("../models/item-model");
const TechStoreSchema = require("../models/techStore-model");
const FormulaService = require("./formula-service");
const ProductService = require("./product-service");
const StockPlaceSchema = require("../models/stockPlace-model");
const customParseFormat = require("dayjs/plugin/customParseFormat");

const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
dayjs.extend(customParseFormat);
class ItemService {
  async createItem(req) {
    try {
      const delivery_method = req.body.delivery_method;
      const store_name = await TechStoreSchema.findById({
        _id: req.body.store,
      }).exec();

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
      });

      const item = await doc.save();

      return true;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE ITEM ERROR:\n${error}`
      );
      console.log("ERROR LOG:", error);
      const array = Object.entries(error.keyValue).map(([key, value]) => {
        return { key, value };
      });
      return { error: array };
    }
  }

  async getItems() {
    try {
      const items = await ItemSchema.find({
        hidden: false,
      }).exec();

      return items;
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

  async updateItem(_id, req) {
    try {
      const stock_place =
        req.body.stock_place &&
        (await StockPlaceSchema.findById({
          _id: req.body.stock_place,
        }));

      const item = await ItemSchema.findById(_id).exec();

      const items = await ItemSchema.find({
        declaration_number: { $in: [req.body.declaration_number] },
      });
      const store_name =
        req.body.store &&
        (await TechStoreSchema.findById({
          _id: req.body.store,
        }));

      const exists = null;

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

      items.forEach((item) => {
        req.body.declaration_number.forEach((decl) => {
          // console.log(decl);
          if (item.declaration_number.includes(decl)) {
            // console.log(decl, " d");
          }
        });
      });

      if (exists !== null) return { error: "Declaration", duplicates: exists };
      else {
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
        return { message: "success" };
      }
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE ITEM ERROR:\n${error}`
      );
      console.log(error);
      const array = Object.entries(error.keyValue).map(([key, value]) => {
        return { key, value };
      });
      return { error: array };
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
}

module.exports = new ItemService();
