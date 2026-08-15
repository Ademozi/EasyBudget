import { useState, useEffect } from 'react';
import api from "../services/api";
import Navbar from '../components/Navbar';


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
    const [categoryMode, setCategoryMode] = useState("");

    const fetchTransactions = async () => {

            try {

                // The user ID is added automaticallyby axios interceptor
                const response = await api.get("/transactions", {
                    params: {
                        type: type || undefined,
                        page: page,
                        limit: 5
                    }
                });

                console.log(response.data);

                setTransactions(response.data.transactions);
                setPagination(response.data);

            } catch (error) {

                console.error(
                    "Failed to load transactions",
                    error
                );
            }

        };

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

    useEffect(() => {

        fetchTransactions();
        fetchCategories();

    }, [type, page]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("/transactions", {
                type: formData.type,
                amount: Number(formData.amount),
                category: formData.category,
                description: formData.description,
                date: formData.date,
            });

            setMessage("Transaction created successfully!");

            // Clear the form
            setFormData({
                type: "expense",
                amount: "",
                category: "",
                description: "",
                date: ""
            });

            console.log("Transaction created:", response.data);

            await fetchTransactions(); // Refresh the transactions list after adding a new transaction
            fetchCategories(); // Refresh the categories list after adding a new transaction


        } catch (error) {
            console.error("Failed to create transaction:", error);

            setMessage("Failed to add transaction.");
        }
        
    };

    const toggleCategoryMode = () => {
        if (categoryMode === "existing") {
            setCategoryMode("new");
        } else {
            setCategoryMode("existing");
        }

        // When the user switches from: Select existing category to: Create new category
        // we want to clear whatever category was selected before.
        setFormData({
            ...formData,
            category: ""
        });
    };

    return (
        <div>

            <Navbar />

            <main>

                {message && <p>{message}</p>}

                <form onSubmit={handleSubmit}>

                    <h2>Add Transaction</h2>

                    <div>
                        <label>Type</label>

                        <select
                        // ...formData means that we are spreading the existing formData object and 
                        // then updating the type property with the new value from the select input. 
                        // This way, we are keeping the other properties of formData intact while only changing the type.
                            value={formData.type}
                            onChange={(e) => 
                                setFormData({ 
                                    // ...formData means Keep everything that was already there. 
                                    // and replaces only the type
                                    ...formData, 
                                    type: e.target.value 
                            })}
                         >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div>
                        <label>Amount</label>

                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={(e) => 
                                setFormData({
                                    ...formData,
                                    amount: e.target.value
                                })
                            }
                        />
                    </div>

                    <div>
                        <label>Category</label>

                        {categoryMode === "existing" ? (
                            <select
                                value={formData.category}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        category: e.target.value
                                    })
                                }}
                            >

                                <option value="">Select a Category</option>

                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category.name}
                                    >
                                        {category.name}
                                    </option>
                                ))}

                            </select>
                        ) : (
                            <input
                                type="text"
                                placeholder="Enter new category"
                                value={formData.category}
                                onChange={(e) => 
                                    setFormData({
                                        ...formData,
                                        category: e.target.value
                                    })
                                }
                            />
                        )}

                        <button
                            type="button"
                            onClick={toggleCategoryMode}
                        >
                            {categoryMode === "existing"
                            ? "Create new category"
                            : "Choose existing category"}
                        </button>
                    </div>

                    <div>
                        <label>Description</label>

                        <input
                            type="text"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={(e) => 
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }
                        />
                    </div>

                    <div>
                        <label>Date</label>

                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => 
                                setFormData({
                                    ...formData, 
                                    date: e.target.value
                                })
                            }
                        />
                    </div>

                    <button type="submit">
                        Add Transaction
                    </button>

                </form>

                <div>

                    <button onClick={() => {
                            setType("");
                            setPage(1);
                        }}>
                        All
                    </button>

                    <button onClick={() => {
                            setType("income");
                            setPage(1);
                        }}>
                        Income
                    </button>

                    <button onClick={() => {
                            setType("expense");
                            setPage(1);
                        }}>
                        Expense
                    </button>

                </div>

                <h1>Transactions</h1>

                {transactions.map((transaction) => (
                    <div key={transaction.id}>

                        <p>
                            {transaction.category.name}
                        </p>

                        <p>
                            {transaction.category.description}
                        </p>

                        <p>
                            {transaction.type === "expense"
                            ? "-"
                            : "+"}

                            {transaction.amount} DA
                        </p>

                    </div>
                ))}

                <div>

                    <button
                        disabled={!pagination?.hasPreviousPage}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span>
                        Page {pagination?.page ?? 1} of {pagination?.totalPages ?? 1}
                    </span>

                    <button
                        disabled={!pagination?.hasNextPage}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

            </main>

        </div>
    );

};

export default Transactions;