const ItemSchema = require("../models/item-model");
const TechStoreSchema = require("../models/techStore-model");
const formulaService = require("./formula-service");
const FormulaService = require("./formula-service");
class ItemService {
  async createItem(
    req,
    store,
    container,
    provider,
    importer,
    orders,
    creator,
    is_docs
  ) {
    try {
      const delivery_method = req.body.delivery_method;

      // const formulaRes = FormulaService.dateFormula(
      // delivery_method,
      // req.body.etd
      // );

      const doc = new ItemSchema({
        request_date: req.body.request_date,
        order_number: orders,
        simple_product_name: req.body.simple_product_name,
        delivery_method,
        providers: provider,
        importers: importer,
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
      console.log(error);
      return error;
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
      const items = await ItemSchema.find();

      return items;
    } catch (error) {
      console.log(error);
    }
  }

  async getHiddenItems() {
    try {
      const items = await ItemSchema.find({
        store_arrive_date_update: true,
      }).exec();

      return items;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateFormulaDates(_id, req) {
    try {
      if (req.body.eta) {
        const dates = formulaService.updateDateFormulaEta(
          req.body.eta,
          req.body.delivery_time
        );

        const result = await ItemSchema.updateOne(
          { _id },
          {
            eta: req.body.eta,
            eta_update: req.body.eta_update,
            date_do: dates.date_do,
            declaration_issue_date: dates.declaration_issue_date,
            train_arrive_date: dates.train_arrive_date,
            store_arrive_date: dates.store_arrive_date,
          }
        );

        if (result) return true;
      }

      if (req.body.date_do) {
        const dates = formulaService.updateDateFormulaDateDo(
          req.body.date_do,
          req.body.delivery_time
        );

        const result = await ItemSchema.updateOne(
          { _id },
          {
            date_do: req.body.date_do,
            date_do_update: req.body.date_do_update,
            declaration_issue_date: dates.declaration_issue_date,
            train_arrive_date: dates.train_arrive_date,
            store_arrive_date: dates.store_arrive_date,
          }
        );

        if (result) return true;
      }

      if (req.body.declaration_issue_date) {
        const dates = formulaService.updateDateFormulaDeclaration(
          req.body.declaration_issue_date,
          req.body.delivery_time
        );

        const result = await ItemSchema.updateOne(
          { _id },
          {
            declaration_issue_date: req.body.declaration_issue_date,
            declaration_issue_date_update:
              req.body.declaration_issue_date_update,
            train_arrive_date: dates.train_arrive_date,
            store_arrive_date: dates.store_arrive_date,
          }
        );

        if (result) return true;
      }

      if (req.body.train_arrive_date) {
        console.log(req.body.delivery_time + " delivery time");
        const dates = formulaService.updateDateFormulaDateTrain(
          req.body.train_arrive_date,
          req.body.delivery_time
        );

        const result = await ItemSchema.updateOne(
          { _id },
          {
            train_arrive_date: req.body.train_arrive_date,
            train_arrive_date_update: req.body.train_arrive_date_update,
            store_arrive_date: dates.store_arrive_date,
          }
        );

        if (result) return true;
      }

      if (req.body.store_arrive_date) {
        const result = await ItemSchema.updateOne(
          { _id },
          {
            store_arrive_date: req.body.store_arrive_date,
            store_arrive_date_update: req.body.store_arrive_date_update,
          }
        );

        if (result) return true;
      }
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
      const delivery_method = req.body.delivery_method;

      const techStore = await TechStoreSchema.findById(
        req.body.store.techStore
      );

      const formulaRes = FormulaService.dateFormula(
        delivery_method,
        req.body.etd,
        techStore.delivery_time
      );
      return await ItemSchema.updateOne(
        {
          _id,
        },
        {
          request_date: req.body.request_date,
          order_number: req.body.order_number,
          container,
          simple_product_name: req.body.simple_product_name,
          delivery_method,
          conditions: req.body.conditions,
          agent: req.body.agent,
          place_of_dispatch: req.body.place_of_dispatch,
          line: req.body.line,
          ready_date: req.body.ready_date,
          load_date: req.body.load_date,
          etd: req.body.etd,
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
          train_arrive_date: formulaRes.train_arrive_date,
          pickup: req.body.pickup,
          store_arrive_date: formulaRes.store_arrive_date,
          comment: req.body.comment,
          fraht: req.body.fraht,
          bid: req.body.bid,
          note: req.body.note,
        }
      );
    } catch (error) {
      console.log(error);
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
