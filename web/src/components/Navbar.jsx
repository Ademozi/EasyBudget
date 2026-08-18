import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from "@mui/material";

import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <AppBar position="static">

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    EasyBudget
                </Typography>

                <Box>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        Dashboard
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/transactions"
                    >
                        Transactions
                    </Button>

                    <Button
                        color="inherit"
                    >
                        Logout
                    </Button>
                </Box>

            </Toolbar>

        </AppBar>
    );
};

export default Navbar;