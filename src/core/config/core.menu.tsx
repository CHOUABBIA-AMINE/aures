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

const coreMenu : NavItem[] = [
    { name : "Partner",         icon : FactoryOutlined,         authority : "AUTH_PROVIDER",            link: [
        { name : "Provider",        icon : LocalShippingOutlined,   authority : "AUTH_ADMINISTRATION",       link: "/list/provider" }
    ] },
    { name : "Budget",          icon : AccountBalanceOutlined,  authority : "AUTH_ADMINISTRATION",      link: [
        { name : "Operation",       icon : MapOutlined,             authority : "AUTH_ADMINISTRATION",       link: "/list/financialOperation/operationList" },
        { name : "Item",            icon : ReceiptLongOutlined,     authority : "AUTH_ADMINISTRATION",       link: "/list/budgetItem/budgetItemList" }
    ] },
    { name : "Realization",     icon : SquareFootOutlined,      authority : "AUTH_ADMINISTRATION",      link: [
        //{ name : "Project",         icon : AccountTreeOutlined,     authority : "AUTH_PROJECT",             link: "/list/project/projectList" },
        { name : "Consultation",    icon : MenuBookOutlined,        authority : "AUTH_CONSULTATION",        link: "/list/consultation/consultationList" },
        { name : "Contract",        icon : DescriptionOutlined,     authority : "AUTH_CONTRACT",            link: "/list/contract/contractList" },
        { name : "Amendment",       icon : OnDeviceTrainingOutlined,authority : "AUTH_AMENDMENT",           link: "/list/amendment" },
        { name : "Purchase ",       icon : ShoppingCartOutlined,    authority : "AUTH_CONSULTATION",        link: "/list/purchase" }
    ]}
];

export { coreMenu };