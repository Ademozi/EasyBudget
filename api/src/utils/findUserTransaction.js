const Transaction = require("../models/Transaction");

const findUserTransaction = async (transactionId, userId) => {
    return await Transaction.findOne({ 
        _id: transactionId, 
        user: userId 
    }).populate("category");
};

module.exports = findUserTransaction;