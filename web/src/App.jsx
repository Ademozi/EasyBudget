import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import api from './services/api';

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

function Login() {
    return (
        <h1>Login</h1>
    );
}

function Register() {
    return (
        <h1>Register</h1>
    );
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
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/goals" element={<Goals />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;