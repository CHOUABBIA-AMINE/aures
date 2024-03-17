import React                    from "react";
import { useContext }           from "react";

import { useNavigate }          from "react-router-dom";

import { Collapse }             from "@mui/material";
import { List }                 from "@mui/material";
import { ListItemButton }       from "@mui/material";
import { ListItemIcon }         from "@mui/material";
import { ListItemText }         from "@mui/material";
import { ExpandLess }           from "@mui/icons-material";
import { ExpandMore }           from "@mui/icons-material";

import { NavContext }           from "../../config/context/nav.context";
import { AuthContext }          from "../../config/context/auth.context";
import { NavItem }              from "../../config/nav.item";

const SidenavItem = (props : NavItem)=>{
    
    const { hasAuthority }  = useContext(AuthContext);
    const {menu, setMenu}   = useContext(NavContext);
    const navigate          = useNavigate();
    //const [open, setOpen] = useState(false);
    return (
        <>
        <ListItemButton key={props.name} onClick={() => typeof props.link === 'string' ? navigate(props.link) : props.name !== menu ? setMenu(props.name) : setMenu("")}>
            <ListItemIcon key={"icon-" + props.name}>
                {React.createElement(props.icon)}
            </ListItemIcon>
            <ListItemText key={"text-" + props.name} primary={props.name} />
            {typeof props.link !== 'string' ? menu === props.name  ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButton>
        <Collapse in={menu === props.name} timeout="auto" unmountOnExit sx={{background:'#ddd'}}>
            <List component="div" disablePadding key={"List-" + props.name}>
                {typeof props.link !== 'string' ? props.link.map((item) => (
                        hasAuthority(item.authority) ? <SidenavItem key={"SidenavItem-" + item.name} name={item.name} icon={item.icon} link={item.link} authority={item.authority}/> : ""
                    )) : null}
            </List>
        </Collapse>
        </>
    )
}
export { SidenavItem };