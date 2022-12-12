const IsDocsService = require("../service/isDocs-service");

class IsDocsController {
  async updateDocs(req, res) {
    const result = await IsDocsService.updateDocs(req.params._id, req);

    res.json(result);
  }
}

module.exports = new IsDocsController();
