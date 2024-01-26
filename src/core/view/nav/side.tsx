import { useState }         from 'react';
import { Box } 			    from '@mui/material';
import { Drawer } 			from '@mui/material';
import { List } 			from '@mui/material';
import { Divider } 		    from '@mui/material';

import { environment }      from '../../config/environment';
import { commonMenu }       from '../../config/common.menu';
import { coreMenu }         from '../../config/core.menu';
import { SidenavItem }      from './side.item';

const Sidenav = (props:any) => {
    
    const [open, setOpen] = useState(false);
  
    const mouseEnter = () => {
        setOpen(true);
    };

    const mouseLeave = () => {
        setOpen(false);
    };

	return (
		<Drawer 
            anchor="left"
            open={props}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            variant="permanent"
            sx={{
                width: open ? environment.sideWidth : '64px',
                marginTop:'65px',
                height: 'calc(window.innerHeight - 64px)',
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: open ? environment.sideWidth : '64px',
                    marginTop:'65px',
                    height: `calc(window.innerHeight - 64px)`,
                    boxSizing: 'border-box' 
                },
            }}

        >
            <Box sx={{ overflow: 'hidden' }}>
                <List>
                    {coreMenu.map((item) => (
                        <SidenavItem name={item.name} icon={item.icon} link={item.link} />
                    ))}
                </List>
            </Box>
            <Divider />
            <Box sx={{ overflow: 'hidden' }}>
                <List>
                    {commonMenu.map((item) => (
                        <SidenavItem name={item.name} icon={item.icon} link={item.link} />
                    ))}
                </List>
            </Box>
		</Drawer>
	);
}
export default Sidenav;