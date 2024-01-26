import { Diversity3Outlined }       from "@mui/icons-material"
import { HomeWorkOutlined }         from "@mui/icons-material"
import { DraftsOutlined }           from "@mui/icons-material"
import { VerifiedUserOutlined }     from "@mui/icons-material"

import { NavItem }                 from "./nav.item"

const commonMenu : NavItem[] = [
    { name : "Administration",  icon : Diversity3Outlined,      link: "/" },
    { name : "Environment",     icon : HomeWorkOutlined,        link: "/" },
    { name : "Currial",         icon : DraftsOutlined,          link: "/" },
    { name : "Security",        icon : VerifiedUserOutlined,    link: "/" }
];

export { commonMenu };