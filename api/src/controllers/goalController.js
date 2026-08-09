const Goal = require("../models/Goal");
const formatGoal = require("../utils/formatGoal");

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

        const formattedGoals = goals.map(formatGoal);

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

const addMoneyToGoal = async (req, res) => {

    try {

        const { amount } = req.body;

        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!goal) {
            return res.status(404).json({
                success:  false,
                message: "Goal not found"
            });
        }

        goal.savedAmount += Number(amount);

        await goal.save();

        

        res.status(200).json({
            success: true,
            message: "Money added to goal successfully.",
            goal: formatGoal(goal)
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
    getGoals,
    addMoneyToGoal
};