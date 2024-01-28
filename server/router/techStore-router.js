const { Router } = require("express");
const router = new Router();
const TechStoreController = require("../controllers/techStore-controller");

router.get("/api/stores", TechStoreController.getTechStore);
router.post("/api/store", TechStoreController.createTechStore);
router.patch("/api/store", TechStoreController.updateTechStore);
router.get("/api/store/:_id", TechStoreController.getOneTechStore);
router.delete("/api/store/:_id", TechStoreController.deleteTechStore);

module.exports = router;
