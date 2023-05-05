const { Router } = require("express");
const ItemController = require("../controllers/item-controller");
const CheckAuth = require("../utils/check-auth");

const router = new Router();

router.get("/api/item", ItemController.getItems);
router.get("/api/item/filter", ItemController.getItemsFilter);
router.patch("/api/item", ItemController.updateItem);
router.delete("/api/item/:_id", ItemController.deleteItem);
router.get("/api/item/hidden", ItemController.getHiddenItems);
router.patch("/api/item/comment", ItemController.updateComment);
router.patch("/api/item/distance", ItemController.updateDistance);
router.patch("/api/item/date", ItemController.updateFormulaDates);
router.post("/api/item/search", ItemController.findItemsBySearch);
router.post("/api/item", CheckAuth.checkToken, ItemController.itemCreate);
router.patch("/api/item/hide", ItemController.hideItem);
router.patch("/api/item/calculate", ItemController.calculateDates);

module.exports = router;
