const { Router } = require("express");
const router = new Router();
const CheckAuth = require("../utils/check-auth");
const UserController = require("../controllers/user-controller");

router.post("/api/auth/login", UserController.login);
router.patch("/api/role", UserController.roleChange);
router.get("/api/user", CheckAuth.checkToken, UserController.getMe);
router.get("/api/users", UserController.getUsers);
router.get("/api/activate/:link", UserController.activate);
router.delete("/api/user/:email", UserController.deleteUser);
router.post("/api/auth/signup", UserController.registration);

module.exports = router;
