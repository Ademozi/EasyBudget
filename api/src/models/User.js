const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        // This option adds createdAt and updatedAt fields to the schema, which will automatically be managed by Mongoose.
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;