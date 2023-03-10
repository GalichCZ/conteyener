const DeclarationSchema = require("../models/declaration-model");

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
    }
  }

  async getDeclarationStatus(declaration_number) {
    try {
      const doc = await DeclarationSchema.find({ declaration_number });

      if (doc) return doc;
    } catch (error) {
      console.log(error);
      return { message: "not found" };
    }
  }

  async deleteDeclarationStatus(declaration_number) {
    try {
      await DeclarationSchema.deleteMany({ declaration_number });
    } catch (error) {
      console.log(error);
    }
  }

  async declarationStatusDeleteOne(req) {
    try {
      return await DeclarationSchema.deleteOne({ _id: req.params._id });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new DeclarationService();
