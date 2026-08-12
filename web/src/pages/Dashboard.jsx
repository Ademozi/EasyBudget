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

                const response = await api.get("/dashboard");

                console.log("Dashboard response:", response.data);

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
        <div>

            <Navbar />

            <main>

                <h1>EasyBudget</h1>

                <p>Welcome, {user?.username}</p>

                <h2>Balance</h2>

                <p>
                    {dashboard?.summary?.balance ?? 0} DA
                </p>

                <div>

                    <div>

                        <h3>Income</h3>

                        <p>
                            {dashboard?.summary?.totalIncome ?? 0} DA
                        </p>

                    </div>

                    <div>

                        <h3>Expenses</h3>

                        <p>
                            {dashboard?.summary?.totalExpenses ?? 0} DA
                        </p>

                    </div>
                </div>

                <h2>Recent Transactions</h2>

                <p>No transactions yet.</p>

                <h2>Savings Goals</h2>

                <p>No goals yet.</p>

            </main>
            
        </div>
    );
};

export default Dashboard;