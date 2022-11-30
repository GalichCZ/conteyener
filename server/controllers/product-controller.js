const ProductService = require("../service/product-service");
const FileService = require("../service/file-service");

class ProductController {
  async createProduct(req, res) {
    const products = await FileService.createFile(req.file.path);
    const response = await ProductService.createProduct(
      products,
      req.params.container
    );

    res.json(response);
  }

  async getProduct(req, res) {
    const response = await ProductService.getProduct(req.params.container);

    res.json(response);
  }
}

module.exports = new ProductController();
