const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createTransaction, getTransactions, getTransactionById  } = require("../controllers/transactionController");

router
    .route("/")
    .post(protect, createTransaction)
    .get(protect, getTransactions);

router
    .route("/:id")
    .get(protect, getTransactionById);

module.exports = router;