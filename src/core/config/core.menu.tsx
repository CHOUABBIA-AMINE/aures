import { LocalShippingOutlined, Login }    from "@mui/icons-material"
import { AccountBalanceOutlined }   from "@mui/icons-material"
import { MenuBookOutlined }         from "@mui/icons-material"
import { DescriptionOutlined }      from "@mui/icons-material"
import { OnDeviceTrainingOutlined } from "@mui/icons-material"
import { ShoppingCartOutlined }     from "@mui/icons-material"

import { NavItem }                 from "./nav.item"

const coreMenu : NavItem[] = [
    { name : "Provider",        icon : LocalShippingOutlined,   authority : "AUTH_PROVIDER",            link: "/about" },
    { name : "Budget",          icon : AccountBalanceOutlined,  authority : "AUTH_ADMINISTRATION",      link: [
        { name : "Provider",        icon : Login,  authority : "AUTH_ADMINISTRATION",       link: "/login" }
    ] },
    { name : "Consultation",    icon : MenuBookOutlined,        authority : "AUTH_CONSULTATION",        link: "/" },
    { name : "Contract",        icon : DescriptionOutlined,     authority : "AUTH_CONTRACT",            link: "/" },
    { name : "Amendment",       icon : OnDeviceTrainingOutlined,authority : "AUTH_AMENDMENT",           link: "/" },
    { name : "Purchase ",       icon : ShoppingCartOutlined,    authority : "AUTH_CONSULTATION",        link: "/" }
];

export { coreMenu };