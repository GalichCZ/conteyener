const { Router } = require("express");
const router = new Router();
const TechStoreController = require("../controllers/techStore-controller");

router.get("/api/store/tech", TechStoreController.getTechStore);
router.post("/api/store/tech", TechStoreController.createTechStore);
router.patch("/api/store/tech", TechStoreController.updateTechStore);
router.get("/api/store/tech/:_id", TechStoreController.getOneTechStore);
router.delete("/api/store/tech/:_id", TechStoreController.deleteTechStore);

module.exports = router;
