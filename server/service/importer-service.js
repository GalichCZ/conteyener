const ImporterSchema = require("../models/importer-model");

class ImporterService {
  async createImporter(names, container) {
    try {
      const importers = names.map(async (provider) => {
        const doc = new ImporterSchema({
          name: provider.name,
          container,
        });
        const docs = await doc.save();
        return docs;
      });

      return Promise.all(importers).then((res) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getImporters(items) {
    try {
      const importers = items.map(async (importer) => {
        return await ImporterSchema.find({ container: importer.container });
      });

      return Promise.all(importers).then((res) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImporters(items) {
    try {
      await ImporterSchema.deleteMany({ container: items.container });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ImporterService();
