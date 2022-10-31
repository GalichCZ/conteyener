const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userController = require("./controllers/user-controller");

const url =
  "mongodb+srv://root:root@conteyener.vobs3x6.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4444;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.get("/activate/:link", userController.activate);
app.get("/users", userController.getUsers);
app.get("/profile", userController.getMe);

app.post("/auth/signin", userController.registration);
app.post("/auth/login", userController.login);

app.patch("/role", userController.roleChange);

app.delete("/user", userController.deleteUser);

const start = async () => {
  try {
    await app.listen(PORT, () => {
      console.log("Server started on " + PORT);
    });
    await mongoose.connect(url, () => {
      console.log("DB IS OK");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
