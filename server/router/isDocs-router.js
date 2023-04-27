const { Router } = require("express");
const router = new Router();
const IsDocsController = require("../controllers/isDocs-controller");

router.post("/api/isdocs/:_id", IsDocsController.updateDocs);

module.exports = router;
