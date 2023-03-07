const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const UserController = require("./controllers/user-controller");
const ItemController = require("./controllers/item-controller");
const TestController = require("./controllers/test-controller");
const StoreController = require("./controllers/store-controller");
const IsDocsController = require("./controllers/isDocs-controller");
const ProductController = require("./controllers/product-controller");
const TechStoreController = require("./controllers/techStore-controller");
const DeclarationController = require("./controllers/declaration-controller");
const UploadOnceController = require("./controllers/uploadOnce-controller");
const DeliveryChannelController = require("./controllers/deliveryChannel-controller");

const CheckAuth = require("./utils/check-auth");
const FileWare = require("./utils/file-ware");

dotenv.config();

const url = process.env.DB_URL;
// "mongodb+srv://root:root@conteyener.w3d0tne.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4444;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/", CheckAuth.checkToken, (req, res) => {
  console.log(req.userId);
  res.send("HELLO");
});

app.post("/api/channel", DeliveryChannelController.createDeliveryChannel);
app.get("/api/channel", DeliveryChannelController.getChannels);

app.post("/api/auth/login", UserController.login);
app.patch("/api/role", UserController.roleChange);
app.get("/api/user/:userId", UserController.getMe);
app.get("/api/users/:_id", UserController.getUsers);
app.get("/api/activate/:link", UserController.activate);
app.delete("/api/user/:email", UserController.deleteUser);
app.post("/api/auth/signin", UserController.registration);

app.post("/api/product/:item_id", FileWare, ProductController.createProduct);
app.get("/api/product/:item_id", ProductController.getProduct);

app.get("/api/item", ItemController.getItems);
app.patch("/api/item", ItemController.updateItem);
app.delete("/api/item/:_id", ItemController.deleteItem);
app.patch("/api/item/store", StoreController.updateStore);
app.get("/api/item/hidden", ItemController.getHiddenItems);
app.patch("/api/item/comment", ItemController.updateComment);
app.patch("/api/item/date", ItemController.updateFormulaDates);
app.post("/api/item/search", ItemController.findItemsBySearch);
app.post("/api/item", CheckAuth.checkToken, ItemController.itemCreate);

app.post("/api/declaration/get", DeclarationController.declarationStatusGet);
app.post("/api/declaration", DeclarationController.declarationStatusCreate);

app.post("/api/isdocs/:_id", IsDocsController.updateDocs);

app.get("/api/store/tech", TechStoreController.getTechStore);
app.post("/api/store/tech", TechStoreController.createTechStore);
app.patch("/api/store/tech", TechStoreController.updateTechStore);
app.get("/api/store/tech/:_id", TechStoreController.getOneTechStore);
app.delete("/api/store/tech/:_id", TechStoreController.deleteTechStore);

app.patch("/api/test/product", TestController.testUpdateProduct);
app.post("/api/test/declaration", TestController.testDeclaration);
app.post("/api/test/formula", TestController.testFormula);
app.post("/api/test/product", FileWare, TestController.testProduct);
app.get(
  "/api/test/declaration/:declaration_number",
  TestController.getTestDeclaration
);
app.post("/api/test/store", TestController.testStoreCreate);

app.post("/uploadOnce", FileWare, UploadOnceController.uploadItems);

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
