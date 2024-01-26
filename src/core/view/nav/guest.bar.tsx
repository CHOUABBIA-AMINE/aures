import { useNavigate }          from "react-router-dom";

import { IconButton }           from "@mui/material";
import { Login }                from "@mui/icons-material";


function GuestMenu() {
    const navigate = useNavigate();

    return(
        <IconButton size="large" edge="end" color="inherit" aria-label="login" onClick={() => navigate("/login")}>
            <Login />
        </IconButton>
    );
}

export {GuestMenu};
