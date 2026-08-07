const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const { createGoalValidation } = require("../validators/goalValidator");
const { createGoal } = require("../controllers/goalController");

router.post("/", protect, createGoalValidation, validate, createGoal);

module.exports = router;