import { Box } 				from '@mui/material';
import { Stack } 			from '@mui/material';
import { Outlet } 			from 'react-router-dom';

import Navbar 				from './view/nav.bar';
import RootRoutes 			from './view/root.routes';

import './root.css';
import SideNav from './view/side.nav';

function Root() {
	return (
		
		<Stack direction="column">
			<Box>
				<Navbar />
			</Box>
			<Box>
				
				<Stack direction="row">
					<Box>
						<SideNav />
					</Box>
					<Box sx={{marginTop:'64px'}}>
						<RootRoutes />
						<Outlet />
					</Box>
				</Stack>
			</Box>
		</Stack>



	);
}
export default Root;
