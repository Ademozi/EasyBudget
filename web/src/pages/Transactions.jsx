import { useState, useEffect } from "react";

import {
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Box,
    Grid,
    Alert
} from "@mui/material";

import api from "../services/api";
import Navbar from "../components/Navbar";


const Transactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    const [formData, setFormData] = useState({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: ""
    });

    const [message, setMessage] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryMode, setCategoryMode] = useState("existing");


    // -----------------------------
    // Fetch transactions
    // -----------------------------

    const fetchTransactions = async () => {

        try {

            const response = await api.get("/transactions", {
                params: {
                    type: type || undefined,
                    page: page,
                    limit: 5
                }
            });

            setTransactions(response.data.transactions);
            setPagination(response.data);

        } catch (error) {

            console.error(
                "Failed to load transactions",
                error
            );
        }
    };


    // -----------------------------
    // Fetch categories
    // -----------------------------

    const fetchCategories = async () => {

        try {

            const response = await api.get("/categories");

            setCategories(response.data.categories);

        } catch (error) {

            console.error(
                "Failed to load categories",
                error
            );
        }
    };


    // -----------------------------
    // Load data
    // -----------------------------

    useEffect(() => {

        fetchTransactions();
        fetchCategories();

    }, [type, page]);


    // -----------------------------
    // Create transaction
    // -----------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/transactions", {
                type: formData.type,
                amount: Number(formData.amount),
                category: formData.category,
                description: formData.description,
                date: formData.date
            });

            setMessage("Transaction created successfully!");

            setFormData({
                type: "expense",
                amount: "",
                category: "",
                description: "",
                date: ""
            });

            await fetchTransactions();
            fetchCategories();

        } catch (error) {

            console.error(
                "Failed to create transaction:",
                error
            );

            setMessage("Failed to add transaction.");
        }
    };


    // -----------------------------
    // Toggle category mode
    // -----------------------------

    const toggleCategoryMode = () => {

        if (categoryMode === "existing") {
            setCategoryMode("new");
        } else {
            setCategoryMode("existing");
        }

        setFormData({
            ...formData,
            category: ""
        });
    };


    // -----------------------------
    // Delete transaction
    // -----------------------------

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(`/transactions/${id}`);

            await fetchTransactions();

        } catch (error) {

            console.error(
                "Failed to delete transaction:",
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
                        Transactions
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        Manage your income and expenses
                    </Typography>

                </Box>


                {/* =========================
                    SUCCESS / ERROR MESSAGE
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
                    ADD TRANSACTION FORM
                ========================= */}

                <Card sx={{ mb: 4 }}>

                    <CardContent>

                        <Typography
                            variant="h5"
                            sx={{ mb: 3 }}
                        >
                            Add Transaction
                        </Typography>


                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >

                            <Grid container spacing={2}>

                                {/* Type */}

                                <Grid size={{ xs: 12, sm: 6 }}>

                                    <FormControl fullWidth>

                                        <InputLabel>
                                            Type
                                        </InputLabel>

                                        <Select
                                            value={formData.type}
                                            label="Type"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    type: e.target.value
                                                })
                                            }
                                        >

                                            <MenuItem value="expense">
                                                Expense
                                            </MenuItem>

                                            <MenuItem value="income">
                                                Income
                                            </MenuItem>

                                        </Select>

                                    </FormControl>

                                </Grid>


                                {/* Amount */}

                                <Grid size={{ xs: 12, sm: 6 }}>

                                    <TextField
                                        fullWidth
                                        label="Amount"
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                amount: e.target.value
                                            })
                                        }
                                    />

                                </Grid>


                                {/* Category */}

                                <Grid size={{ xs: 12, sm: 6 }}>

                                    {categoryMode === "existing" ? (

                                        <FormControl fullWidth>

                                            <InputLabel>
                                                Category
                                            </InputLabel>

                                            <Select
                                                value={formData.category}
                                                label="Category"
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        category: e.target.value
                                                    })
                                                }
                                            >

                                                <MenuItem value="">
                                                    Select a category
                                                </MenuItem>

                                                {categories.map((category) => (

                                                    <MenuItem
                                                        key={category._id}
                                                        value={category.name}
                                                    >
                                                        {category.name}
                                                    </MenuItem>

                                                ))}

                                            </Select>

                                        </FormControl>

                                    ) : (

                                        <TextField
                                            fullWidth
                                            label="New category"
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    category: e.target.value
                                                })
                                            }
                                        />

                                    )}

                                </Grid>


                                {/* Category toggle */}

                                <Grid size={{ xs: 12, sm: 6 }}>

                                    <Button
                                        type="button"
                                        variant="outlined"
                                        onClick={toggleCategoryMode}
                                        sx={{ height: "56px" }}
                                    >
                                        {categoryMode === "existing"
                                            ? "Create new category"
                                            : "Choose existing category"}
                                    </Button>

                                </Grid>


                                {/* Description */}

                                <Grid size={{ xs: 12, sm: 6 }}>

                                    <TextField
                                        fullWidth
                                        label="Description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value
                                            })
                                        }
                                    />

                                </Grid>


                                {/* Date */}

                                <Grid size={{ xs: 12, sm: 6 }}>

                                    <TextField
                                        fullWidth
                                        label="Date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                date: e.target.value
                                            })
                                        }
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true
                                            }
                                        }}
                                    />

                                </Grid>

                            </Grid>


                            {/* Submit button */}

                            <Box sx={{ mt: 3 }}>

                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Add Transaction
                                </Button>

                            </Box>

                        </Box>

                    </CardContent>

                </Card>


                {/* =========================
                    FILTERS
                ========================= */}

                <Box sx={{ mb: 3 }}>

                    <Typography
                        variant="h5"
                        sx={{ mb: 2 }}
                    >
                        Transactions
                    </Typography>


                    <Box sx={{ display: "flex", gap: 1 }}>

                        <Button
                            variant={
                                type === ""
                                    ? "contained"
                                    : "outlined"
                            }
                            onClick={() => {
                                setType("");
                                setPage(1);
                            }}
                        >
                            All
                        </Button>


                        <Button
                            variant={
                                type === "income"
                                    ? "contained"
                                    : "outlined"
                            }
                            onClick={() => {
                                setType("income");
                                setPage(1);
                            }}
                        >
                            Income
                        </Button>


                        <Button
                            variant={
                                type === "expense"
                                    ? "contained"
                                    : "outlined"
                            }
                            onClick={() => {
                                setType("expense");
                                setPage(1);
                            }}
                        >
                            Expense
                        </Button>

                    </Box>

                </Box>


                {/* =========================
                    TRANSACTIONS LIST
                ========================= */}

                <Card>

                    <CardContent>

                        {transactions.length === 0 ? (

                            <Typography
                                color="text.secondary"
                            >
                                No transactions found.
                            </Typography>

                        ) : (

                            transactions.map((transaction) => (

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

                                    {/* Transaction information */}

                                    <Box>

                                        <Typography
                                            variant="h6"
                                        >
                                            {transaction.category.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {transaction.description}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {new Date(
                                                transaction.date
                                            ).toLocaleDateString()}
                                        </Typography>

                                    </Box>


                                    {/* Amount + Delete */}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2
                                        }}
                                    >

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {transaction.type === "expense"
                                                ? "-"
                                                : "+"}

                                            {transaction.amount} DA
                                        </Typography>


                                        <Button
                                            color="error"
                                            variant="outlined"
                                            onClick={() =>
                                                handleDelete(
                                                    transaction._id
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>

                                    </Box>

                                </Box>

                            ))

                        )}

                    </CardContent>

                </Card>


                {/* =========================
                    PAGINATION
                ========================= */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        my: 4
                    }}
                >

                    <Button
                        variant="outlined"
                        disabled={!pagination?.hasPreviousPage}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </Button>


                    <Typography>
                        Page {pagination?.page ?? 1} of{" "}
                        {pagination?.totalPages ?? 1}
                    </Typography>


                    <Button
                        variant="outlined"
                        disabled={!pagination?.hasNextPage}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>

                </Box>

            </Container>
        </>
    );
};

export default Transactions;