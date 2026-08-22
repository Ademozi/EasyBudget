import { useState, useEffect } from "react";

import {
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Box,
    Alert,
    LinearProgress
} from "@mui/material";

import Navbar from "../components/Navbar";
import api from "../services/api";


const Goals = () => {

    const [goals, setGoals] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        targetAmount: "",
        deadline: ""
    });

    const [message, setMessage] = useState("");

    const [amount, setAmount] = useState("");


    // -----------------------------
    // Fetch goals
    // -----------------------------

    const fetchGoals = async () => {

        try {

            const response = await api.get("/goals");

            setGoals(response.data.goals);

        } catch (error) {

            console.error(
                "Failed to load goals:",
                error
            );
        }
    };


    // -----------------------------
    // Load goals when page opens
    // -----------------------------

    useEffect(() => {

        fetchGoals();

    }, []);


    // -----------------------------
    // Create goal
    // -----------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/goals", {
                name: formData.name,
                targetAmount: Number(formData.targetAmount),
                deadline: formData.deadline
            });

            setMessage("Goal created successfully!");


            // Clear form
            setFormData({
                name: "",
                targetAmount: "",
                deadline: ""
            });


            // Refresh goals
            fetchGoals();

        } catch (error) {

            console.error(
                "Failed to create goal:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Failed to create goal."
            );
        }
    };


    // -----------------------------
    // Add money to goal
    // -----------------------------

    const handleAddMoney = async (goalId) => {

        if (!amount || Number(amount) <= 0) {
            return;
        }

        try {

            await api.patch(
                `/goals/${goalId}/add-money`,
                {
                    amount: Number(amount)
                }
            );

            setMessage(
                "Money added to goal successfully!"
            );

            setAmount("");

            fetchGoals();

        } catch (error) {

            console.error(
                "Failed to add money:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Failed to add money."
            );
        }
    };


    // -----------------------------
    // Delete goal
    // -----------------------------

    const handleDelete = async (goalId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this goal?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(`/goals/${goalId}`);

            setMessage("Goal deleted successfully!");

            fetchGoals();

        } catch (error) {

            console.error(
                "Failed to delete goal:",
                error
            );
        }
    };


    return (
        <>
            <Navbar />

            <Container maxWidth="lg">

                {/* =========================
                    PAGE HEADER
                ========================= */}

                <Box sx={{ mt: 4, mb: 4 }}>

                    <Typography variant="h4">
                        Goals
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Save money for things you want
                    </Typography>

                </Box>


                {/* =========================
                    MESSAGE
                ========================= */}

                {message && (
                    <Alert
                        severity={
                            message.includes("successfully")
                                ? "success"
                                : "error"
                        }
                        sx={{ mb: 3 }}
                    >
                        {message}
                    </Alert>
                )}


                {/* =========================
                    CREATE GOAL
                ========================= */}

                <Card sx={{ mb: 4 }}>

                    <CardContent>

                        <Typography
                            variant="h5"
                            sx={{ mb: 3 }}
                        >
                            Create Goal
                        </Typography>


                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >

                            <TextField
                                fullWidth
                                label="Goal name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                                sx={{ mb: 2 }}
                            />


                            <TextField
                                fullWidth
                                label="Target amount"
                                type="number"
                                value={formData.targetAmount}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        targetAmount: e.target.value
                                    })
                                }
                                sx={{ mb: 2 }}
                            />


                            <TextField
                                fullWidth
                                label="Deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        deadline: e.target.value
                                    })
                                }
                                slotProps={{
                                    inputLabel: {
                                        shrink: true
                                    }
                                }}
                                sx={{ mb: 3 }}
                            />


                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Create Goal
                            </Button>

                        </Box>

                    </CardContent>

                </Card>


                {/* =========================
                    GOALS LIST
                ========================= */}

                <Typography
                    variant="h5"
                    sx={{ mb: 2 }}
                >
                    My Goals
                </Typography>


                {goals.length === 0 ? (

                    <Typography color="text.secondary">
                        You don't have any goals yet.
                    </Typography>

                ) : (

                    goals.map((goal) => {

                        const progress =
                            goal.targetAmount > 0
                                ? (
                                    goal.savedAmount /
                                    goal.targetAmount
                                ) * 100
                                : 0;

                        return (
                            <Card
                                key={goal._id}
                                sx={{ mb: 3 }}
                            >

                                <CardContent>

                                    {/* Goal name */}

                                    <Typography
                                        variant="h5"
                                        sx={{ mb: 1 }}
                                    >
                                        {goal.name}
                                    </Typography>


                                    {/* Amount */}

                                    <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                    >
                                        {goal.savedAmount} DA /{" "}
                                        {goal.targetAmount} DA
                                    </Typography>


                                    {/* Progress */}

                                    <LinearProgress
                                        variant="determinate"
                                        value={Math.min(
                                            progress,
                                            100
                                        )}
                                        sx={{
                                            height: 10,
                                            borderRadius: 5,
                                            mb: 1
                                        }}
                                    />


                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {Math.round(progress)}%
                                    </Typography>


                                    {/* Deadline */}

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        Deadline:{" "}
                                        {new Date(
                                            goal.deadline
                                        ).toLocaleDateString()}
                                    </Typography>


                                    {/* Add money */}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            mt: 3
                                        }}
                                    >

                                        <TextField
                                            label="Amount"
                                            type="number"
                                            size="small"
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                handleAddMoney(
                                                    goal._id
                                                )
                                            }
                                        >
                                            Add Money
                                        </Button>

                                    </Box>


                                    {/* Delete */}

                                    <Button
                                        color="error"
                                        variant="outlined"
                                        onClick={() =>
                                            handleDelete(
                                                goal._id
                                            )
                                        }
                                        sx={{ mt: 2 }}
                                    >
                                        Delete
                                    </Button>

                                </CardContent>

                            </Card>
                        );
                    })

                )}

            </Container>
        </>
    );
};

export default Goals;