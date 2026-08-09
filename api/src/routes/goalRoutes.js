const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const { createGoalValidation, addMoneyValidation } = require("../validators/goalValidator");
const { createGoal, getGoals, addMoneyToGoal } = require("../controllers/goalController");

router.post("/", protect, createGoalValidation, validate, createGoal);
router.get("/", protect, getGoals);
router.patch("/:id/ad-money", protect, addMoneyValidation, validate, addMoneyToGoal);

module.exports = router;