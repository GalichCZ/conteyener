const DeclarationService = require("../service/declaration-service");
const ProductService = require("../service/product-service");
const FileService = require("../service/file-service");
class TestController {
  async testDeclaration(req, res) {
    const response = await DeclarationService.createDeclarationStatus(req);

    res.json(response);
  }

  async getTestDeclaration(req, res) {
    const response = await DeclarationService.getDeclarationStatus(
      req.params.declaration_number
    );

    if (response) res.json(response);
    else res.status(404).json({ message: "no declarations found" });
  }

  async testProduct(req, res) {
    const products = await FileService.createFile(req.file.path);
    const response = await ProductService.createProduct(products);

    res.json(response);
  }

  async testUpdateProduct(req, res) {
    await ProductService.deleteProduct("637ce24055d01524f399e853");

    const products = await FileService.createFile(req.file.path);
    const response = await ProductService.createProduct(products);

    res.json(response);
  }
}

module.exports = new TestController();
