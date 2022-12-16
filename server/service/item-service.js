const ItemSchema = require("../models/item-model");
const TechStoreSchema = require("../models/techStore-model");
const FormulaService = require("./formula-service");
class ItemService {
  async createItem(
    req,
    store,
    container,
    provider,
    importer,
    creator,
    is_docs
  ) {
    try {
      const delivery_method = req.body.delivery_method;

      const formulaRes = FormulaService.dateFormula(
        delivery_method,
        req.body.etd
      );

      const doc = new ItemSchema({
        request_date: req.body.request_date,
        order_number: req.body.order_number,
        container: {
          container_number: container.container_number,
          container_type: container.container_type,
          _id: container._id,
        },
        simple_product_name: req.body.simple_product_name,
        delivery_method,
        providers: provider,
        importers: importer,
        conditions: req.body.conditions,
        store,
        store_name: req.body.store_name,
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
        is_docs,
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
        creator: creator,
      });

      const item = await doc.save();

      return item;
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
