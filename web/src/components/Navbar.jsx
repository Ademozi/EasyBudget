import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Link changes the page route without doing a full browser refresh.

const Navbar = () => {

    const { user, logout } = useAuth();

    return (
        <nav>
            <Link to="/">
                EasyBudget
            </Link>

            <div>
                <span>
                    {user?.username}
                </span>

                <Link to="/transactions">
                    Transactions
                </Link>

                <Link to="/goals">
                    Goals
                </Link>

                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;