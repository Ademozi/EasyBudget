import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Login
    const login = async (email, password) => {

        // Send login request to the backend
        const response = await api.post("/auth/login", {
            email,
            password
        });

        // If login is successful, store the token in localStorage and update the user state
        const { token, user } = response.data;

        localStorage.setItem("token", token);

        // Update the user state with the logged-in user's information
        setUser(user);

        return user;
    };

    // Register
    const register = async (username, email, password) => {

        // Send registration request to the backend
        const response = await api.post("/auth/register", {
            username,
            email,
            password
        });

        return response.data;
    };

    // Restore user session when the app starts
    // This runs when AuthProvider is initially loaded.
    useEffect(() => {

        const restoreSession = async () => {

            const token = localStorage.getItem("token");

            // No token → user is not logged in
            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await api.get("/auth/me");

                setUser(response.data.user);

            } catch (error) {

                console.error("Failed to restore session:", error);

                // Token is invalid or expired
                localStorage.removeItem("token");
                setUser(null);

            } finally {

                setLoading(false);
            }
        };

        restoreSession();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                register,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};