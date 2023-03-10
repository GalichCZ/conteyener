const TechStoreService = require("../service/techStore-service");

class TechStoreController {
  async createTechStore(req, res) {
    const result = await TechStoreService.createTechStore(
      req.body.address,
      req.body.name
    );

    if (result.toString().includes("Error"))
      res.status(500).json({ message: "Error while creating tech store" });
    else res.json(result);
  }

  async getOneTechStore(req, res) {
    const result = await TechStoreService.getOneTechStore(req.params._id);

    if (result.toString().includes("Error"))
      res.status(500).json({ message: "Error while creating tech store" });
    else res.json(result);
  }

  async getTechStore(req, res) {
    const result = await TechStoreService.getTechStores();

    if (result.toString().includes("Error"))
      res.status(404).json({ message: "Not found !" });
    else res.json(result);
  }

  async updateTechStore(req, res) {
    const result = await TechStoreService.updateTechStores(req);

    if (result.toString().includes("Error"))
      res.status(500).json({ message: "Error while updating tech store" });
    else res.json(result);
  }

  async deleteTechStore(req, res) {
    const result = await TechStoreService.deleteTechStore(req.params._id);

    if (result.toString().includes("Error"))
      res.status(500).json({ message: "Error while deleting tech store" });
    else res.json(result);
  }
}

module.exports = new TechStoreController();
