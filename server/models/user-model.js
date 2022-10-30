const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        first_name:{
            type: String,
            required: true
        },
        last_name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password_hash:{
            type: String,
            required: true
        },
        is_activated:{
            type: Boolean,
            default: false
        },
        activation_link:{
            type: String
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);