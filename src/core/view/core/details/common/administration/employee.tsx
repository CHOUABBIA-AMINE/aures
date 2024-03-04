import dayjs 					from "dayjs";

import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Autocomplete } 		from "@mui/material";
import { Select } 				from "@mui/material";
import { debounce } 			from "@mui/material";
import { MenuItem } 			from "@mui/material";
import { InputLabel } 			from "@mui/material";
import { Box } 					from "@mui/material";
import { Container } 			from "@mui/material";
import { FormControl } 			from "@mui/material";
import { Grid } 				from "@mui/material";
import { Button } 				from "@mui/material";
import { Paper } 				from "@mui/material";
import { TextField } 			from "@mui/material";
import { Typography } 			from "@mui/material";

import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";

import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { useHTTP } 				from "../../../../../api/request";
import { State } 				from "../../../../../model/common/state";
import { MilitaryCategory } 	from "../../../../../model/common/administration/military.category";
import { MilitaryRank } 		from "../../../../../model/common/administration/military.rank";
import { Structure } 			from "../../../../../model/common/administration/structure";
import { Job } 					from "../../../../../model/common/administration/job";
import { Person } 				from "../../../../../model/common/administration/person";
import { Employee } 			from "../../../../../model/common/administration/employee";

const EmployeeDetails = (props : any) => {

	const location 					= useLocation();
	const params 					= useParams();
	
	let readOnly 					= params.action === 'edit' ? false : true;
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();

	const [ states, setStates ]			= useState<State[]>([]);
	const [ birthSt, setBirthSt ]		= useState<string>("");
	const [ addressSt, setAddressSt ]	= useState<string>("");
	const [ mCategors, setMCategors ]	= useState<MilitaryCategory[]>([]);
	const [ mCategory, setMCategory ]	= useState<string>("");
	const [ mRanks, setMRanks ]			= useState<MilitaryRank[]>([]);
	const [ mRank, setMRank ]			= useState<string>("");
	const [ structures, setStructures ]	= useState<Structure[]>([]);
	const [ structure, setStructure ]	= useState<Structure | null>(null);
	const [ jobs, setJobs ]				= useState<Job[]>([]);
	const [ job, setJob ]				= useState<Job | null>(null);

	const [ person, setPerson ]			= useState<Person>({
		firstnameAr     : "",
		lastnameAr      : "",
		firstnameLt     : "",
		lastnameLt      : "",
		birthDate       : dayjs(),
		birthPlace      : "",
		address         : "",
		_links          : {
			person          :{
				href            : ""
			},
			self            :{
				href            : ""
			},
			birthState       :{
				href            : ""
			},
			addressState    :{
				href            : ""
			},
			picture         :{
				href            : ""
			}
		}
	});

	const [ employee, setEmployee ]		= useState<Employee>({
		serial          : "",
		hiringDate      : dayjs(),
		_links          : {
			employee        :{
				href            : ""
			},
			self            :{
				href            : ""
			},
			person          :{
				href            : ""
			},
			militaryRank    :{
				href            : ""
			},
			job             :{
				href            : ""
			}
		}
	});

	const fetchData = ()=>{

		getUrl(formatURL(location.state.modelId)).then((emp : any) => {
			setEmployee({
				serial			: emp.data.serial,
				hiringDate		: emp.data.hiringDate,
				_links          : {
					employee       	:{
						href            : emp.data._links.employee.href
					},
					self            :{
						href            : emp.data._links.self.href
					},
					person   		:{
						href            : emp.data._links.person.href
					},
					militaryRank   	:{
						href            : emp.data._links.militaryRank.href
					},
					job   			:{
						href            : emp.data._links.job.href
					}
				}
			})
			/*getUrl(formatURL(response.data._links.person.href)).then((person) => {
				setType(type.data !== undefined ? type.data._links.self.href : "" )
			});
			getUrl(formatURL(response.data._links.person.href)).then((militaryRank) => {
				setType(type.data !== undefined ? type.data._links.self.href : "" )
			});
			getUrl(formatURL(response.data._links.person.href)).then((person) => {
				setType(type.data !== undefined ? type.data._links.self.href : "" )
			});*/
		});
	}

	const filterStrBy = (e : any) =>{
		getBasedUrl("structure/search/filterBy?filter=" + e.target.value).then((up) => {
			setStructures(up.data._embedded.structure);
		})
	}

	const filterJobBy = (e : any) =>{
		getBasedUrl("job/search/filterBy?job=" + e.target.value + "&structure=" + structure?.designationFr).then((job) => {
			setJobs(job.data._embedded.job);
		})
	}

	const patchData = ()=>{
		/*if(location.state != null){
			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				serial			: employee.data.serial,
				hiringDate		: employee.data.hiringDate,
				designationFr 	: structure.designationFr,
				acronymAr 		: structure.acronymAr,
				acronymEn 		: structure.acronymEn,
				acronymFr 		: structure.acronymFr,
				structureType  	: type,
				structureUp  	: parent?._links.self.href
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
				structureType  	: type,
				structureUp  	: parent?._links.self.href
			})).then((response) => {
			
			})
		}*/
	}

	const getRanks = (categoryLink : string) => {
		if(categoryLink !== "")
		getUrl(categoryLink).then((mRanks) => {
			setMRanks(mRanks.data._embedded.militaryRank);
		});
	}

	useEffect(() => {

		getBasedUrl("state").then((states) => {
			setStates(states.data._embedded.state);
		});
		getBasedUrl("militaryCategory").then((mCategors) => {
			setMCategors(mCategors.data._embedded.militaryCategory);
		});
		getBasedUrl("structure").then((structures) => {
			setStructures(structures.data._embedded.structure);
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
						Employee Details
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
								value={person.firstnameAr}
								onChange={ (e) => setPerson(person => ({...person, firstnameAr: e.target.value})) }
								size="small"
								id="firstnameAr"
								name="firstnameAr"
								label="First Name (Ar)"
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
								value={person.lastnameAr}
								onChange={ (e) => setPerson(person => ({...person, lastnameAr: e.target.value})) }
								size="small"
								id="lastnameAr"
								name="lastnameAr"
								label="Last Name (Ar)"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}></Grid>

					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={person.firstnameLt}
								onChange={ (e) => setPerson(person => ({...person, firstnameLt: e.target.value})) }
								size="small"
								id="firstnameLt"
								name="firstnameLt"
								label="First Name (Lt)"
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
								value={person.lastnameLt}
								onChange={ (e) => setPerson(person => ({...person, lastnameLt: e.target.value})) }
								size="small"
								id="lastnameLt"
								name="lastnameLt"
								label="Last Name (Lt)"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}></Grid>

					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<DatePicker 
								format="DD/MM/YYYY" 
								label="Birth Date" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={person.birthDate} 
								onChange={ changedDate => setPerson(person => ({...person, birthDate:changedDate})) }
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={person.birthPlace}
								onChange={ (e) => setPerson(person => ({...person, birthPlace: e.target.value})) }
								size="small"
								id="birthPlace"
								name="birthPlace"
								label="Birth Place"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small" >
							<InputLabel id="birthStateLabel">Birth State</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="birthStateLabel"
								id="birthState"
								variant="outlined"
								value={birthSt}
								label="Birth State"
								
								onChange={(e) => setBirthSt(e.target.value)}
							>
								{
									states.length > 0 && states.map(state => {
										return(
											<MenuItem key={state._links.self.href} value={state._links.self.href}>{state.designationLt}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={8} sm={8}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={person.address}
								onChange={ (e) => setPerson(person => ({...person, address: e.target.value})) }
								size="small"
								id="address"
								name="address"
								label="Address"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small" >
							<InputLabel id="addressStateLabel">Address State</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="addressStateLabel"
								id="addressState"
								variant="outlined"
								value={addressSt}
								label="Address State"
								
								onChange={(e) => setAddressSt(e.target.value)}
							>
								{
									states.length > 0 && states.map(state => {
										return(
											<MenuItem key={state._links.self.href} value={state._links.self.href}>{state.designationLt}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={employee.serial}
								onChange={ (e) => setPerson(employee => ({...employee, serial: e.target.value})) }
								size="small"
								id="serial"
								name="serial"
								label="Serial"
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
							<DatePicker 
								format="DD/MM/YYYY" 
								label="Hiring Date" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={employee.hiringDate} 
								onChange={ changedDate => setEmployee(employee => ({...employee, hiringDate:changedDate})) }
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}></Grid>

					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small" >
							<InputLabel id="mCategoryLabel">Category</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="mCategoryLabel"
								id="mCategory"
								variant="outlined"
								value={mCategory}
								label="Category"
								
								onChange={(e) => {
										setMCategory(e.target.value); 
										getRanks(e.target.value);
									}
								}
							>
								{
									mCategors.length > 0 && mCategors.map(category => {
										return(
											<MenuItem key={category._links.self.href} value={category._links.militaryRanks.href}>{category.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small" >
							<InputLabel id="mRankLabel">Rank</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="mRankLabel"
								id="mRank"
								variant="outlined"
								value={mRank}
								label="Rank"
								
								onChange={(e) => setMRank(e.target.value)}
							>
								{
									mRanks.length > 0 && mRanks.map(rank => {
										return(
											<MenuItem key={rank._links.self.href} value={rank._links.self.href}>{rank.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}></Grid>
					
					<Grid item xs={4} sm={4}>
						<Autocomplete
							id="structure"
							fullWidth
							size="small"
							options={structures}
							value={structure}
							onChange={(e, value) => setStructure(value)}
							getOptionLabel={(structure) => structure.designationFr}
							isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
							renderInput={(params) => <TextField {...params} label="Structure" onChange={debounce(filterStrBy, 200)}/>}
						/>
					</Grid>
					<Grid item xs={4} sm={4}>
						<Autocomplete
							id="job"
							fullWidth
							size="small"
							options={jobs}
							value={job}
							onChange={(e, value) => setJob(value)}
							getOptionLabel={(job) => job.designationFr}
							isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
							renderInput={(params) => <TextField {...params} label="Job" onChange={debounce(filterJobBy, 200)}/>}
						/>
					</Grid>
					<Grid item xs={4} sm={4}></Grid>
					
				</Grid>
			</Paper>
		</Container>
	);
}
export default EmployeeDetails ;

