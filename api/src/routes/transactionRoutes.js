const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createTransaction, getTransactions } = require("../controllers/transactionController");

// router.post("/", protect, createTransaction);
// router.get("/", protect, getTransactions);
router
    .route("/")
    .post(protect, createTransaction)
    .get(protect, getTransactions);

module.exports = router;