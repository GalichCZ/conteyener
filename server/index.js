const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userController = require("./controllers/user-controller");
const itemController = require("./controllers/item-controller");

const url =
  "mongodb+srv://root:root@conteyener.w3d0tne.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4444;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.get("/activate/:link", userController.activate);
app.get("/users", userController.getUsers);
app.get("/user", userController.getMe);
app.post("/auth/signin", userController.registration);
app.post("/auth/login", userController.login);
app.patch("/role", userController.roleChange);
app.delete("/user", userController.deleteUser);

app.post("/item", itemController.itemCreate);
app.get("/item", itemController.getItems);
app.patch("/item", itemController.updateItem);

const start = async () => {
  try {
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
