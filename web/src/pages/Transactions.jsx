import { useState, useEffect } from 'react';
import api from "../services/api";
import Navbar from '../components/Navbar';


const Transactions = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        const fetchTransactions = async () => {

            try {

                // The user ID is added automaticallyby axios interceptor
                const response = await api.get("/transactions");

                console.log(response.data);

                setTransactions(response.data.transactions);

            } catch (error) {

                console.error(
                    "Failed to load transactions",
                    error
                );
            }

        };

        fetchTransactions();

    }, []);

    return (
        <div>

            <Navbar />

            <main>

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



            </main>

        </div>
    );

};

export default Transactions;