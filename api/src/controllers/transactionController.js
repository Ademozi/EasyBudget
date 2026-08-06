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

        res.status(201).json({
            success: true,
            transaction
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    }
};

const getTransactions = async (req, res) => {

    try {

        const transactions = await Transaction
            .find({ user: req.user._id }) // Filter transactions by the authenticated user's ID
            .populate("category") // istead of showing only the id of category, populate will show all the category details
            .sort({ date: -1 }); // Sort transactions by date (Newest first)

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions
        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createTransaction,
    getTransactions
};