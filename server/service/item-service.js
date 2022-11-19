const ItemSchema = require("../models/item-model");

class ItemService {
  async createItem(req, res, store, container, provider, importer, creator) {
    try {
      const doc = new ItemSchema({
        request_date: req.body.request_date,
        invoice_number: req.body.invoice_number,
        container,
        providers: provider,
        importers: importer,
        store,
        conditions: req.body.conditions,
        line: req.body.line,
        agent: req.body.agent,
        fraht: req.body.fraht,
        expeditor: req.body.expeditor,
        bid: req.body.bid,
        delivery_method: req.body.delivery_method,
        place_of_dispatch: req.body.place_of_dispatch,
        arrive_place: req.body.arrive_place,
        distpatch_date: req.body.distpatch_date,
        arrive_date: req.body.arrive_date,
        date_do: req.body.date_do,
        is_ds: req.body.is_ds,
        is_docs: req.body.is_docs,
        declaration_submit_date: req.body.declaration_submit_date,
        declaration_number: req.body.declaration_number,
        declaration_issue_date: req.body.declaration_issue_date,
        train_dispatch_date: req.body.train_dispatch_date,
        train_arrive_date: req.body.train_arrive_date,
        destination_station: req.body.destination_station,
        km_to_dist: req.body.km_to_dist,
        store_arrive_date: req.body.store_arrive_date,
        note: req.body.note,
        creator: creator,
      });

      const item = await doc.save();

      return item;
    } catch (error) {
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

  async updateItem(_id, req) {
    try {
      return await ItemSchema.updateOne(
        {
          _id,
        },
        {
          request_date: req.body.request_date,
          invoice_number: req.body.invoice_number,
          conditions: req.body.conditions,
          line: req.body.line,
          agent: req.body.agent,
          fraht: req.body.fraht,
          expeditor: req.body.expeditor,
          bid: req.body.bid,
          delivery_method: req.body.delivery_method,
          place_of_dispatch: req.body.place_of_dispatch,
          arrive_place: req.body.arrive_place,
          distpatch_date: req.body.distpatch_date,
          arrive_date: req.body.arrive_date,
          date_do: req.body.date_do,
          is_ds: req.body.is_ds,
          is_docs: req.body.is_docs,
          declaration_submit_date: req.body.declaration_submit_date,
          declaration_number: req.body.declaration_number,
          declaration_issue_date: req.body.declaration_issue_date,
          train_dispatch_date: req.body.train_dispatch_date,
          train_arrive_date: req.body.train_arrive_date,
          destination_station: req.body.destination_station,
          km_to_dist: req.body.km_to_dist,
          store_arrive_date: req.body.store_arrive_date,
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
