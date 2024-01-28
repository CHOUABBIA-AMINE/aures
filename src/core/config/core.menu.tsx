import { LocalShippingOutlined, Login }    from "@mui/icons-material"
import { AccountBalanceOutlined }   from "@mui/icons-material"
import { MenuBookOutlined }         from "@mui/icons-material"
import { DescriptionOutlined }      from "@mui/icons-material"
import { OnDeviceTrainingOutlined } from "@mui/icons-material"
import { ShoppingCartOutlined }     from "@mui/icons-material"

import { NavItem }                 from "./nav.item"

const coreMenu : NavItem[] = [
    { name : "Provider",        icon : LocalShippingOutlined,       link: "/about" },
    { name : "Budget",          icon : AccountBalanceOutlined,      link: [
        { name : "Provider",        icon : Login,       link: "/login" }
    ] },
    { name : "Consultation",    icon : MenuBookOutlined,            link: "/" },
    { name : "Contract",        icon : DescriptionOutlined,         link: "/" },
    { name : "Amendment",       icon : OnDeviceTrainingOutlined,    link: "/" },
    { name : "Purchase ",       icon : ShoppingCartOutlined,        link: "/" }
];

export { coreMenu };