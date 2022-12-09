const IsDocsSchema = require("../models/isDocs-model");
const ItemSchema = require("../models/item-model");
class IsDocsService {
  async createDocs(req) {
    try {
      const doc = new IsDocsSchema({
        PI: req.body.PI,
        CI: req.body.CI,
        PL: req.body.PL,
        SS_DS: req.body.SS_DS,
        contract_agrees: req.body.contract_agrees,
        cost_agrees: req.body.cost_agrees,
        instruction: req.body.instruction,
        ED: req.body.ED,
        bill: req.body.bill,
      });

      const docs = doc.save();

      return docs;
    } catch (error) {
      console.log(error);
    }
  }

  async updateDocs(itemId, req) {
    try {
      const doc = ItemSchema.findById(itemId);
      const newDocs = {
        PI: req.body.PI,
        CI: req.body.CI,
        PL: req.body.PL,
        SS_DS: req.body.SS_DS,
        contract_agrees: req.body.contract_agrees,
        cost_agrees: req.body.cost_agrees,
        instruction: req.body.instruction,
        ED: req.body.ED,
        bill: req.body.bill,
      };

      doc.is_docs = newDocs;

      await doc.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new IsDocsService();
