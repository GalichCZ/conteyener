const { Router } = require("express");
const ItemController = require("../controllers/item-controller");
const CheckAuth = require("../utils/check-auth");
const FileWare = require("../utils/file-ware");

const router = new Router();

//get
router.get("/api/item/hidden", ItemController.getHiddenItems);
router.get("/api/item/:page", ItemController.getItems);
router.get("/api/filter", ItemController.getItemsFilter);
router.get("/api/item/:key/:keyValue", ItemController.findByKeyValue);
//post
router.post("/api/item/upload", FileWare, ItemController.uploadExcel);
router.post("/api/item/search", ItemController.findItemsBySearch);
router.post("/api/item", CheckAuth.checkToken, ItemController.itemCreate);
router.post("/api/item/global", FileWare, ItemController.uploadGlobal);
//patch
router.patch("/api/item", ItemController.updateItem);
router.patch("/api/item/comment", ItemController.updateComment);
router.patch("/api/item/distance", ItemController.updateDistance);
router.patch("/api/item/date", ItemController.updateFormulaDates);
router.patch("/api/item/hide", ItemController.hideItem);
router.patch("/api/item/calculate", ItemController.calculateDates);
router.patch("/api/item/docs", ItemController.updateDocs);
//delete
router.delete("/api/item/:_id", ItemController.deleteItem);

module.exports = router;
