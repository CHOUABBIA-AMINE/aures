import React                    from "react";
import { useContext }           from "react";
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
import { NavContext }           from "../../config/context/nav.context";


const SidenavItem = (props : NavItem)=>{
    
    const {menu, setMenu} = useContext(NavContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <>
        <ListItemButton key={props.name} onClick={() => typeof props.link === 'string' ? navigate(props.link) : setMenu(props.name)/*setOpen(()=>{ return !open;})*/}>
            <ListItemIcon key={"icon-" + props.name}>
                {React.createElement(props.icon)}
            </ListItemIcon>
            <ListItemText key={"text-" + props.name} primary={props.name} />
            {typeof props.link !== 'string' ? menu === props.name  ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButton>
        <Collapse in={menu === props.name} timeout="auto" unmountOnExit sx={{background:'#ddd'}}>
            <List component="div" disablePadding key={"List-" + props.name}>
                {typeof props.link !== 'string' ? props.link.map((item) => (
                        <SidenavItem key={"SidenavItem-" + item.name} name={item.name} icon={item.icon} link={item.link} />
                    )) : null}
            </List>
        </Collapse>
        </>
    )
}
export { SidenavItem };