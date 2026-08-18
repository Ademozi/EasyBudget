import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Button
} from "@mui/material";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Dashboard = () => {

    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                // The user ID is added automatically by axios interceptor
                const response = await api.get("/dashboard");

                setDashboard(response.data);

            } catch (error) {

                console.error(
                    "Failed to load dashboard:",
                    error
                );
            }
        };

        fetchDashboard();

    }, []);

    return (
        <>
            <Navbar />

            <Container maxWidth="lg">

                {/* Header */}
                <Box sx={{ mt: 4, mb: 4 }}>

                    <Typography variant="h4">
                        EasyBudget
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        Welcome, {user?.username}
                    </Typography>

                </Box>


                {/* Balance */}
                <Card sx={{ mb: 3 }}>

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Balance
                        </Typography>

                        <Typography variant="h4">
                            {dashboard?.summary?.balance ?? 0} DA
                        </Typography>

                    </CardContent>

                </Card>


                {/* Income + Expenses */}
                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Card>

                            <CardContent>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Income
                                </Typography>

                                <Typography variant="h5">
                                    {dashboard?.summary?.totalIncome ?? 0} DA
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>


                    <Grid size={{ xs: 12, md: 6 }}>

                        <Card>

                            <CardContent>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Expenses
                                </Typography>

                                <Typography variant="h5">
                                    {dashboard?.summary?.totalExpenses ?? 0} DA
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>


                {/* Recent Transactions */}
                <Typography
                    variant="h5"
                    sx={{ mt: 5, mb: 2 }}
                >
                    Recent Transactions
                </Typography>


                <Card>

                    <CardContent>

                        {dashboard?.recentTransactions?.length === 0 ? (

                            <Typography color="text.secondary">
                                No transactions yet.
                            </Typography>

                        ) : (

                            dashboard?.recentTransactions?.map(
                                (transaction) => (

                                    <Box
                                        key={transaction._id}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            py: 2,
                                            borderBottom: "1px solid #eee"
                                        }}
                                    >

                                        <Box>

                                            <Typography>
                                                {transaction.category.name}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {transaction.description}
                                            </Typography>

                                        </Box>


                                        <Typography>
                                            {transaction.type === "expense"
                                                ? "-"
                                                : "+"}

                                            {transaction.amount} DA
                                        </Typography>

                                    </Box>

                                )
                            )

                        )}

                    </CardContent>

                </Card>


                {/* View transactions button */}
                <Box sx={{ mt: 3, mb: 4 }}>

                    <Button
                        variant="contained"
                        component={Link}
                        to="/transactions"
                    >
                        View All Transactions
                    </Button>

                </Box>

            </Container>
        </>
    );
};

export default Dashboard;