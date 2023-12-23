const DeclarationSchema = require("../models/declaration-model");
const { SendBotMessage } = require("./bot-service");
const dayjs = require("dayjs");
class DeclarationService {
  async createDeclarationStatus(req) {
    try {
      const stats = await this.getDeclarationStatus(
        req.body.declaration_number
      );

      const doc = new DeclarationSchema({
        declaration_status_date: req.body.declaration_status_date,
        declaration_status: req.body.declaration_status,
        declaration_status_message: req.body.declaration_status_message,
        declaration_number: req.body.declaration_number,
      });

      if (stats) {
        const declaration_stat = await doc.save();
        stats.push(declaration_stat);
        return stats;
      } else {
        const declaration_stat = await doc.save();
        return declaration_stat;
      }
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nECLARATION STATUS CREATE ERROR:\n${error}`
      );
    }
  }

  async getDeclarationStatus(declaration_number) {
    try {
      const doc = await DeclarationSchema.find({ declaration_number });
      if (doc) return doc;
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nECLARATION STATUS GET ERROR:\n${error}`
      );
      return { message: "not found" };
    }
  }

  async deleteDeclarationStatus(declaration_number) {
    try {
      await DeclarationSchema.deleteMany({ declaration_number });
    } catch (error) {
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nECLARATION STATUS DELETE ALL ERROR:\n${error}`
      );
      console.log(error);
    }
  }

  async declarationStatusDeleteOne(req) {
    try {
      return await DeclarationSchema.deleteOne({ _id: req.params._id });
    } catch (error) {
      console.log(error);
      SendBotMessage(
        `${dayjs(new Date()).format(
          "MMMM D, YYYY h:mm A"
        )}\nECLARATION STATUS DELETE ONE ERROR:\n${error}`
      );
      return error;
    }
  }
}

module.exports = new DeclarationService();
