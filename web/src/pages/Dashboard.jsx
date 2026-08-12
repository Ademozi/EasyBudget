import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    const { user } = useAuth();

    return (
        <div>
            <h1>EasyBudget</h1>

            <p>Welcome, {user?.username}</p>

            <h2>Balance</h2>
            <p>0 DA</p>

            <div>
                <div>
                    <h3>Income</h3>
                    <p>0 DA</p>
                </div>

                <div>
                    <h3>Expenses</h3>
                    <p>0 DA</p>
                </div>
            </div>

            <h2>Recent Transactions</h2>

            <p>No transactions yet.</p>

            <h2>Savings Goals</h2>

            <p>No goals yet.</p>
        </div>
    );
};

export default Dashboard;