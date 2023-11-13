const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDirectory = "./uploads";

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const file = upload.single("file");

module.exports = file;
