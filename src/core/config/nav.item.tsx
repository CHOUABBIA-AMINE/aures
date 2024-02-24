import { SvgIconTypeMap }           from "@mui/material"
import { OverridableComponent }     from "@mui/material/OverridableComponent"

type NavItem = {
    name: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    authority: string,
    link: string | NavItem[]
}

export type { NavItem };