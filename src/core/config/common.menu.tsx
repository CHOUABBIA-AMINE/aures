import { Diversity3Outlined }       from "@mui/icons-material"
import { DomainOutlined }           from "@mui/icons-material"
import { EngineeringOutlined }      from "@mui/icons-material"
import { Person2Outlined }          from "@mui/icons-material"
import { WorkOutlineOutlined }      from "@mui/icons-material"
import { HomeWorkOutlined }         from "@mui/icons-material"
import { DraftsOutlined }           from "@mui/icons-material"
import { PersonOutlineOutlined }    from "@mui/icons-material"
import { SecurityOutlined }         from "@mui/icons-material"
import { HttpsOutlined }            from "@mui/icons-material"

import { NavItem }                  from "./nav.item"

const commonMenu : NavItem[] = [
    { name : "Administration",  icon : Diversity3Outlined,      authority : "AUTH_ADMINISTRATION",      link : [
        { name : "Structure",       icon : DomainOutlined,          authority : "AUTH_STRUCTURE",           link: "/list/structure" },
        { name : "Job",             icon : WorkOutlineOutlined,     authority : "AUTH_JOB",                 link: "/list/job" },
        { name : "Person",          icon : Person2Outlined,         authority : "AUTH_PERSON",              link: "/list/person" },
        { name : "Employee",        icon : EngineeringOutlined,     authority : "AUTH_EMPLOYEE",            link: "/list/employee/employeeList" }
    ] },
    { name : "Environment",     icon : HomeWorkOutlined,        authority : "AUTH_ENVIRONMENT",         link : [
        { name : "Room",            icon : PersonOutlineOutlined,   authority : "AUTH_USER",                link: "/list/room/roomList" },
        { name : "Shelf",           icon : SecurityOutlined,        authority : "AUTH_ROLE",                link: "/list/shelf/shelfList" },
        { name : "Archive Box",     icon : SecurityOutlined,        authority : "AUTH_ROLE",                link: "/list/archiveBox/archiveBoxList" },
        { name : "Folder",          icon : SecurityOutlined,        authority : "AUTH_ROLE",                link: "/list/folder/folderList" }
    ] },
    { name : "Currial",         icon : DraftsOutlined,          authority : "AUTH_COMMUNICATION",       link : "/mails" },
    { name : "Security",        icon : HttpsOutlined,           authority : "AUTH_SECURITY",            link : [
        { name : "User",            icon : PersonOutlineOutlined,   authority : "AUTH_USER",                link: "/list/user" },
        { name : "Role",            icon : SecurityOutlined,        authority : "AUTH_ROLE",                link: "/list/role" }
    ] }
];

export { commonMenu };