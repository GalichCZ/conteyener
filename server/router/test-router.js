const { Router } = require("express");
const router = new Router();
const TestController = require("../controllers/test-controller");
const FileWare = require("../utils/file-ware");

router.post("/api/test/formula", TestController.testFormula);
router.patch("/api/test/product", TestController.testUpdateProduct);
router.post("/api/test/declaration", TestController.testDeclaration);
router.post("/api/test/product", FileWare, TestController.testProduct);
router.get(
  "/api/test/declaration/:declaration_number",
  TestController.getTestDeclaration
);
router.patch("/api/test/datesTimeChange", TestController.datesTimeChange);
router.get("/api/test/getAllItems", TestController.getAllItems)

module.exports = router;
