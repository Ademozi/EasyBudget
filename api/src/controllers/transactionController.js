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

        const { type, page = 1, limit = 20 } = req.query;

        const filter = {
            user: req.user._id,
        };

        // If type is provided in the URL
        if (type) {
            filter.type = type;
        }
        // now filter becomes: 
        //{ 
        //  user: req.user._id,
        //  type: type
        //}

        // Calculate the number of documents to skip for pagination
        const skip = (Number(page) - 1) * Number(limit);

        
        // Calculate total pages based on the total count and limit
        // math.ceil() is used to round up to the nearest whole number, 
        // ensuring that any remaining transactions that don't fill a complete page are still accounted for in the total page count.
        const totalPages = Math.ceil(totalTransactions / Number(limit));

        const hasNextPage = Number(page) < totalPages;
        const hasPreviousPage = Number(page) > 1;


        // Optimization: Instead of making two separate database calls (one for counting and one for fetching),
        // Since they don't depend on each other, we can run them at the same time using Promise.all(), 
        // which reduces the total response time.
        const [totalTransactions, transactions] = await Promise.all([
            // Get total count of transactions for the user (and type if provided)
            Transaction.countDocuments(filter),
            // Get transactions for the user (and type if provided) with pagination
            Transaction.find(filter) // Filter transactions
                .populate("category") // istead of showing only the id of category, populate will show all the category details
                .sort({ date: -1 }) // Sort transactions by date (Newest first)
                .skip(skip)
                .limit(Number(limit))
        ]);

        res.status(200).json({
            success: true,
            page: Number(page),
            limit: Number(limit),
            count: transactions.length,
            totalTransactions,
            totalPages,
            hasNextPage,
            hasPreviousPage,
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

const getTransactionById = async (req, res) => {

    try {

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id
        }).populate("category");

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            transaction
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