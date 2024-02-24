import dayjs                    from "dayjs";
import bcrypt 					from "bcryptjs-react";

import React 					from "react";
import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Accordion } 			from "@mui/material";
import { AccordionDetails } 	from "@mui/material";
import { AccordionSummary } 	from "@mui/material";
import { Box } 					from "@mui/material";
import { Card } 				from "@mui/material";
import { CardHeader } 			from "@mui/material";
import { Checkbox } 			from "@mui/material";
import { Divider } 				from "@mui/material";
import { List } 				from "@mui/material";
import { ListItemButton } 		from "@mui/material";
import { ListItemIcon } 		from "@mui/material";
import { ListItemText } 		from "@mui/material";
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

import { ExpandMore } 			from "@mui/icons-material";
import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";
import { Visibility } 			from "@mui/icons-material";
import { VisibilityOff } 		from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { useHTTP } 				from "../../../../../api/request";
import { Structure } 			from "../../../../../model/common/administration/structure";

const StructureDetails = (props : any) => {
	const location 				= useLocation();
	const params 				= useParams();
	let readOnly 				= params.action === 'edit' ? false : true;
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();
	
	const [structure, setStructure]	= useState<Structure>({
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
		getUrl(formatURL(location.state.modelId)).then((response) => {
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
			});
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
				structureType  	: structure._links.structureType.href,
				structureUp  	: structure._links.structureUp.href
			})).then((response) => {

			})
		}else{
			postBasedUrl("structure", JSON.stringify({
				designationAr 	: structure.designationAr,
				designationEn 	: structure.designationEn,
				designationFr 	: structure.designationFr,
				acronymAr 		: structure.acronymAr,
				acronymEn 		: structure.acronymEn,
				acronymFr 		: structure.acronymFr,
				structureType  	: structure._links.structureType.href,
				structureUp  	: structure._links.structureUp.href
			})).then((response) => {
			
			})
		}
	}

	useEffect(() => {
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
								value={structure.designationAr}
								onChange={ (e) => setStructure(structure => ({...structure, designationAr: e.currentTarget.value})) }
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
								onChange={ (e) => setStructure(structure => ({...structure, designationEn: e.currentTarget.value})) }
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
								onChange={ (e) => setStructure(structure => ({...structure, designationFr: e.currentTarget.value})) }
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
				</Grid>
			</Paper>
		</Container>
	);
}
export default StructureDetails ;

