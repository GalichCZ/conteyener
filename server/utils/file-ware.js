const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const file = upload.single("file");

module.exports = file;
