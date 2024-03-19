import { SnackbarProvider } 	from 'notistack';

import { useState } 			from 'react';

import { Box } 					from '@mui/material';
import { CssBaseline } 			from '@mui/material';

import { AuthContext }			from './config/context/auth.context';
import { CoreRouting } 			from './config/core.routing';
import { UserContext } 			from './config/context/user.context';

import { Navbar }				from './view/nav/bar';
import { Sidenav } 				from './view/nav/side';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } 		from '@mui/x-date-pickers/AdapterDayjs'
import { NavContext } 			from './config/context/nav.context';

function Aures() {

	const [user, setUser] 	= useState<UserContext | null>(null);
	const [token, setToken] = useState<string | null>("");
	const [authority, setAuthority] = useState<string[]>([]);
	const [menu, setMenu] 	= useState<string>("");
	const hasAuthority 		= (auth:string) => {
		return authority.indexOf(auth) !== -1 ? true : false;
	}

	return (
		
		<SnackbarProvider maxSnack={3} autoHideDuration={1200} anchorOrigin={{horizontal: "center", vertical: "bottom"}}>
		<NavContext.Provider value={{menu, setMenu}}>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
		<AuthContext.Provider value={{ user , setUser, token, setToken, authority, setAuthority, hasAuthority }}>
			<Box sx={{ display: 'flex', flexDirection: 'column'}}>
				
				<CssBaseline />
				<Navbar />
				<Box position='static' sx={{width:'100%', height:'calc(100vh - 64px)', background:'FFF', display: 'flex', flexDirection: 'row'}}>
					{(user != null) ? <Sidenav key='Sidenav' /> : ""}
					<CoreRouting />
				</Box>
			</Box>
		</AuthContext.Provider>
		</LocalizationProvider>
		</NavContext.Provider>
		</SnackbarProvider>
	);

}
export default Aures;
