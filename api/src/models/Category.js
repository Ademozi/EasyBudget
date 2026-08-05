const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create a compound index to ensure that each user can have unique category names.
// For the same user, category names must be unique.
categorySchema.index(
    {
        user: 1,
        name: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model("Category", categorySchema);