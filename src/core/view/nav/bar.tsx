import { useContext }           from "react";
import { useNavigate }          from "react-router-dom";

import { AppBar }               from "@mui/material";
import { Button }               from "@mui/material";
import { Stack }                from "@mui/material";
import { Toolbar }              from "@mui/material";

import { AuthContext }          from "../../config/context/auth.context";
import { AuresLogo }            from "./logo";
import { UserMenu }             from "./user.menu";
import { GuestMenu }            from "./guest.bar";


function Navbar() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

	return (
        <AppBar position='sticky' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <AuresLogo />
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" onClick={() => navigate("/home")}>Home</Button>
                    <Button color="inherit" onClick={() => navigate("/about")}>About</Button>
                    {user != null ? <UserMenu /> : <GuestMenu />}
                </Stack>
            </Toolbar>
        </AppBar>
	);
}
export { Navbar };