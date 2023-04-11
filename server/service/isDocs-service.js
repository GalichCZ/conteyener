const IsDocsSchema = require("../models/isDocs-model");
const ItemSchema = require("../models/item-model");
class IsDocsService {
  async createDocs(req, container) {
    try {
      const doc = new IsDocsSchema({
        PI: req.body.is_docs.PI,
        CI: req.body.is_docs.CI,
        PL: req.body.is_docs.PL,
        SS_DS: req.body.is_docs.SS_DS,
        contract_agrees: req.body.is_docs.contract_agrees,
        cost_agrees: req.body.is_docs.cost_agrees,
        instruction: req.body.is_docs.instruction,
        ED: req.body.is_docs.ED,
        bill: req.body.is_docs.bill,
        container,
      });

      const docs = doc.save();

      return docs;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nCREATE DOCS ERROR:\n${error}`
      );
      console.log(error);
    }
  }

  async updateDocs(_id, req) {
    try {
      const doc = await ItemSchema.findById(_id).exec();

      doc.is_docs = {
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

      await doc.save();

      return doc.is_docs;
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nUPDATE DOCS ERROR:\n${error}`
      );
      console.log(error);
    }
  }

  async deleteDocs(container) {
    try {
      if (container !== undefined) {
        await IsDocsSchema.deleteMany({ container });
      }
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nDELETE DOCS ERROR:\n${error}`
      );
      console.log(error);
    }
  }
}

module.exports = new IsDocsService();
