import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// useAuth() gives you access to the values stored inside your AuthContext.

// children represents whatever you put inside ProtectedRoute.
const ProtectedRoute = ({ children }) => {

    const { user, loading } = useAuth();

    // Wait untill we know if the user is logged in
    if (loading) {
        return <p>Loading ...</p>;
    }

    // Not logged in -> go to login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Logged in -> show the page
    return children;
};

export default ProtectedRoute;

// Prevent users who are not logged in from accessing certain pages.