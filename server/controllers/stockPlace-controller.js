const StockPlaceService = require("../service/stockPlace-service");

class StockPlaceController {
  async createStockPlace(req, res) {
    const result = await StockPlaceService.createStockPlace(
      req.body.address,
      req.body.name,
      req.body.contact,
      req.body.note
    );

    res.json(result);
  }

  async getOneStockPlace(req, res) {
    const result = await StockPlaceService.getOneStockPlace(req.params._id);

    res.json(result);
  }

  async getOneStockPlace(req, res) {
    const result = await StockPlaceService.getOneStockPlace(req.params._id);

    res.json(result);
  }

  async getOneStockPlaceByName(req, res) {
    const result = await StockPlaceService.getOneStockPlaceByName(
      req.params.name
    );

    res.json(result);
  }

  async getStockPlaces(req, res) {
    const result = await StockPlaceService.getStockPlaces();

    res.json(result);
  }

  async updateStockPlaces(req, res) {
    const result = await StockPlaceService.updateTechStores(
      req.body._id,
      req.body.address,
      req.body.name
    );

    res.json(result);
  }

  async deleteStockPlace(req, res) {
    const result = await StockPlaceService.deleteStockPlace(req.params._id);
    console.log(result);
    if (result.success) return res.status(200).json(result);
    else return res.status(500).json(error);
  }
}

module.exports = new StockPlaceController();
