import React 					from "react";
import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { useSnackbar } 			from "notistack";

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
import { Grid } 				from "@mui/material";
import { List } 				from "@mui/material";
import { ListItemButton } 		from "@mui/material";
import { ListItemIcon } 		from "@mui/material";
import { ListItemText } 		from "@mui/material";
import { Paper } 				from "@mui/material";
import { TextField } 			from "@mui/material";
import { Tooltip} 				from "@mui/material";
import { Typography } 			from "@mui/material";

import { ExpandMore } 			from "@mui/icons-material";
import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { useHTTP } 				from "../../../../../api/request";
import { Role } 				from "../../../../../model/common/security/role";
import { Authority } 			from "../../../../../model/common/security/authority";

interface CheckedAuthority{
	authority : Authority,
	checked : boolean 
}

const RoleDetails = (props : any) => {
	const location 				= useLocation();
	const params 				= useParams();
	let readOnly 				= params.action === 'edit' ? false : true;
	const { enqueueSnackbar } 	= useSnackbar();
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();

	const [appData, setAppData] 			= useState<CheckedAuthority[]>([]);
  	const [modelData, setModelData] 		= useState<CheckedAuthority[]>([]);

	const [role, setRole]		= useState<Role>({
		name 		: "",
		_links 		: {
			role        :{
				href        : ""
			},
			self        :{
				href        : ""
			},
			users       :{
				href        : ""
			},
			authorities :{
				href        : ""
			}
		}
	});

	const not = (a: CheckedAuthority[], b: CheckedAuthority[]) => {
		return a.filter((checkedAuthority) => b.map(model => model.authority._links.self.href).indexOf(checkedAuthority.authority._links.self.href) === -1);
	}

	const toggleCheked = (key : string, listIndex : number) => {
		if(listIndex === 1){
			const arrCopy = [...appData];
			let index = appData.map(cAuthority => cAuthority.authority._links.self.href).indexOf(key);
			let cAuthority = arrCopy.at(index);
			if( cAuthority !== undefined){
				cAuthority.checked = !cAuthority.checked;
				arrCopy.splice(appData.map(cAuthority => cAuthority.authority._links.self.href).indexOf(key), 1, cAuthority);
				setAppData(arrCopy);
			}
		}
		if(listIndex === 2){
			const arrCopy = [...modelData];
			let index = modelData.map(cAuthority => cAuthority.authority._links.self.href).indexOf(key);
			let cAuthority = arrCopy.at(index);
			if( cAuthority !== undefined){
				cAuthority.checked = !cAuthority.checked;
				arrCopy.splice(modelData.map(cAuthority => cAuthority.authority._links.self.href).indexOf(key), 1, cAuthority);
				setModelData(arrCopy);
			}
		}
	}

	const attributeAuthorities = () => {
		const unattributedData : CheckedAuthority[] = [];
		const attributedData : CheckedAuthority[] = [];
		appData.forEach(authority =>{
			let status = authority.checked;
			authority.checked = false;
			status ? attributedData.push(authority) : unattributedData.push(authority);
		});
		setAppData(unattributedData);
		setModelData(modelData.concat(attributedData));
	}

	const unattributeAuthorities = () => {
		const unattributedData : CheckedAuthority[] = [];
		const attributedData : CheckedAuthority[] = [];
		modelData.forEach(authority =>{
			let status = authority.checked;
			authority.checked = false;
			status ? unattributedData.push(authority) : attributedData.push(authority);
		});
		setAppData(appData.concat(unattributedData));
		setModelData(attributedData);
	}

	const fetchData = ()=>{
		getUrl(formatURL(location.state.modelId)).then((response) => {
			setRole({
				name 		: response.data.name,
				_links 		: {
					role        :{
						href        : response.data._links.role.href
					},
					self        :{
						href        : response.data._links.self.href
					},
					users       :{
						href        : response.data._links.users.href
					},
					authorities :{
						href        : response.data._links.authorities.href
					}
				}
			});
			getUserData(response.data._links.authorities.href);
		})
	}

	const getUserData = (authorityURL : string) =>{
		getUrl(formatURL(authorityURL)).then((response) => {
			let models :Authority[] = response.data._embedded.authority;
			setModelData(models.map(e => {return { authority : e, checked: false}}));
			return models.map(e => {return { authority : e, checked: false}});
		}).then((data) => {
			getAppData(data);
		})
	}

	const getAppData = (data : CheckedAuthority[]) =>{
		getBasedUrl("authority").then((response) => {
			let models :Authority[] = response.data._embedded.authority;
			setAppData(not(models.map(e => {return { authority : e, checked: false}}), data));
		})
	}

	const patchData = ()=>{
		if(location.state != null){
			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				name 		: role.name,
				authorities : modelData.map(model => model.authority._links.self.href)
			})).then((response) => {
				enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
			})
		}else{
			postBasedUrl("role", JSON.stringify({
				name 		: role.name,
				authorities : modelData.map(model => model.authority._links.self.href)
			})).then((response) => {
				enqueueSnackbar('Entity created successfully!', {variant: 'success'});
			})
		}
	}

	useEffect(() => {
		if(location.state !== null){
			fetchData();
		}
    },[])

	const dependencyList = (title: React.ReactNode, items: CheckedAuthority[], listIndex : number) => (
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
							key={value.authority._links.self.href}
							role="listitem"
							//onClick={toggleCheked}
							onClick={e => toggleCheked(value.authority._links.self.href, listIndex)}
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
							<ListItemText id={labelId} primary={`${value.authority.name}`} />
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
						Role Details
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
								value={role.name}
								onChange={ (e) => setRole(role => ({...role, name: e.target.value})) }
								size="small"
								id="name"
								name="name"
								label="Role Name"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={8} sm={8} />
					<Grid item xs={4} sm={4} />
					<Grid item xs={8} sm={8} />
				</Grid>
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMore />}>Roles</AccordionSummary>
					<AccordionDetails>
					<Grid container spacing={2} justifyContent="center" alignItems="center" direction="row">
						<Grid item xs={5} sm={5}>{dependencyList('Unattributed Authorities', appData, 1)}</Grid>
						<Grid item xs={2} sm={2}>
							<Grid container direction="column" alignItems="center">
								<Button
									sx={{ my: 0.5 }}
									variant="outlined"
									size="small"
									onClick={attributeAuthorities}
									//disabled={leftChecked.length === 0}
									aria-label="move selected right"
								>
									&gt;
								</Button>
								<Button
									sx={{ my: 0.5 }}
									variant="outlined"
									size="small"
									onClick={unattributeAuthorities}
									//disabled={rightChecked.length === 0}
									aria-label="move selected left"
								>
									&lt;
								</Button>
							</Grid>
						</Grid>
						<Grid item xs={5} sm={5}>{dependencyList('Attributed Authorities', modelData, 2)}</Grid>
					</Grid>
					</AccordionDetails>
				</Accordion>
			</Paper>
		</Container>
	);
}
export default RoleDetails ;

