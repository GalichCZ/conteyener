const ProductService = require("../service/product-service");
const FileService = require("../service/file-service");

class ProductController {
  async createProduct(req, res) {
    const products = await FileService.createFile(req.file.path);
    const response = await ProductService.createProduct(
      products,
      req.params.item_id,
      req.params.simple_product_name
    );

    res.json(response);
  }

  async getProduct(req, res) {
    const response = await ProductService.getProduct(
      req.params.item_id,
      req.params.simple_product_name
    );

    res.json(response);
  }

  async deleteProduct(req, res) {
    const response = await ProductService.deleteProduct(
      req.params._id,
      req.params.itemId
    );

    if (response.success) res.json(response);
    else res.status(500).json(response);
  }
}

module.exports = new ProductController();
