import { Diversity3Outlined }       from "@mui/icons-material"
import { HomeWorkOutlined }         from "@mui/icons-material"
import { DraftsOutlined }           from "@mui/icons-material"
import { VerifiedUserOutlined }     from "@mui/icons-material"
import { PersonOutlineOutlined }    from "@mui/icons-material"
import { SecurityOutlined }         from "@mui/icons-material"
import { HttpsOutlined }            from "@mui/icons-material"

import { NavItem }                  from "./nav.item"

const commonMenu : NavItem[] = [
    { name : "Administration",  icon : Diversity3Outlined,      authority : "AUTH_ADMINISTRATION",      link : "/" },
    { name : "Environment",     icon : HomeWorkOutlined,        authority : "AUTH_ENVIRONMENT",         link : "/" },
    { name : "Currial",         icon : DraftsOutlined,          authority : "AUTH_COMMUNICATION",       link : "/" },
    { name : "Security",        icon : HttpsOutlined,           authority : "AUTH_SECURITY",            link : [
        { name : "User",            icon : PersonOutlineOutlined,   authority : "AUTH_USER",                link: "/list/user" },
        { name : "Role",            icon : SecurityOutlined,        authority : "AUTH_ROLE",                link: "/list/role" },
    ] }
];

export { commonMenu };