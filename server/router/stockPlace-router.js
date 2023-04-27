const { Router } = require("express");
const StockPlaceController = require("../controllers/stockPlace-controller");

const router = new Router();

router.get("/api/stock", StockPlaceController.getStockPlaces);
router.post("/api/stock", StockPlaceController.createStockPlace);
router.patch("/api/stock", StockPlaceController.updateStockPlaces);
router.get("/api/stock/:_id", StockPlaceController.getOneStockPlace);
router.delete("/api/stock/:_id", StockPlaceController.deleteStockPlace);
router.get(
  "/api/stock/:name/name",
  StockPlaceController.getOneStockPlaceByName
);

module.exports = router;
