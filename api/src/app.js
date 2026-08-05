const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("EasyBudget API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;