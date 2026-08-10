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

        const response = await api.post("/auth/login", {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem("token", token);

        setUser(user);

        return user;
    };

    // Register
    const register = async (username, email, password) => {

        const response = await api.post("/auth/register", {
            username,
            email,
            password
        });

        return response.data;
    };

    // Restore user session when the app starts
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