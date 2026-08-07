const Goal = require("../models/Goal");

const createGoal = async (req, res) => {

    try {

        const { name, targetAmount, deadline } = req.body;

        const existingGoal = await Goal.findOne({
            user: req.user._id,
            name: name.trim()
        });

        if (existingGoal) {
            return res.status(400).json({
                success: false,
                message: "A goal with this name already exists."
            });
        }

        const goal = await Goal.create({
            user: req.user._id,
            name: name.trim(),
            targetAmount,
            deadline
        });

        res.status(201).json({
            success: true,
            message: "Goal created successfully.",
            goal
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
    createGoal
};