const DeclarationService = require("../service/declaration-service");

class DeclarationController {
  async declarationStatusCreate(req, res) {
    await DeclarationService.createDeclarationStatus(req);

    res.status(200).json("Success");
  }

  async declarationStatusGet(req, res) {
    const response = await DeclarationService.getDeclarationStatus(
      req.body.declaration_number
    );
    res.json(response);
  }
}

module.exports = new DeclarationController();
