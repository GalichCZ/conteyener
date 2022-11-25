const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/user-controller");
const ItemController = require("./controllers/item-controller");
const TestController = require("./controllers/test-controller");
const CheckAuth = require("./utils/check-auth");
const FileWare = require("./utils/file-ware");

const url =
  "mongodb+srv://root:root@conteyener.w3d0tne.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4444;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", CheckAuth.checkToken, (req, res) => {
  console.log(req.userId);
  res.send("HELLO");
});

app.get("/activate/:link", UserController.activate);
app.get("/users", UserController.getUsers);
app.get("/user", UserController.getMe);
app.post("/auth/signin", UserController.registration);
app.post("/auth/login", UserController.login);
app.patch("/role", UserController.roleChange);
app.delete("/user", UserController.deleteUser);

app.get("/item", ItemController.getItems);
app.post("/item", CheckAuth.checkToken, ItemController.itemCreate);
app.patch("/item", ItemController.updateItem);
app.delete("/item/:_id", ItemController.deleteItem);

const uploadFiles = (req, res) => {
  console.log(req.file.path);
  res.json({ message: "Successfully uploaded files" });
};

app.post("/test/file", FileWare, TestController.testFile);
app.post("/test/declaration", TestController.testDeclaration);
app.post("/test/product", TestController.testProduct);
app.get(
  "/test/declaration/:declaration_number",
  TestController.getTestDeclaration
);

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
