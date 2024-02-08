import './aures.css';

import { useState } 			from 'react';

import { Box } 					from '@mui/material';
import { CssBaseline } 			from '@mui/material';

import { AuthContext }			from './config/context/auth.context';
import { CoreRouting } 			from './config/core.routing';
import { User } 				from './model/user';

import { Navbar }				from './view/nav/bar';
import { Sidenav } 				from './view/nav/side';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } 		from '@mui/x-date-pickers/AdapterDayjs'

function Aures() {
	///const { user, login, logout } = useAuth();
	
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>("");
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
		<AuthContext.Provider value={{ user , setUser, token, setToken }}>
			<Box sx={{ display: 'flex', flexDirection: 'column'}}>
				<CssBaseline />
				<Navbar />
				<Box position='static' sx={{width:'100%', height:'calc(100vh - 64px)', background:'FFF', display: 'flex', flexDirection: 'row'}}>
					{(user != null) ? <Sidenav /> : ""}
					<CoreRouting />
				</Box>
			</Box>
		</AuthContext.Provider>
		</LocalizationProvider>
	);
}
export default Aures;
