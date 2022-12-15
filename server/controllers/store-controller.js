const StoreService = require("../service/store-service");

class StoreController {
  async updateStore(req, res) {
    const response = await StoreService.updateStore(
      req.body.updateStore._id,
      req,
      req.body.itemId
    );
    res.json(response);
  }
}

module.exports = new StoreController();
