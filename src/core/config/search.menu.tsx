import { AccountBalanceOutlined }   from "@mui/icons-material"
import { AccountTreeOutlined }      from "@mui/icons-material"
import { DescriptionOutlined }      from "@mui/icons-material"
import { FactoryOutlined }          from "@mui/icons-material"
import { LocalShippingOutlined }    from "@mui/icons-material"
import { MapOutlined }              from "@mui/icons-material"
import { MenuBookOutlined }         from "@mui/icons-material"
import { ReceiptLongOutlined }      from "@mui/icons-material"
import { OnDeviceTrainingOutlined } from "@mui/icons-material"
import { ShoppingCartOutlined }     from "@mui/icons-material"
import { SquareFootOutlined }       from "@mui/icons-material"

import { NavItem }                 from "./nav.item"

const searchMenu : NavItem[] = [
    { name : "Search",          icon : FactoryOutlined,         authority : "AUTH_ADMINISTRATION",      link: [
        { name : "Provider",        icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",      link: "/search/provider" },
        { name : "Consultation",    icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",      link: "/search/consultation" },
        { name : "Contract",        icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",      link: "/search/contract" },
        { name : "Amendment",       icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",      link: "/search/amendment" },
        { name : "Mail",            icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",      link: "/search/mail" }
    ]},
    { name : "Status",          icon : FactoryOutlined,         authority : "AUTH_ADMINISTRATION",      link: [
        { name : "Consultation",    icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",      link: "/status/consultation" },
        { name : "Contract",        icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",      link: "/status/contract" },
        { name : "Amendment",       icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",      link: "/status/amendment" },
        { name : "Budget",          icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",      link: "/status/budget" },
    ]}
];

export { searchMenu };