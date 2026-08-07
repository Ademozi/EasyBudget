const { body } = require("express-validator");


const createGoalValidation = [

    body("name")
        .trim()
        .notEmpty
        .withMessage("Goal name is required.")
        .isLength({ max: 50 })
        .withMessage("Goal name must not exceed 50 charaters."),

    body("targetAmount")
        .isFloat({ gt: 0 })
        .withMessage("Target amount must be greater than 0."),

    body("deadline")
        .optional()
        .isISO8601()
        .withMessage("Deadline must be a valid date.")

];

module.exports = { createGoalValidation };