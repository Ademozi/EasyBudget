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

const Register = () => {

    const { register } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await register(username, email, password);

            // If registration is successful, navigate the user to the login page.
            navigate("/login");

        } catch (error) {

            const errors = error.response?.data?.errors;

            if (errors) {
                setError(errors[0]?.msg || "Registration failed.");
            } else {
                setError(
                    error.response?.data?.message ||
                    "Registration failed."
                );
            }
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
                            Create your account
                        </Typography>


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
                                type="text"
                                label="Username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                sx={{ mb: 2 }}
                            />


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
                                Register
                            </Button>

                        </Box>


                        <Typography
                            align="center"
                            sx={{ mt: 3 }}
                        >
                            Already have an account?{" "}

                            <Button
                                component={Link}
                                to="/login"
                                variant="text"
                            >
                                Login
                            </Button>

                        </Typography>

                    </CardContent>

                </Card>

            </Box>

        </Container>
    );
};

export default Register;