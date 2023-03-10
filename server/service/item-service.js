const ItemSchema = require("../models/item-model");
const TechStoreSchema = require("../models/techStore-model");
const formulaService = require("./formula-service");
const FormulaService = require("./formula-service");
class ItemService {
  async createItem(req, store, container) {
    try {
      const delivery_method = req.body.delivery_method;

      const doc = new ItemSchema({
        request_date: req.body.request_date,
        order_number: req.body.order_number,
        simple_product_name: req.body.simple_product_name,
        delivery_method,
        providers: req.body.providers,
        importers: req.body.importers,
        conditions: req.body.conditions,
        store_name: req.body.store_name,
        store,
        agent: req.body.agent,
        container: {
          container_number: container.container_number,
          container_type: container.container_type,
          _id: container._id,
        },
        place_of_dispatch: req.body.place_of_dispatch,
      });

      const item = await doc.save();

      return item;
    } catch (error) {
      const array = Object.entries(error.keyValue).map(([key, value]) => {
        return { key, value };
      });
      console.log(error);
      return { error: array };
    }
  }

  async createItemOnce(
    _etd,
    _request_date,
    _simple_product_name,
    _store_name,
    _place_of_dispatch,
    _line,
    _ready_date,
    _load_date,
    _bl_smgs_cmr,
    _td,
    _port,
    _declaration_number,
    _destination_station,
    _km_to_dist,
    _comment,
    store,
    container,
    provider,
    importer,
    orders
  ) {
    try {
      const delivery_method = "";

      const formulaRes = FormulaService.dateFormula(delivery_method, _etd);

      const doc = new ItemSchema({
        request_date: _request_date,
        order_number: orders,
        container: {
          container_number: container.container_number,
          container_type: container.container_type,
          _id: container._id,
        },
        simple_product_name: _simple_product_name,
        delivery_method: "",
        providers: provider,
        importers: importer,
        conditions: "",
        store,
        store_name: _store_name,
        agent: "",
        place_of_dispatch: _place_of_dispatch,
        line: _line,
        ready_date: _ready_date,
        load_date: _load_date,
        etd: _etd,
        eta: formulaRes.eta,
        release: "",
        bl_smgs_cmr: _bl_smgs_cmr === "+" ? true : false,
        td: _td === "+" ? true : false,
        date_do: formulaRes.date_do,
        port: _port,
        is_ds: false,
        declaration_number: _declaration_number,
        declaration_issue_date: formulaRes.declaration_issue_date,
        availability_of_ob: null,
        answer_of_ob: null,
        expeditor: "",
        destination_station: _destination_station,
        km_to_dist: _km_to_dist,
        train_arrive_date: formulaRes.train_arrive_date,
        pickup: "",
        store_arrive_date: formulaRes.store_arrive_date,
        comment: _comment,
      });

      await doc.save();

      // return item;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getItems() {
    try {
      const items = await ItemSchema.find({
        hidden: false,
      }).exec();

      return items;
    } catch (error) {
      console.log(error);
    }
  }

  async getHiddenItems() {
    try {
      const items = await ItemSchema.find({
        hidden: true,
      }).exec();

      return items;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async hideItem(req) {
    try {
      // console.log("hide call", req.body);
      const _id = req.body._id;
      return await ItemSchema.updateOne({ _id }, { hidden: req.body.hidden });
    } catch (error) {
      console.log(error);
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

  async updateItem(_id, req, container) {
    try {
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

      console.log(_id, "item id");

      const formulaRes = await FormulaService.dateFormula(
        etd,
        delivery_channel
      );
      await ItemSchema.updateOne(
        {
          _id,
        },
        {
          request_date: req.body.request_date,
          order_number: req.body.order_number,
          container,
          providers: req.body.providers,
          importers: req.body.importers,
          simple_product_name: req.body.simple_product_name,
          delivery_method: req.body.delivery_method,
          conditions: req.body.conditions,
          agent: req.body.agent,
          delivery_channel: req.body.delivery_channel,
          place_of_dispatch: req.body.place_of_dispatch,
          line: req.body.line,
          ready_date: req.body.ready_date,
          load_date: req.body.load_date,
          etd,
          eta: formulaRes.eta,
          release: req.body.release,
          bl_smgs_cmr: req.body.bl_smgs_cmr,
          td: req.body.td,
          date_do: formulaRes.date_do,
          port: req.body.port,
          is_ds: req.body.is_ds,
          is_docs: req.body.is_docs,
          declaration_number: req.body.declaration_number,
          declaration_issue_date: formulaRes.declaration_issue_date,
          availability_of_ob: req.body.availability_of_ob,
          answer_of_ob: req.body.answer_of_ob,
          expeditor: req.body.expeditor,
          destination_station: req.body.destination_station,
          km_to_dist: req.body.km_to_dist,
          train_depart_date: formulaRes.train_depart_date,
          train_arrive_date: formulaRes.train_arrive_date,
          pickup: req.body.pickup,
          store_arrive_date: formulaRes.store_arrive_date,
          comment: req.body.comment,
          fraht: req.body.fraht,
          bid: req.body.bid,
          note: req.body.note,
        }
      );
      return { message: "success" };
    } catch (error) {
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
}

module.exports = new ItemService();
