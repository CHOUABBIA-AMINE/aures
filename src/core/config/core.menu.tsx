import { AccountBalanceOutlined }   from "@mui/icons-material"
import { AccountTreeOutlined }      from "@mui/icons-material"
import { DescriptionOutlined }      from "@mui/icons-material"
import { FactoryOutlined }          from "@mui/icons-material"
import { LocalShippingOutlined }    from "@mui/icons-material"
import { Login }                    from "@mui/icons-material"
import { MenuBookOutlined }         from "@mui/icons-material"
import { OnDeviceTrainingOutlined } from "@mui/icons-material"
import { ShoppingCartOutlined }     from "@mui/icons-material"

import { NavItem }                 from "./nav.item"

const coreMenu : NavItem[] = [
    { name : "Partner",         icon : FactoryOutlined,         authority : "AUTH_PROVIDER",            link: [
        { name : "Provider",        icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",       link: "/list/provider" }
    ] },
    { name : "Budget",          icon : AccountBalanceOutlined,  authority : "AUTH_ADMINISTRATION",      link: [
        { name : "Provider",        icon : Login,  authority : "AUTH_ADMINISTRATION",       link: "/login" }
    ] },
    { name : "Project",         icon : AccountTreeOutlined,     authority : "AUTH_PROJECT",             link: "/list/project/projectList" },
    { name : "Consultation",    icon : MenuBookOutlined,        authority : "AUTH_CONSULTATION",        link: "/list/consultation" },
    { name : "Contract",        icon : DescriptionOutlined,     authority : "AUTH_CONTRACT",            link: "/list/contract" },
    { name : "Amendment",       icon : OnDeviceTrainingOutlined,authority : "AUTH_AMENDMENT",           link: "/list/amendment" },
    { name : "Purchase ",       icon : ShoppingCartOutlined,    authority : "AUTH_CONSULTATION",        link: "/list/purchase" }
];

export { coreMenu };