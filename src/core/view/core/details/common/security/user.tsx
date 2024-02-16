import dayjs                    from "dayjs";
import bcrypt 					from "bcryptjs-react";

import React 					from "react";
import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardHeader, Checkbox, Divider, List, ListItemButton, ListItemIcon, ListItemText } 					from "@mui/material";
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

import { ExpandMore, Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";
import { Visibility } 			from "@mui/icons-material";
import { VisibilityOff } 		from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { User } 				from "../../../../../model/user";
import { useHTTP } 				from "../../../../../api/request";

const UserDetails = (props : any) => {
	const location 				= useLocation();
	const params 				= useParams();
	let readOnly 				= params.action === 'edit' ? false : true;
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();
	const [showPassword, setShowPassword] 	= useState(false);
	const handleClickShowPassword 			= () => setShowPassword((show) => !show);
	const handleMouseDownPassword 			= (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const [user, setUser]		= useState<User>({
		username 	: "",
		password 	: "",
		expireDate  : dayjs(),
		enabled     : true,
		locked      : false,
		userURL     : "",
		roleURL     : ""
	});

	const fetchData = ()=>{
		getUrl(formatURL(location.state.modelId)).then((response) => {
			setUser({
				username 	: response.data.username,
				password 	: "",
				expireDate  : dayjs(response.data.expirationDate),
				enabled     : response.data.enabled === 1 ? true : false,
				locked      : response.data.locked 	=== 1 ? true : false,
				userURL     : response.data._links.self.href,
				roleURL     : response.data._links.roles.href
			});
			getUserRoles(response.data._links.roles.href);
		})
	}

	const getUserRoles = (roleURL : string) =>{
		getUrl(formatURL(roleURL)).then((response) => {
			console.log(response);
		})
	}

	const getAppRoles = () =>{
		getBasedUrl("role").then((response) => {
			console.log(response);
		})
	}

	const patchData = ()=>{
		if(location.state != null){
			if(user.password === ""){
				patchUrl(formatURL(location.state.modelId), JSON.stringify({
					username 	: user.username,
					expirationDate  : user.expireDate,
					enabled     : user.enabled ? 1 : 0,
					locked      : user.locked ? 1 : 0
				})).then((response) => {

				})
			}else{
				patchUrl(formatURL(location.state.modelId), JSON.stringify({
					username 	: user.username,
					expirationDate  : user.expireDate,
					password 	: user.password !== undefined ? bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)) : "",
					enabled     : user.enabled ? 1 : 0,
					locked      : user.locked ? 1 : 0
				})).then((response) => {

				})
			}
		}else{
			postBasedUrl("user", JSON.stringify({
				username 	: user.username,
				password	: user.password !== undefined ? bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)) : "",
				expirationDate  : user.expireDate,
				enabled     : user.enabled ? 1 : 0,
				locked      : user.locked ? 1 : 0
			})).then((response) => {
			
			})
		}
	}

	useEffect(() => {
		if(location.state !== null){
			fetchData();
			getAppRoles();
		}
    },[])

	/*const roleList = (title: React.ReactNode, items: readonly number[]) => (
		<Card>
		  	<CardHeader
				sx={{ px: 2, py: 1 }}
				title={title}
		  	/>
		  	<Divider />
			<List
				sx={{
					width: 200,
					height: 230,
					bgcolor: 'background.paper',
					overflow: 'auto',
				}}
				dense
				component="div"
				role="list"
			>
				{items.map((value: number) => {
					const labelId = `transfer-list-all-item-${value}-label`;
		
					return (
						<ListItemButton
							key={value}
							role="listitem"
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`List item ${value + 1}`} />
						</ListItemButton>
					);
				})}
		  	</List>
		</Card>
	);*/

	return (
		<Container maxWidth="lg">
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h6" >
						User Details
					</Typography>
					<Box>
						<Button color="primary" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => patchData()}>
							<Save />
						</Button>
						<Button color="success" variant="outlined" size="small" sx={{ marginLeft:'5px' }}  onClick={e => fetchData()}>
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
								onChange={ (e) => setUser(user => ({...user, username: e.currentTarget.value})) }
								size="small"
								id="username"
								name="username"
								label="Username"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
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
								onChange={ (e) => setUser(user => ({...user, password: e.currentTarget.value })) }
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
							<DatePicker 
								format="DD/MM/YYYY" 
								label="Expiration Date" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={user.expireDate} 
								onChange={ changedDate=>setUser(user => ({...user, expireDate:changedDate})) }
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4} sx={{display : "flex", justifyContent: "flex-end"}}>
						<FormControlLabel control={<Switch checked={user.enabled} onChange={e => setUser(user => ({...user, enabled: !user.enabled}))} readOnly={readOnly}/>} label="Enabled" />
					</Grid>
					<Grid item xs={4} sm={4} sx={{display : "flex", justifyContent: "flex-end"}}>
						<FormControlLabel control={<Switch checked={user.locked} onChange={e => setUser(user => ({...user, locked: !user.locked}))} readOnly={readOnly}/>} label="Locked" color="warning"/>
					</Grid>
					<Grid item xs={4} sm={4} />
					<Grid item xs={8} sm={8} />
				</Grid>
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMore />}>Roles</AccordionSummary>
					<AccordionDetails>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</AccordionDetails>
				</Accordion>
			</Paper>
		</Container>
	);
}
export default UserDetails ;

