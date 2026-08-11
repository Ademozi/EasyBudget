import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { login } = useAuth();

    // useNavigate lets you move the user to another page using JavaScript.
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    // The main part of the login process is handled in this function. 
    // It is called when the user submits the login form.
    const handleSubmit = async (e) => {

        // e is the event object that is passed to the function when the form is submitted.
        // The event contains information about what happened.
        // same as handleSubmit(event);

        // Stop the browser's normal form submission behavior.
        e.preventDefault();

        // Clear any previous error messages.
        // You don't want the old error to remain while the new request is happening.
        setError("");

        try {

            await login(email, password);

            // If login is successful, navigate the user to the dashboard page.
            navigate("/");

        } catch (error) {

            // If login fails, set an error message to be displayed to the user.
            setError(
                error.response?.data?.message ||
                "Login failed."
            );

        }
    };

    return (
        <div>

            <h1>Login</h1>

            {/* If there is an error message, display it to the user. */}
            {error && (
                <p>{error}</p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
};

export default Login;