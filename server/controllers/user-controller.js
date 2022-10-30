const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserSchema = require('../models/user-model');
const MailService = require('../service/mail-service');

class UserController {
    async registration(req, res){
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
            })

            const user = await doc.save();

            await MailService.sendActivationMail(req.body.email,`http://localhost:4444/activate/${activation_link}`);

            const token = jwt.sign(
                {
                    _id: user._id,
                },
                "secret123",
                {
                    expiresIn: "30d"
                }
            )

            const {password_hash, ...userData} = user._doc;

            res.json({...userData, token});
        } catch (error) {
            console.log(error)
        }
    }

    async activate(req, res) {
        const user = await UserSchema.findOne({activation_link: req.params.link});
        if(!user){
            console.log("Bad link !");
        }
        user.is_activated = true;
        await user.save();
        res.redirect("https://google.com/");
    }
}

module.exports = new UserController();