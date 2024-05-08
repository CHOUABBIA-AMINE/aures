import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { useSnackbar } 			from "notistack";

import { Autocomplete } 		from "@mui/material";
import { Box } 					from "@mui/material";
import { Button } 				from "@mui/material";
import { Container } 			from "@mui/material";
import { debounce } 			from "@mui/material";
import { FormControl } 			from "@mui/material";
import { InputLabel } 			from "@mui/material";
import { Grid } 				from "@mui/material";
import { MenuItem } 			from "@mui/material";
import { Paper } 				from "@mui/material";
import { Select } 				from "@mui/material";
import { TextField } 			from "@mui/material";
import { Tooltip } 				from "@mui/material";
import { Typography } 			from "@mui/material";

import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { useHTTP } 				from "../../../../../api/request";
import { Structure } 			from "../../../../../model/common/administration/structure";
import { StructureType } 		from "../../../../../model/common/administration/structure.type";

const StructureDetails = (props : any) => {

	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();

	const location 						= useLocation();
	const params 						= useParams();
	const { enqueueSnackbar } 			= useSnackbar();
	
	let readOnly 						= params.action === 'edit' ? false : true;

	const [ types, setTypes ]			= useState<StructureType[]>([]);
	const [ parents, setParents ]		= useState<Structure[]>([]);

	const [ type, setType ]				= useState<string>("");
	const [ parent, setParent ]			= useState<Structure | null>(null);

	const [ structure, setStructure ]	= useState<Structure>({
		designationAr   : "",
		designationEn   : "",
		designationFr   : "",
		acronymAr       : "",
		acronymEn       : "",
		acronymFr       : "",
		_links          : {
			structure       :{
				href            : ""
			},
			self            :{
				href            : ""
			},
			structureType   :{
				href            : ""
			},
			structureUp     :{
				href            : ""
			}
		}
	});

	const fetchData = ()=>{

		getUrl(formatURL(location.state.modelId)).then((response : any) => {
			setStructure({
				designationAr	: response.data.designationAr,
				designationEn	: response.data.designationEn,
				designationFr	: response.data.designationFr,
				acronymAr		: response.data.acronymAr,
				acronymEn		: response.data.acronymEn,
				acronymFr		: response.data.acronymFr,
				_links          : {
					structure       :{
						href            : response.data._links.structure.href
					},
					self            :{
						href            : response.data._links.self.href
					},
					structureType   :{
						href            : response.data._links.structureType.href
					},
					structureUp     :{
						href            : response.data._links.structureUp.href
					}
				}
			})
			getUrl(formatURL(response.data._links.structureType.href)).then((type) => {
				setType(type.data !== undefined ? type.data._links.self.href : "" )
				getUrl(formatURL(response.data._links.structureUp.href)).then((parent) => {
					setParent(parent.data !== undefined ? parent.data : null )
				}).catch(()=>{
				});
			});
		});
	}

	const filterBy = (e : any) =>{
		getBasedUrl("structure/search/filterBy?filter=" + e.target.value).then((up) => {
			setParents(up.data._embedded.structure);
		})
	}

	const patchData = ()=>{
		if(location.state != null){
			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				designationAr 	: structure.designationAr,
				designationEn 	: structure.designationEn,
				designationFr 	: structure.designationFr,
				acronymAr 		: structure.acronymAr,
				acronymEn 		: structure.acronymEn,
				acronymFr 		: structure.acronymFr,
				structureType  	: type,
				structureUp  	: parent?._links.self.href
			})).then((response) => {
				enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
			})
		}else{
			postBasedUrl("structure", JSON.stringify({
				designationAr 	: structure.designationAr,
				designationEn 	: structure.designationEn,
				designationFr 	: structure.designationFr,
				acronymAr 		: structure.acronymAr,
				acronymEn 		: structure.acronymEn,
				acronymFr 		: structure.acronymFr,
				structureType  	: type,
				structureUp  	: parent?._links.self.href
			})).then((response) => {
				enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
			})
		}
	}

	useEffect(() => {

		getBasedUrl("structureType").then((structureTypes) => {
			setTypes(structureTypes.data._embedded.structureType);
		});

		if(location.state !== null){
			fetchData();
		}
    },[])

	return (
		<Container maxWidth="lg">
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h6" >
						Structure Details
					</Typography>
					<Box>
						<Tooltip title="Sauvegarder" arrow>
							<Button color="primary" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => patchData()}>
								<Save />
							</Button>
						</Tooltip>
						<Tooltip title="Réinitialiser" arrow>
							<Button color="success" variant="outlined" size="small" sx={{ marginLeft:'5px' }}  onClick={e => fetchData()}>
								<Replay />
							</Button>
						</Tooltip>
					</Box>
				</Box>
				<Grid container spacing={1}>
					<Grid item xs={4} sm={4}>
						<Autocomplete
							id="parent"
							fullWidth
							size="small"
							options={parents}
							value={parent}
							onChange={(e, value) => setParent(value)}
							getOptionLabel={(parent) => parent.designationFr}
							isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
							renderInput={(params) => <TextField {...params} label="Parent" onChange={debounce(filterBy, 200)}/>}
						/>
					</Grid>
					<Grid item xs={8} sm={8}></Grid>

					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small" >
							<InputLabel id="typeLabel">Type</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="typeLabel"
								id="structureType"
								variant="outlined"
								value={type}
								label="Type"
								
								onChange={(e) => setType(e.target.value)}
							>
								{
									types.length > 0 && types.map(type => {
										return(
											<MenuItem key={type._links.self.href} value={type._links.self.href}>{type.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={8} sm={8}></Grid>
					
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={structure.designationAr}
								onChange={ (e) => setStructure(structure => ({...structure, designationAr: e.target.value})) }
								size="small"
								id="designationAr"
								name="designationAr"
								label="Designation (Ar)"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={structure.designationEn}
								onChange={ (e) => setStructure(structure => ({...structure, designationEn: e.target.value})) }
								size="small"
								id="designationEn"
								name="designationEn"
								label="Designation (En)"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={structure.designationFr}
								onChange={ (e) => setStructure(structure => ({...structure, designationFr: e.target.value})) }
								size="small"
								id="designationFr"
								name="designationFr"
								label="Designation (Fr)"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								sx={{width:'40%'}}
								value={structure.acronymAr}
								onChange={ (e) => setStructure(structure => ({...structure, acronymAr: e.target.value})) }
								size="small"
								id="acronymAr"
								name="acronymAr"
								label="Acronyme (Ar)"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								sx={{width:'40%'}}
								value={structure.acronymEn}
								onChange={ (e) => setStructure(structure => ({...structure, acronymEn: e.target.value})) }
								size="small"
								id="acronymEn"
								name="acronymEn"
								label="Acronyme (En)"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								sx={{width:'40%'}}
								value={structure.acronymFr}
								onChange={ (e) => setStructure(structure => ({...structure, acronymFr: e.currentTarget.value})) }
								size="small"
								id="acronymFr"
								name="acronymFr"
								label="Acronyme (Fr)"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
export default StructureDetails ;

