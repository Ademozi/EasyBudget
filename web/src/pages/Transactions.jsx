import { useState, useEffect } from 'react';
import api from "../services/api";
import Navbar from '../components/Navbar';


const Transactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {

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

        fetchTransactions();

    }, [type, page]);

    return (
        <div>

            <Navbar />

            <main>
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