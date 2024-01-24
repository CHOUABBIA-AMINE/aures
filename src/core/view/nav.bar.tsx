import { useNavigate }          from "react-router-dom";

import { AppBar }               from "@mui/material";
import { Button }               from "@mui/material";
import { IconButton }           from "@mui/material";
import { Stack }                from "@mui/material";
import { Toolbar }              from "@mui/material";
import { Typography }           from "@mui/material";
import { CatchingPokemon }      from "@mui/icons-material";

import { useAuth }              from "../config/hook/useAuth";

function Navbar() {
    const navigate = useNavigate();
    const handleLogin = () => {
        const { login } = useAuth();
        login({
          id: '1',
          username: 'John Doe'
        });
      };
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
                    <Button color="inherit" onClick={() => handleLogin}>Home</Button>
                    <Button color="inherit" onClick={() => navigate("/about")}>About</Button>
                </Stack>
            </Toolbar>
        </AppBar>
	);
}
export default Navbar;