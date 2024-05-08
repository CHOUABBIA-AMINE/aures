import dayjs                    from "dayjs";
import bcrypt 					from "bcryptjs-react";
import { useSnackbar } 			from "notistack";

import React 					from "react";
import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Accordion } 			from "@mui/material";
import { AccordionDetails } 	from "@mui/material";
import { AccordionSummary } 	from "@mui/material";
import { Box } 					from "@mui/material";
import { Button } 				from "@mui/material";
import { Card } 				from "@mui/material";
import { CardHeader } 			from "@mui/material";
import { Checkbox } 			from "@mui/material";
import { Container } 			from "@mui/material";
import { Divider } 				from "@mui/material";
import { FormControl } 			from "@mui/material";
import { FormControlLabel } 	from "@mui/material";
import { IconButton } 			from "@mui/material";
import { InputAdornment } 		from "@mui/material";
import { Grid } 				from "@mui/material";
import { List } 				from "@mui/material";
import { ListItemButton } 		from "@mui/material";
import { ListItemIcon } 		from "@mui/material";
import { ListItemText } 		from "@mui/material";
import { Paper } 				from "@mui/material";
import { Switch } 				from "@mui/material";
import { TextField } 			from "@mui/material";
import { Tooltip } 				from "@mui/material";
import { Typography } 			from "@mui/material";

import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";

import { ExpandMore } 			from "@mui/icons-material";
import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";
import { Visibility } 			from "@mui/icons-material";
import { VisibilityOff } 		from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { useHTTP } 				from "../../../../../api/request";
import { User } 				from "../../../../../model/common/security/user";
import { Role } 				from "../../../../../model/common/security/role";

interface CheckedRole{
	role : Role,
	checked : boolean 
}

