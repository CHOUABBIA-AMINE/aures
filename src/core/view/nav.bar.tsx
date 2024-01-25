import { useContext, useState }           from "react";
import { useNavigate }          from "react-router-dom";

import { AppBar, Avatar }               from "@mui/material";
import { Button }               from "@mui/material";
import { IconButton }           from "@mui/material";
import { Stack }                from "@mui/material";
import { Toolbar }              from "@mui/material";
import { Typography }           from "@mui/material";
import { CatchingPokemon }      from "@mui/icons-material";
import { Login }                from "@mui/icons-material";

import { AuthContext }          from "../config/context/auth.context";
import ProfileMenu from "./profile.menu";


function Navbar() {
    const navigate = useNavigate();
    // const open = Boolean(anchorEl);
    const {user, setUser} = useContext(AuthContext);
    const login = () => {
        setUser({id:'1', username:'Amine'})
    }
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
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
                    <Button color="inherit" onClick={() => login()}>Home</Button>
                    <Button color="inherit" onClick={() => navigate("/about")}>About</Button>
                    <IconButton size="large" edge="end" color="inherit" aria-label="login" onClick={() => login()}>
                        <Login />
                    </IconButton>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'profile-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                    <ProfileMenu link={anchorEl}/>
                </Stack>
            </Toolbar>
        </AppBar>
	);
}
export default Navbar;