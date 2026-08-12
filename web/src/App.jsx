import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import api from './services/api';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from './components/ProtectedRoute';

function Dashboard() {

  useEffect(() => {

    const testApi = async () => {

      try {

        const response = await api.get("/");

        console.log(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    testApi();

  }, []);


    return <h1>Dashboard</h1>;

}

function Transactions() {
    return (
        <h1>Transactions</h1>
    );
}

function Goals() {
    return (
        <h1>Goals</h1>
    );
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private pages */}
                <Route path="/" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />

                <Route path="/transactions" element={
                    <ProtectedRoute>
                        <Transactions />
                    </ProtectedRoute>
                } />

                <Route path="/goals" element={
                    <ProtectedRoute>
                        <Goals />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;