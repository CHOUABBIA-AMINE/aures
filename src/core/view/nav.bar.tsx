import { useNavigate }      from "react-router-dom";

import { AppBar }           from "@mui/material";
import { Button }           from "@mui/material";
import { IconButton }       from "@mui/material";
import { Stack }            from "@mui/material";
import { Toolbar }          from "@mui/material";
import { Typography }       from "@mui/material";
import { CatchingPokemon }  from "@mui/icons-material";



function Navbar() {
    const navigate = useNavigate();
	return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <CatchingPokemon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow : 1 }}>
                    AURES
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                    <Button color="inherit" onClick={() => navigate("/about")}>About</Button>
                </Stack>
            </Toolbar>
        </AppBar>
	);
}
export default Navbar;