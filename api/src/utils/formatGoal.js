const formatGoal = (goal) => {

    const remainingAmount = Math.max(
        goal.targetAmount - goal.savedAmount,
        0
    );

    const progress = Math.min(
        (goal.savedAmount / goal.targetAmount) * 100,
        100
    );

    const isCompleted =
        goal.savedAmount >= goal.targetAmount;

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
};

module.exports = formatGoal;