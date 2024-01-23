import './aures.css';

import { Box } 					from '@mui/material';
import { CssBaseline } 			from '@mui/material';

import Navbar 					from './view/nav.bar';
import Sidenav 					from './view/side.nav';
import CoreRouting 				from './config/core.routing';

function Aures() {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column'}}>
			<CssBaseline />
			<Navbar />
			<Box position='static' sx={{width:'100%', height:'calc(100vh - 64px)', background:'FFF', display: 'flex', flexDirection: 'row'}}>
				<Sidenav authorized={false} />
				<CoreRouting />
			</Box>
		</Box>
	);
}
export default Aures;
