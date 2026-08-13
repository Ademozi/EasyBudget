import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from "../services/api";
import Navbar from '../components/Navbar';


const Transactions = () => {

    const { user } = useAuth();

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        const fetchTransactions = async () => {

            try {

                // The user ID is added automaticallyby axios interceptor
                const response = await api.get("/transactions");

                setTransactions(response.data);

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

                <h1>EasyBudget</h1>

                <h2>{user?.username} Transactions</h2>

                

            </main>

        </div>
    );

};