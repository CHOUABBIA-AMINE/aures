import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { useSnackbar } 			from "notistack";

import { Autocomplete} 			from "@mui/material";
import { Box } 					from "@mui/material";
import { Button } 				from "@mui/material";
import { Container } 			from "@mui/material";
import { debounce } 			from "@mui/material";
import { FormControl } 			from "@mui/material";
import { Grid } 				from "@mui/material";
import { Paper } 				from "@mui/material";
import { TextField } 			from "@mui/material";
import { Tooltip} 				from "@mui/material";
import { Typography } 			from "@mui/material";

import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { useHTTP } 				from "../../../../../api/request";
import { Structure } 			from "../../../../../model/common/administration/structure";
import { Job } 					from "../../../../../model/common/administration/job";

const JobDetails = (props : any) => {

	const location 					= useLocation();
	const params 					= useParams();
	const { enqueueSnackbar } 		= useSnackbar();
	
	let readOnly 					= params.action === 'edit' ? false : true;
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();

	const [ structures, setStructures ]	= useState<Structure[]>([]);
	const [ structure, setStructure ]	= useState<Structure | null>(null);

	const [ job, setJob ]	= useState<Job>({
		designationAr   : "",
		designationEn   : "",
		designationFr   : "",
		_links          : {
			job       		:{
				href            : ""
			},
			self            :{
				href            : ""
			},
			structure   	:{
				href            : ""
			}
		}
	});

	const fetchData = ()=>{

		getUrl(formatURL(location.state.modelId)).then((response : any) => {
			setJob({
				designationAr	: response.data.designationAr,
				designationEn	: response.data.designationEn,
				designationFr	: response.data.designationFr,
				_links          : {
					job       		:{
						href            : response.data._links.job.href
					},
					self            :{
						href            : response.data._links.self.href
					},
					structure     	:{
						href            : response.data._links.structure.href
					}
				}
			})
			getUrl(formatURL(response.data._links.structure.href)).then((structure) => {
				setStructure(structure.data !== undefined ? structure.data : null )
			});
		});
	}

	const filterBy = (e : any) =>{
		getBasedUrl("structure/search/filterBy?filter=" + e.target.value).then((structure) => {
			setStructures(structure.data._embedded.structure);
		})
	}

	const patchData = ()=>{
		if(location.state != null){
			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				designationAr 	: job.designationAr,
				designationEn 	: job.designationEn,
				designationFr 	: job.designationFr,
				structure  		: structure?._links.self.href
			})).then((response) => {
				enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
			})
		}else{
			postBasedUrl("job", JSON.stringify({
				designationAr 	: job.designationAr,
				designationEn 	: job.designationEn,
				designationFr 	: job.designationFr,
				structure  		: structure?._links.self.href
			})).then((response) => {
				enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
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
			<Paper variant="outlined" sx={{ marginTop: "60px", padding: '30px' }}>
				<Box sx={{ display: "flex", paddingBottom: 5, justifyContent: "space-between" }}>
					<Typography variant="h6">
						Job Details
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
							id="structure"
							fullWidth
							size="small"
							options={structures}
							value={structure}
							onChange={(e, value) => setStructure(value)}
							getOptionLabel={(parent) => parent.designationFr}
							isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
							renderInput={(params) => <TextField {...params} label="Structure" onChange={debounce(filterBy, 200)} />} />
					</Grid>
					<Grid item xs={8} sm={8}></Grid>

					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={job.designationAr}
								onChange={(e) => setJob(job => ({ ...job, designationAr: e.target.value }))}
								size="small"
								id="designationAr"
								name="designationAr"
								label="Designation (Ar)"
								autoComplete="off"
								variant="outlined"
								inputProps={{
									readOnly: readOnly
								}} />
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={job.designationEn}
								onChange={(e) => setJob(job => ({ ...job, designationEn: e.target.value }))}
								size="small"
								id="designationEn"
								name="designationEn"
								label="Designation (En)"
								autoComplete="off"
								variant="outlined"
								inputProps={{
									readOnly: readOnly
								}} />
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={job.designationFr}
								onChange={(e) => setJob(job => ({ ...job, designationFr: e.target.value }))}
								size="small"
								id="designationFr"
								name="designationFr"
								label="Designation (Fr)"
								autoComplete="off"
								variant="outlined"
								inputProps={{
									readOnly: readOnly
								}} />
						</FormControl>
					</Grid>

				</Grid>
			</Paper>
		</Container>
	);
}
export default JobDetails ;

