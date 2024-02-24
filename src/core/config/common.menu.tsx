import { Diversity3Outlined }       from "@mui/icons-material"
import { HomeWorkOutlined }         from "@mui/icons-material"
import { DraftsOutlined }           from "@mui/icons-material"
import { VerifiedUserOutlined }     from "@mui/icons-material"
import { PersonOutlineOutlined }    from "@mui/icons-material"
import { SecurityOutlined }         from "@mui/icons-material"
import { HttpsOutlined }            from "@mui/icons-material"

import { NavItem }                  from "./nav.item"

const commonMenu : NavItem[] = [
    { name : "Administration",  icon : Diversity3Outlined,      link: "/" },
    { name : "Environment",     icon : HomeWorkOutlined,        link: "/" },
    { name : "Currial",         icon : DraftsOutlined,          link: "/" },
    { name : "Security",        icon : HttpsOutlined,           link: [
        { name : "User",            icon : PersonOutlineOutlined,   link: "/list/user" },
        { name : "Role",            icon : SecurityOutlined,        link: "/list/role" },
        { name : "Authority",       icon : VerifiedUserOutlined,    link: "/authority" }
    ] }
];

export { commonMenu };