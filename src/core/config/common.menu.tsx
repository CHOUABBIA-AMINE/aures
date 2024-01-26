import { Diversity3Outlined }       from "@mui/icons-material"
import { HomeWorkOutlined }         from "@mui/icons-material"
import { DraftsOutlined }           from "@mui/icons-material"
import { VerifiedUserOutlined }     from "@mui/icons-material"

import MenuItem                     from "./nav.item"

const commonMenu : MenuItem[] = [
    { name : "Administration",  icon : Diversity3Outlined,      link: "/" },
    { name : "Environment",     icon : HomeWorkOutlined,        link: "/" },
    { name : "Currial",         icon : DraftsOutlined,          link: "/" },
    { name : "Security",        icon : VerifiedUserOutlined,    link: "/" }
];

export default commonMenu;