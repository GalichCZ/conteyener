const ImporterSchema = require("../models/importer-model");
const ItemSchema = require("../models/item-model");

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

  async createImporterOnce(names, container) {
    try {
      const importers = names.map(async (provider) => {
        const doc = new ImporterSchema({
          name: provider,
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

  async updateImporters(item, req) {
    try {
      const doc = await ItemSchema.findOne({
        _id: item._id,
      });

      if (req.body.importers) {
        await this.deleteImporters(item);

        const importers = await this.createImporter(
          req.body.importers,
          item.container
        );

        doc.importers = importers;
        await doc.save();
      } else {
        doc.importers = [];
        await doc.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImporters(item) {
    try {
      if (item.container !== undefined)
        await ImporterSchema.deleteMany({ container: item.container });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ImporterService();
