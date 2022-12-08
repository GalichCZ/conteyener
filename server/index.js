const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/user-controller");
const ItemController = require("./controllers/item-controller");
const TestController = require("./controllers/test-controller");
const ProductController = require("./controllers/product-controller");
const DeclarationController = require("./controllers/declaration-controller");
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

app.post("/auth/login", UserController.login);
app.patch("/role", UserController.roleChange);
app.get("/user/:userId", UserController.getMe);
app.get("/users/:_id", UserController.getUsers);
app.get("/activate/:link", UserController.activate);
app.delete("/user/:email", UserController.deleteUser);
app.post("/auth/signin", UserController.registration);

app.post("/product/:container", FileWare, ProductController.createProduct);
app.get("/product/:container", ProductController.getProduct);

app.get("/item", ItemController.getItems);
app.patch("/item", ItemController.updateItem);
app.delete("/item/:_id", ItemController.deleteItem);
app.post("/item", CheckAuth.checkToken, ItemController.itemCreate);

app.get(
  "/declaration/:declaration_number",
  DeclarationController.declarationStatusGet
);
app.post("/declaration", DeclarationController.declarationStatusCreate);

app.get(
  "/test/declaration/:declaration_number",
  TestController.getTestDeclaration
);
app.patch("/test/product", TestController.testUpdateProduct);
app.post("/test/declaration", TestController.testDeclaration);
app.post("/test/formula", TestController.testFormula);
app.post("/test/product", FileWare, TestController.testProduct);

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
