import dayjs 					from "dayjs";
import { useSnackbar } 			from "notistack";

import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Box } 					from "@mui/material";
import { Button } 				from "@mui/material";
import { Container } 			from "@mui/material";
import { FormControl } 			from "@mui/material";
import { InputLabel } 			from "@mui/material";
import { Grid } 				from "@mui/material";
import { MenuItem } 			from "@mui/material";
import { Paper } 				from "@mui/material";
import { Select } 				from "@mui/material";
import { TextField } 			from "@mui/material";
import { Typography } 			from "@mui/material";

import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";

import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";

import { useHTTP } 				from "../../../../api/request";
import { formatURL } 			from "../../../../api/tools";

import { Project } 				from "../../../../model/realization/project";

const ProjectDetails = (props : any) => {

	const location 					= useLocation();
	const params 					= useParams();
	const { enqueueSnackbar } 		= useSnackbar();

	let readOnly 					= params.action === 'edit' ? false : true;
	let years : string []			= [];
	for (let i = 2010; i < 2031; i++) years.push(""+i); 

	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();

	const [ project, setProject ]		= useState<Project>({
		internalId              : "",
		projectYear             : "",
		designationAr           : "",
		designationEn           : "",
		designationFr           : "",
		observation             : "",
		startDate               : dayjs(),
		_links          : {
			project                	:{
				href                    : ""
			},
			self                    :{
				href                    : ""
			}
		}
	});

	const fetchData = ()=>{

		getUrl(formatURL(location.state.modelId)).then((project : any) => {
			setProject({
				internalId              : project.data.internalId,
				projectYear             : project.data.projectYear,
				designationAr           : project.data.designationAr,
				designationEn           : project.data.designationEn,
				designationFr           : project.data.designationFr,
				observation             : project.data.observation,
				startDate               : project.data.startDate !== null ? dayjs(project.data.startDate) : dayjs(),
				_links          		: {
					project       			:{
						href            		: project.data._links.project.href
					},
					self            		:{
						href            		: project.data._links.self.href
					}
				}
			})			
		});
	}

	const patchData = ()=>{
		if(location.state != null){
			
			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				internalId              : project.internalId,
				projectYear             : project.projectYear,
				designationAr           : project.designationAr,
				designationEn           : project.designationEn,
				designationFr           : project.designationFr,
				observation             : project.observation,
				startDate   			: dayjs(project.startDate)
			})).then((project) => {
				
				if(project.data !== undefined){
					setProject(project.data);
					enqueueSnackbar('Entity updated successfully !', {variant: 'success'});
				}
			});
			
		}else{
			postBasedUrl("project", JSON.stringify({
				internalId              : project.internalId,
				projectYear             : project.projectYear,
				designationAr           : project.designationAr,
				designationEn           : project.designationEn,
				designationFr           : project.designationFr,
				observation             : project.observation,
				startDate   			: dayjs(project.startDate)
			})).then((project) => {
				if(project.data !== undefined){
					setProject(project.data);
					enqueueSnackbar('Entity created successfully !', {variant: 'success'});
				}
			});
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
						Project Details
					</Typography>
					<Box>
						<Button color="primary" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => patchData()}>
							<Save />
						</Button>
						<Button color="success" variant="outlined" size="small" sx={{ marginLeft:'5px' }}  onClick={e => fetchData()} disabled={location.state != null ? false : true}>
							<Replay />
						</Button>
					</Box>
				</Box>
				<Grid container spacing={1} direction={"row"}>	
					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={project.internalId}
								onChange={ (e) => setProject(project => ({...project, internalId: e.target.value})) }
								size="small"
								id="internalId"
								name="internalId"
								label="Internal Id"
								autoComplete="off"
								variant="outlined"
								
								inputProps={{ 
									readOnly: readOnly,
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small" >
							<InputLabel id="projectYear">Project Year</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="projectYear"
								id="projectYear"
								variant="outlined"
								value={project.projectYear}
								label="Project Year"
								
								onChange={(e) => setProject(project => ({...project, projectYear: e.target.value})) }
							>
								{ years.map(year => { return (<MenuItem key={year} value={year}>{year}</MenuItem> );}) }
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small">
							<DatePicker 
								format="DD/MM/YYYY" 
								label="Start Date" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={project.startDate} 
								onChange={ changedDate=>setProject(project => ({...project, startDate:changedDate})) }
							/>
						</FormControl>
					</Grid>
					<Grid item xs={6} sm={6}></Grid>

					<Grid item xs={12} sm={12}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={project.designationAr}
								onChange={ (e) => setProject(project => ({...project, designationAr: e.target.value})) }
								size="small"
								id="designationAr"
								name="designationAr"
								label="Designation (Ar)"
								autoComplete="off"
								variant="outlined"
								
								inputProps={{ 
									readOnly: readOnly,
									dir: "rtl"
								}}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={12}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={project.designationEn}
								onChange={ (e) => setProject(project => ({...project, designationEn: e.target.value})) }
								size="small"
								id="designationEn"
								name="designationEn"
								label="Designation (En)"
								autoComplete="off"
								variant="outlined"
								
								inputProps={{ 
									readOnly: readOnly,
								}}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={12}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={project.designationFr}
								onChange={ (e) => setProject(project => ({...project, designationFr: e.target.value})) }
								size="small"
								id="designationFr"
								name="designationFr"
								label="Designation (Fr)"
								autoComplete="off"
								variant="outlined"
								
								inputProps={{ 
									readOnly: readOnly,
								}}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={12}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={project.observation}
								onChange={ (e) => setProject(project => ({...project, observation: e.target.value})) }
								size="small"
								id="observation"
								name="observation"
								label="Observation"
								autoComplete="off"
								variant="outlined"
								multiline
								rows={4}
								inputProps={{ 
									readOnly: readOnly,
								}}
							/>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
export default ProjectDetails;

