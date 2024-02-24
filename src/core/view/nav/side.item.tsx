import React                    from "react";
import { useState }             from "react";

import { useNavigate }          from "react-router-dom";

import { Collapse }             from "@mui/material";
import { List }                 from "@mui/material";
import { ListItemButton }       from "@mui/material";
import { ListItemIcon }         from "@mui/material";
import { ListItemText }         from "@mui/material";
import { ExpandLess }           from "@mui/icons-material";
import { ExpandMore }           from "@mui/icons-material";

import { NavItem }              from "../../config/nav.item";


const SidenavItem = (props : NavItem)=>{
    
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <>
        <ListItemButton key={props.name} onClick={() => typeof props.link === 'string' ? navigate(props.link) : setOpen(!open)}>
            <ListItemIcon>
                {React.createElement(props.icon)}
            </ListItemIcon>
            <ListItemText primary={props.name} />
            {typeof props.link !== 'string' ? open  ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit sx={{background:'#ddd'}}>
            <List component="div" disablePadding>
                {typeof props.link !== 'string' ? props.link.map((item) => (
                        <SidenavItem name={item.name} icon={item.icon} link={item.link} />
                    )) : null}
            </List>
        </Collapse>
        </>
    )
}
export { SidenavItem };