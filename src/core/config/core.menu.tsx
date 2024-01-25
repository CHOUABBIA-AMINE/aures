import { LocalShippingOutlined }    from "@mui/icons-material"
import { AccountBalanceOutlined }   from "@mui/icons-material"
import { MenuBookOutlined }         from "@mui/icons-material"
import { DescriptionOutlined }      from "@mui/icons-material"
import { OnDeviceTrainingOutlined } from "@mui/icons-material"
import { ShoppingCartOutlined }     from "@mui/icons-material"

import MenuItem                     from "./menu.item"

const coreMenu : MenuItem[] = [
    { name : "Provider",        icon : LocalShippingOutlined,       link: "/about" },
    { name : "Budget",          icon : AccountBalanceOutlined,      link: "/" },
    { name : "Consultation",    icon : MenuBookOutlined,            link: "/" },
    { name : "Contract",        icon : DescriptionOutlined,         link: "/" },
    { name : "Amendment",       icon : OnDeviceTrainingOutlined,    link: "/" },
    { name : "Purchase ",       icon : ShoppingCartOutlined,        link: "/" }
];

export default coreMenu;