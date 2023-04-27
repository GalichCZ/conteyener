const { Router } = require("express");
const router = new Router();
const DeclarationController = require("../controllers/declaration-controller");

router.post("/api/declaration/get", DeclarationController.declarationStatusGet);
router.post("/api/declaration", DeclarationController.declarationStatusCreate);
router.delete(
  "/api/declaration/:_id",
  DeclarationController.declarationStatusDeleteOne
);

module.exports = router;
