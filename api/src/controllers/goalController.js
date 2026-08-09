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

const getGoals = async (req, res) => {

    try {

        const goals = await Goal.find({ user: req.user._id })
        .sort({ createdAt: -1 });

        const formattedGoals = goals.map((goal) => {

            const remainingAmount = Math.max(
                goal.targetAmount - goal.savedAmount,
                0
            );

            const progress = Math.min(
                (goal.savedAmount / goal.targetAmount) * 100,
                100
            );

            const isCompleted = goal.savedAmount >= goal.targetAmount;

            return {
                id: goal._id,
                name: goal.name,
                targetAmount: goal.targetAmount,
                savedAmount: goal.savedAmount,
                remainingAmount,
                progress: Number(progress.toFixed(2)),
                deadline: goal.deadline,
                isCompleted,
                createdAt: goal.createdAt
            };
        });

        res.status(200).json({
            success: true,
            goals: formattedGoals
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
    createGoal,
    getGoals
};