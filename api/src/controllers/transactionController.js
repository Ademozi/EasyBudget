const Transaction = require("../models/Transaction");
const { create } = require("../models/User");
const findOrCreateCategory = require("../utils/findOrCreateCategory");

const createTransaction = async (req, res) => {

    try {

        const { type, amount, category, description, date } = req.body;

        const categoryDoc = await findOrCreateCategory(
            req.user._id,
            category
        );

        const transaction = await Transaction.create({
            user: req.user._id,
            type,
            amount,
            category: categoryDoc._id,
            description,
            date
        });

        res.status(500).json({
            success: false,
            message: error.message
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    }
};

module.exports = {
    createTransaction
};