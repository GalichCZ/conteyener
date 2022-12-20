const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserSchema = require("../models/user-model");
const MailService = require("../service/mail-service");

class UserController {
  async registration(req, res) {
    try {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const activation_link = uuid.v4();

      const doc = new UserSchema({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password_hash: hash,
        activation_link,
      });

      const user = await doc.save();

      await MailService.sendActivationMail(
        req.body.email,
        `https://www.conteyener.com/activation/?activation=${activation_link}`
      );

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        {
          expiresIn: "30d",
        }
      );

      const { password_hash, ...userData } = user._doc;

      res.json({ ...userData, token });
    } catch (error) {
      console.log(error);
      res.json("Oops, something goes wrong...");
    }
  }

  async login(req, res) {
    try {
      const user = await UserSchema.findOne({ email: req.body.email });

      if (!user)
        return res
          .status(404)
          .json({ message: "User with this email address doesn't exists" });

      const isValidPass = await bcrypt.compare(
        req.body.password,
        user._doc.password_hash
      );

      if (!isValidPass)
        return res.status(400).json({ message: "Wrong email or password" });

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        {
          expiresIn: "30d",
        }
      );
      const { password_hash, ...userData } = user._doc;
      res.json({ ...userData, token });
    } catch (error) {
      console.log(error);
      res.json("Oops, something goes wrong...");
    }
  }

  async getMe(req, res) {
    try {
      const user = await UserSchema.findById(req.params.userId);

      if (!user) return res.status(404).json({ message: "not found" });

      const { passwordHash, ...userData } = user._doc;

      res.json({
        success: true,
        ...userData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something goes wrong in get me",
      });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserSchema.find();

      const me = await UserSchema.findById(req.params._id);

      const newUsers = users.filter(
        (user) => user._id.toString() !== me._id.toString()
      );

      res.json(newUsers);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something goes wrong",
      });
    }
  }

  async roleChange(req, res) {
    try {
      const user = await UserSchema.findOne({ email: req.body.email });
      user.role = req.body.role;
      await user.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.json("Oops, something goes wrong...");
    }
  }

  async deleteUser(req, res) {
    try {
      await UserSchema.deleteOne({ email: req.params.email });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.json("Oops, something goes wrong...");
    }
  }

  async activate(req, res) {
    const user = await UserSchema.findOne({ activation_link: req.params.link });
    if (!user) {
      console.log("Bad link !");
    }
    user.is_activated = true;
    await user.save();
    res.redirect("https://google.com/");
  }
}

module.exports = new UserController();
