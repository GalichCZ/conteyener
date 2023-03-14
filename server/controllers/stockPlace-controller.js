const StockPlaceService = require("../service/stockPlace-service");

class StockPlaceController {
  async createStockPlace(req, res) {
    const result = await StockPlaceService.createStockPlace(
      req.body.address,
      req.body.name
    );

    res.json(result);
  }

  async getOneStockPlace(req, res) {
    const result = await StockPlaceService.getOneStockPlace(req.params._id);

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
}

module.exports = new StockPlaceController();
