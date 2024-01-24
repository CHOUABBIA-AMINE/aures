import './aures.css';

import { Box } 					from '@mui/material';
import { CssBaseline } 			from '@mui/material';

import Navbar 					from './view/nav.bar';
import Sidenav 					from './view/side.nav';
import CoreRouting 				from './config/core.routing';

import { useAuth } 				from './config/hook/useAuth';
import AuthContext 				from './config/context/AuthContext';

function Aures() {
	const { user, login, logout, setUser } = useAuth();
	
	return (
		<AuthContext.Provider value={{ user, setUser }}>
		<Box sx={{ display: 'flex', flexDirection: 'column'}}>
			<CssBaseline />
			<Navbar />
			<Box position='static' sx={{width:'100%', height:'calc(100vh - 64px)', background:'FFF', display: 'flex', flexDirection: 'row'}}>
				<Sidenav authorized={false} />
				<CoreRouting />
			</Box>
		</Box>
		</AuthContext.Provider>
	);
}
export default Aures;
