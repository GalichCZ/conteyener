const ImporterSchema = require("../models/importer-model");

class ImporterService {
  async createImporter(name, container) {
    try {
      const doc = new ImporterSchema({
        name,
        container,
      });

      const provider = await doc.save();

      return provider;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ImporterService();
