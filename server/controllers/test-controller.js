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
    const response = await ProductService.createProduct(req.body.products);

    res.json(response);
  }

  async testFile(req, res) {
    const response = await FileService.createFile(req.file.path);

    res.json(200);
  }
}

module.exports = new TestController();
