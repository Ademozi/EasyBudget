const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { getCategories } = require("../controllers/categoryController");

router.route("/").get(protect, getCategories);

module.exports = router;