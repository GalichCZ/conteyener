const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routers = require("./router/index");

dotenv.config();

const url = process.env.DB_URL_DOCKER;
const PORT = 4444;

const app = express();
app.use(express.json());
app.use(cors());
routers.forEach((router) => {
  app.use("/", router);
});

app.get("/api", (req, res) => {
  res.send("HELLO");
});

const start = async () => {
  try {
    mongoose.set("strictQuery", false);

    await app.listen(PORT, () => {
      console.log("Server started on " + PORT);
    });
    await mongoose
      .connect(url)
      .then(() => console.log("DB IS OK"))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

start();
