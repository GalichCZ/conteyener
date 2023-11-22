const { Router } = require("express");
const ItemController = require("../controllers/item-controller");
const CheckAuth = require("../utils/check-auth");
const FileWare = require("../utils/file-ware");

const router = new Router();

//TODO: add script that will clear all data from tabs spaces and new lines
//  and add script that will find all stores by name and add them to items

//post
router.post("/api/item/upload", FileWare, ItemController.uploadExcel);
router.post("/api/item/search", ItemController.findItemsBySearch);
router.post(
  "/api/item/updateDates",
  ItemController.updateFormulaDatesAfterUpload
);
router.post("/api/bid", CheckAuth.checkToken, ItemController.itemCreate);
router.post("/api/item/global", FileWare, ItemController.uploadGlobal);
router.post("/api/item/mock", ItemController.mockData);
//get
router.get("/api/item/hidden/:page", ItemController.getHiddenItems);
router.post("/api/item/:page", ItemController.getItems);
router.get("/api/filter/key", ItemController.getKeyFilters);
router.get("/api/filter/:isHidden", ItemController.getItemsFilter);
router.get("/api/item/:key/:keyValue", ItemController.findByKeyValue);
router.get("/api/item/hideall", ItemController.hideDelivered);
//patch
router.patch("/api/bid", ItemController.updateItem);
router.patch("/api/item/comment", ItemController.updateComment);
router.patch("/api/item/distance", ItemController.updateDistance);
router.patch("/api/item/date", ItemController.updateFormulaDates);
router.patch("/api/item/hide", ItemController.hideItem);
router.patch("/api/item/calculate", ItemController.calculateDates);
router.patch("/api/item/docs", ItemController.updateDocs);
//delete
router.delete("/api/item/:_id", ItemController.deleteItem);

module.exports = router;
