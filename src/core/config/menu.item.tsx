import { SvgIconTypeMap }           from "@mui/material"
import { OverridableComponent }     from "@mui/material/OverridableComponent"

type MenuItem = {
    name: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    link: string
}

export default MenuItem;