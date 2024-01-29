import { useState }             from "react";
import { useNavigate }          from "react-router-dom";

import { Avatar }               from "@mui/material";
import { Divider }              from "@mui/material";
import { IconButton }           from "@mui/material";
import { ListItemIcon }         from "@mui/material";
import { Menu }                 from "@mui/material";
import { MenuItem }             from "@mui/material";

import { Logout }               from "@mui/icons-material";
import { PersonAdd }            from "@mui/icons-material";
import { Settings }             from "@mui/icons-material";
import { useUser }              from "../../config/hook/useUser";


function UserMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<Boolean>(Boolean(anchorEl));
    const { removeUser } = useUser();
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };
    const logout = () => {
        handleClose();
        navigate("/home");
        removeUser();
    };

    return (
        <>
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
            <Menu
                anchorEl={anchorEl}
                id="profile-menu"
                open={open.valueOf()}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ 
                    horizontal: 'right', 
                    vertical: 'top' 
                }}
                anchorOrigin={{ 
                    horizontal: 'right', 
                    vertical: 'bottom' 
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile 
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account 
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
export { UserMenu };