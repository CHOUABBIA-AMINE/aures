import React                    from "react";

import { useNavigate }          from "react-router-dom";

import { ListItem }             from "@mui/material";
import { ListItemButton }       from "@mui/material";
import { ListItemIcon }         from "@mui/material";
import { ListItemText }         from "@mui/material";

import MenuItem                 from "../config/nav.item";


const SidenavItem = (props : MenuItem)=>{
    
    const navigate = useNavigate();

    return (
        <ListItem key={props.name} disablePadding>
            <ListItemButton onClick={() => navigate(props.link)}>
                <ListItemIcon>
                    { React.createElement(props.icon) }
                </ListItemIcon>
                <ListItemText primary={props.name} />
            </ListItemButton>
        </ListItem>
    )

}
export default SidenavItem;