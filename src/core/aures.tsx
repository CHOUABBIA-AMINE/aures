import './aures.css';

import { Box } 					from '@mui/material';
import { CssBaseline } 			from '@mui/material';

import { Navbar }				from './view/nav/bar';
import { Sidenav } 				from './view/nav/side';
import { CoreRouting } 			from './config/core.routing';

import { AuthContext }			from './config/context/auth.context';
import { useState } 			from 'react';
import { User } 				from './model/user';

function Aures() {
	///const { user, login, logout } = useAuth();
	
	const [user, setUser] = useState<User | null>(null);
	return (
		<AuthContext.Provider value={{ user , setUser }}>
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
