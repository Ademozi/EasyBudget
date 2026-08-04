const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email address"
        ]
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true,
        // This option adds createdAt and updatedAt fields to the schema, which will automatically be managed by Mongoose.
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;