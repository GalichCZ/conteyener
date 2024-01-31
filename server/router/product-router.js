const { Router } = require("express");
const router = new Router();
const ProductController = require("../controllers/product-controller");
const FileWare = require("../utils/file-ware");

router.post(
  "/api/product/:item_id/:simple_product_name",
  FileWare,
  ProductController.createProduct
);
router.post("/api/product/hand/:id/:simple_product_name", ProductController.createProductHand)
router.post("/api/product", ProductController.getProducts);
router.get(
  "/api/product/:item_id/:simple_product_name",
  ProductController.getProduct
);
router.delete("/api/product/:_id/:itemId", ProductController.deleteProduct);

module.exports = router;