const UserDetails = (props : any) => {
	const location 				= useLocation();
	const params 				= useParams();
	let readOnly 				= params.action === 'edit' ? false : true;
	const { enqueueSnackbar } 	= useSnackbar();
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();
	const [showPassword, setShowPassword] 	= useState(false);
	const handleClickShowPassword 			= () => setShowPassword((show) => !show);
	const handleMouseDownPassword 			= (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const [appData, setAppData] 			= useState<CheckedRole[]>([]);
  	const [modelData, setModelData] 		= useState<CheckedRole[]>([]);

	const [user, setUser]		= useState<User>({
		username 	: "",
		password 	: "",
		expireDate  : dayjs(),
		enabled     : true,
		locked      : false,
		userURL     : "",
		roleURL     : ""
	});

	const not = (a: CheckedRole[], b: CheckedRole[]) => {
		return a.filter((checkedRole) => b.map(model => model.role._links.self.href).indexOf(checkedRole.role._links.self.href) === -1);
	}

	const toggleCheked = (key : string, listIndex : number) => {
		if(listIndex === 1){
			const arrCopy = [...appData];
			let index = appData.map(cRole => cRole.role._links.self.href).indexOf(key);
			let cRole = arrCopy.at(index);
			if( cRole !== undefined){
				cRole.checked = !cRole.checked;
				arrCopy.splice(appData.map(cRole => cRole.role._links.self.href).indexOf(key), 1, cRole);
				setAppData(arrCopy);
			}
		}
		if(listIndex === 2){
			const arrCopy = [...modelData];
			let index = modelData.map(cRole => cRole.role._links.self.href).indexOf(key);
			let cRole = arrCopy.at(index);
			if( cRole !== undefined){
				cRole.checked = !cRole.checked;
				arrCopy.splice(modelData.map(cRole => cRole.role._links.self.href).indexOf(key), 1, cRole);
				setModelData(arrCopy);
			}
		}
	}

	const attributeRoles = () => {
		const unattributedData : CheckedRole[] = [];
		const attributedData : CheckedRole[] = [];
		appData.forEach(role =>{
			let status = role.checked;
			role.checked = false;
			status ? attributedData.push(role) : unattributedData.push(role);
		});
		setAppData(unattributedData);
		setModelData(modelData.concat(attributedData));
	}

	const unattributeRoles = () => {
		const unattributedData : CheckedRole[] = [];
		const attributedData : CheckedRole[] = [];
		modelData.forEach(role =>{
			let status = role.checked;
			role.checked = false;
			status ? unattributedData.push(role) : attributedData.push(role);
		});
		setAppData(appData.concat(unattributedData));
		setModelData(attributedData);
	}

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
			getUserData(response.data._links.roles.href);
		})
	}

	const getUserData = (roleURL : string) =>{
		getUrl(formatURL(roleURL)).then((response) => {
			let models :Role[] = response.data._embedded.role;
			setModelData(models.map(e => {return { role : e, checked: false}}));
			return models.map(e => {return { role : e, checked: false}});
		}).then((data) => {
			getAppData(data);
		})
	}

	const getAppData = (data : CheckedRole[]) =>{
		getBasedUrl("role").then((response) => {
			let models :Role[] = response.data._embedded.role;
			setAppData(not(models.map(e => {return { role : e, checked: false}}), data));
		})
	}

	const patchData = ()=>{
		if(location.state != null){
			if(user.password === ""){
				patchUrl(formatURL(location.state.modelId), JSON.stringify({
					username 	: user.username,
					expirationDate  : user.expireDate,
					enabled     : user.enabled ? 1 : 0,
					locked      : user.locked ? 1 : 0,
					roles		: modelData.map(model => model.role._links.self.href)
				})).then((response) => {
					enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
				})
			}else{
				patchUrl(formatURL(location.state.modelId), JSON.stringify({
					username 	: user.username,
					expirationDate  : user.expireDate,
					password 	: user.password !== undefined ? bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)) : "",
					enabled     : user.enabled ? 1 : 0,
					locked      : user.locked ? 1 : 0,
					roles		: modelData.map(model => model.role._links.self.href)
				})).then((response) => {
					enqueueSnackbar('Entity updated successfully !', {variant: 'success'});
				})
			}
		}else{
			postBasedUrl("user", JSON.stringify({
				username 	: user.username,
				password	: user.password !== undefined ? bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)) : "",
				expirationDate  : user.expireDate,
				enabled     : user.enabled ? 1 : 0,
				locked      : user.locked ? 1 : 0,
				roles		: modelData.map(model => model.role._links.self.href)
			})).then((response) => {
				enqueueSnackbar('Entity created successfully !', {variant: 'success'});
			})
		}
	}

	useEffect(() => {
		if(location.state !== null){
			fetchData();
		}
    },[])

	const dependencyList = (title: React.ReactNode, items: CheckedRole[], listIndex : number) => (
		<Card>
		  	<CardHeader
				sx={{ px: 2, py: 1 }}
				title={title}
				align='center'
		  	/>
		  	<Divider />
			<List
				sx={{
					width: '100%',
					height: 230,
					bgcolor: 'background.paper',
					overflow: 'auto',
				}}
				dense
				component="div"
				role="list"
			>
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;
		
					return (
						<ListItemButton
							key={value.role._links.self.href}
							role="listitem"
							//onClick={toggleCheked}
							onClick={e => toggleCheked(value.role._links.self.href, listIndex)}
						>
							<ListItemIcon>
								<Checkbox
									checked={value.checked}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`${value.role.name}`} />
						</ListItemButton>
					);
				})}
		  	</List>
		</Card>
	);

	return (
		<Container maxWidth="lg">
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h6" >
						User Details
					</Typography>
					<Box>
						<Tooltip title="Sauvegarder" arrow>
							<Button color="primary" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => patchData()}>
								<Save />
							</Button>
						</Tooltip>
						<Tooltip title="Réinitialiser" arrow>
							<Button color="success" variant="outlined" size="small" sx={{ marginRight:'5px' }}  onClick={e => fetchData()}>
								<Replay />
							</Button>
						</Tooltip>
					</Box>
				</Box>
				<Grid container spacing={1}>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={user.username}
								onChange={ (e) => setUser(user => ({...user, username: e.target.value})) }
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
								onChange={ (e) => setUser(user => ({...user, password: e.target.value })) }
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
					<Grid container spacing={2} justifyContent="center" alignItems="center" direction="row">
						<Grid item xs={5} sm={5}>{dependencyList('Unattributed Roles', appData, 1)}</Grid>
						<Grid item xs={2} sm={2}>
							<Grid container direction="column" alignItems="center">
								<Button
									sx={{ my: 0.5 }}
									variant="outlined"
									size="small"
									onClick={attributeRoles}
									//disabled={leftChecked.length === 0}
									aria-label="move selected right"
								>
									&gt;
								</Button>
								<Button
									sx={{ my: 0.5 }}
									variant="outlined"
									size="small"
									onClick={unattributeRoles}
									//disabled={rightChecked.length === 0}
									aria-label="move selected left"
								>
									&lt;
								</Button>
							</Grid>
						</Grid>
						<Grid item xs={5} sm={5}>{dependencyList('Attributed Roles', modelData, 2)}</Grid>
					</Grid>
					</AccordionDetails>
				</Accordion>
			</Paper>
		</Container>
	);
}
export default UserDetails ;

