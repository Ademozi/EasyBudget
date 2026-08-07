const Transaction = require("../models/Transaction");

const getDashboard = async (req, res) => {
    try {

        // Aggregation
        const summary = await Transaction.aggregate([ 
            {
                // filter only the logged-in user's transactions.
                $match: {
                    user: req.user._id
                }
            },
            // {
            //     // Create groups based on the transaction type.
            //     $group: {
            //         _id: "$type",
            //         // Add all amounts inside each group.
            //         total: {
            //             $sum: "$amount"
            //         }
            //     }
            // }
            {
                $group: {
                    // Put everything into one group.
                    _id: null,

                    totalIncome: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$type", "income"]
                                },
                                "$amount",
                                0
                            ]
                        }
                    },

                    totalExpenses: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$type", "expense"]
                                },
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            }
         ]);

        // Because the aggregation returns an array, 
        // we need to check if the first element exists. 
        // If it doesn't, we set default values for totalIncome and totalExpenses. 
        const financialSummary = summary[0] || {
            totalIncome: 0,
            totalExpenses: 0
        };

        const balance = financialSummary.totalIncome - financialSummary.totalExpenses;
        

        res.status(200).json({
            success: true,
            summary: {
                totalIncome: financialSummary.totalIncome,
                totalExpenses: financialSummary.totalExpenses,
                balance
            }
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
    getDashboard
};