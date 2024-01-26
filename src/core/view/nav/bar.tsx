import { useContext }           from "react";
import { useNavigate }          from "react-router-dom";

import { AppBar }               from "@mui/material";
import { Button }               from "@mui/material";
import { IconButton }           from "@mui/material";
import { Stack }                from "@mui/material";
import { Toolbar }              from "@mui/material";
import { Typography }           from "@mui/material";
import { CatchingPokemon }      from "@mui/icons-material";
import { Login }                from "@mui/icons-material";

import { AuthContext }          from "../../config/context/auth.context";
import { ProfileMenu }          from "./profile.menu";


function Navbar() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const login = () => {
        setUser({id:'1', username:'Amine'})
    }

	return (
        <AppBar position='static' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <CatchingPokemon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow : 1 }}>
                    AURES
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" onClick={() => login()}>Home</Button>
                    <Button color="inherit" onClick={() => navigate("/about")}>About</Button>
                    <IconButton size="large" edge="end" color="inherit" aria-label="login" onClick={() => navigate("/login")}>
                        <Login />
                    </IconButton>
                    <ProfileMenu /> 
                </Stack>
            </Toolbar>
        </AppBar>
	);
}
export { Navbar };