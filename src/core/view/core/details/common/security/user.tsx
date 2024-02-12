import dayjs                    from "dayjs";

import React 					from "react";
import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Box } 					from "@mui/material";
import { FormControlLabel } 	from "@mui/material";
import { Switch } 				from "@mui/material";
import { Container } 			from "@mui/material";
import { FormControl } 			from "@mui/material";
import { Grid } 				from "@mui/material";
import { Button } 				from "@mui/material";
import { IconButton } 			from "@mui/material";
import { InputAdornment } 		from "@mui/material";
import { Paper } 				from "@mui/material";
import { TextField } 			from "@mui/material";
import { Typography } 			from "@mui/material";
import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";

import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";
import { Visibility } 			from "@mui/icons-material";
import { VisibilityOff } 		from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { User } 				from "../../../../../model/user";
import { useHTTP } 				from "../../../../../api/request";

const UserDetails = (props : any) => {
	const location 				= useLocation();
	const params 				= useParams();
	const { getUrl }       		= useHTTP();
	//const action 				= params.action;
    //
	const [user, setUser]		= useState<User>({
		username 	: "",
		password 	: "",
		expireDate  : new Date(),
		enabled     : true,
		locked      : false,
		userURL     : "",
		roleURL     : ""
	});
	const [showPassword, setShowPassword] = useState(false);
	const [enabled, setEnabled] = useState(true);
	const [locked, 	setLocked] 	= useState(false);

	let readOnly = params.action === 'edit' ? false : true;
	
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const enableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnabled(event.target.checked);
	};

	const lockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocked(event.target.checked);
	};

	useEffect(() => {
		if(location.state !== null){
			console.log(formatURL(location.state.modelId));
			getUrl(formatURL(location.state.modelId)).then((response) => {
				setUser({
					username 	: response.data.username,
					password 	: "",
					expireDate  : dayjs(response.data.expirationDate).toDate(),
					enabled     : response.data.enabled === 1 ? true : false,
					locked      : response.data.locked 	=== 1 ? true : false,
					userURL     : response.data._links.self.href,
					roleURL     : response.data._links.roles.href
				})
				
			}).finally(()=>{
				console.log(user.expireDate);
			})
		}

    },[])

	return (
        // <h1>{action}{location.state !== null ? location.state.modelId : ""}</h1>
		<Container maxWidth="lg">
			
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h6" >
						User Details
					</Typography>
					<Box>
						<Button color="primary" variant="outlined" size="small" sx={{ marginRight:'5px' }}>
							<Save />
						</Button>
						<Button color="success" variant="outlined" size="small" sx={{ marginLeft:'5px' }}>
							<Replay />
						</Button>
					</Box>
				</Box>
				<Grid container spacing={1}>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={user.username}
								size="small"
								id="username"
								name="username"
								label="Username"
								autoComplete="off"
								variant="outlined"
								inputProps={
									{ readOnly: readOnly }
								}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={8} sm={8} />
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={user.password}
								size="small"
								id="password"
								type={showPassword ? 'text' : 'password'}
								name="password"
								label="Password"
								autoComplete="off"
								variant="outlined"
								InputProps={{
									readOnly: readOnly,
									endAdornment: (
									  	<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
									  	</InputAdornment>
									),
								  }}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={8} sm={8} />
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<DatePicker format="DD/MM/YYYY" label="Expiration Date" slotProps={{ textField: { size: 'small', required: true }}} value={new Date()}/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4} sx={{display : "flex", justifyContent: "flex-end"}}>
						<FormControlLabel control={<Switch checked={user.enabled} onChange={enableChange} readOnly={readOnly}/>} label="Enabled" />
					</Grid>
					<Grid item xs={4} sm={4} sx={{display : "flex", justifyContent: "flex-end"}}>
						<FormControlLabel control={<Switch checked={user.locked} onChange={lockChange} readOnly={readOnly}/>} label="Locked" color="warning"/>
					</Grid>
					<Grid item xs={4} sm={4} />
					<Grid item xs={8} sm={8}>
						
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
export default UserDetails ;

