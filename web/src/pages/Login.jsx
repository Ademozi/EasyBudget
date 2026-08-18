import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import {
    Container,
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Alert
} from "@mui/material";

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
        <Container maxWidth="sm">

            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 450
                    }}
                >

                    <CardContent sx={{ p: 4 }}>

                        <Typography
                            variant="h4"
                            align="center"
                            sx={{ mb: 1 }}
                        >
                            EasyBudget
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            align="center"
                            sx={{ mb: 4 }}
                        >
                            Welcome back
                        </Typography>


                        {/* If there is an error message, display it to the user. */}
                        {error && (
                            <Alert
                                severity="error"
                                sx={{ mb: 2 }}
                            >
                                {error}
                            </Alert>
                        )}


                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >

                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                sx={{ mb: 2 }}
                            />


                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                sx={{ mb: 3 }}
                            />


                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                            >
                                Login
                            </Button>

                        </Box>


                        <Typography
                            align="center"
                            sx={{ mt: 3 }}
                        >
                            Don't have an account?{" "}

                            <Button
                                component={Link}
                                to="/register"
                                variant="text"
                            >
                                Register
                            </Button>

                        </Typography>

                    </CardContent>

                </Card>

            </Box>

        </Container>
    );
};

export default Login;