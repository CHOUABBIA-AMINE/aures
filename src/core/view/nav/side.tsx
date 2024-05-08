import { useContext }       from 'react';
import { useState }         from 'react';
import { Box } 			    from '@mui/material';
import { Drawer } 			from '@mui/material';
import { List } 			from '@mui/material';
import { Divider } 		    from '@mui/material';

import { AuthContext }      from '../../config/context/auth.context';
import { environment }      from '../../config/environment';
import { commonMenu }       from '../../config/common.menu';
import { coreMenu }         from '../../config/core.menu';
import { searchMenu }       from '../../config/search.menu';
import { SidenavItem }      from './side.item';

const Sidenav = (props:any) => {
    
    const { hasAuthority }  = useContext(AuthContext);
    const [open, setOpen]   = useState(false);
  
    const mouseEnter = () => {
        setOpen(true);
    };

    const mouseLeave = () => {
        setOpen(false);
    };

	return (
		<Drawer 
            anchor="left"
            open={true}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            variant="permanent"
            sx={{
                width: open ? environment.sideWidth : '64px',
                marginTop:'65px',
                height: 'calc(window.innerHeight - 64px)',
                flexShrink: 0,
                overflow: 'visible',
                [`& .MuiDrawer-paper`]: { 
                    width: open ? environment.sideWidth : '64px',
                    marginTop:'65px',
                    height: `calc(window.innerHeight - 64px)`,
                    boxSizing: 'border-box',
                    overflow: 'visible'
                },
            }}
        >
            <Box sx={{ overflow: 'hidden' }}>
                <List key="Menus-01">
                    {coreMenu.map((item) => (
                        hasAuthority(item.authority) ? <SidenavItem key={'sidenavitem' + item.name} name={item.name} icon={item.icon} link={item.link} authority={item.authority}/> : ""
                    ))}
                </List>
            </Box>
            <Divider />
            <Box sx={{ overflow: 'hidden' }}>
                <List key="Menus-02">
                    {commonMenu.map((item) => (
                        hasAuthority(item.authority) ? <SidenavItem key={'sidenavitem' + item.name} name={item.name} icon={item.icon} link={item.link} authority={item.authority}/> : ""
                    ))}
                </List>
            </Box>
            <Divider />
            <Box sx={{ overflow: 'hidden' }}>
                <List key="Menus-03">
                    {searchMenu.map((item) => (
                        hasAuthority(item.authority) ? <SidenavItem key={'sidenavitem' + item.name} name={item.name} icon={item.icon} link={item.link} authority={item.authority}/> : ""
                    ))}
                </List>
            </Box>
		</Drawer>
	);
}
export { Sidenav };