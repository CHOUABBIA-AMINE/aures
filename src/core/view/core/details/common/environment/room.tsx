import dayjs 					from "dayjs";

import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useNavigate } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { useSnackbar } 			from "notistack";

import { Autocomplete } 		from "@mui/material";
import { Modal } 				from "@mui/material";
import { Tooltip } 				from "@mui/material";
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
import { Typography } 			from "@mui/material";

import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";

import { AttachEmail } 			from "@mui/icons-material";
import { PictureAsPdfOutlined } from "@mui/icons-material";
import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";
import { Visibility } 			from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { useHTTP } 				from "../../../../../api/request";

import { Bloc } 				from "../../../../../model/common/environment/bloc";
import { Floor } 				from "../../../../../model/common/environment/floor";
import { Structure } 			from "../../../../../model/common/administration/structure";
import { Room } 				from "../../../../../model/common/environment/room";

const RoomDetails = (props : any) => {

	const { getUrl, getBasedUrl, patchUrl, postBasedUrl, uploadFile, getFile, deleteUrl} = useHTTP();

	const location 							= useLocation();
	const params 							= useParams();
	const { enqueueSnackbar } 				= useSnackbar();
	const navigate          				= useNavigate();

	let readOnly 							= params.action === 'view' ? true : false;


	const [ blocs, setBlocs ]				= useState<Bloc[]>([]);
	const [ bloc, setBloc ]					= useState<string>("");

	const [ floors, setFloors ]				= useState<Floor[]>([]);
	const [ floor, setFloor ]				= useState<string>("");
	
	const [ structures, setStructures ]		= useState<Structure[]>([]);
	const [ structure, setStructure ]		= useState<Structure | null>(null);

	const [ room, setRoom ]	= useState<Room>({
		code            : "",
		designationAr   : "",
		designationEn   : "",
		designationFr   : "",
		_links          : {
			room            :{
				href            : ""
			},
			self            :{
				href            : ""
			},
			bloc            :{
				href            : ""
			},
			floor           :{
				href            : ""
			},
			structure       :{
				href            : ""
			}
		}
	});

	const fetchData = ()=>{
		if(location !== null && location.state !== null && location.state.modelId !== null ){
			getUrl(formatURL(location.state.modelId)).then((response : any) => {
				setRoom({
					code   			: response.data.code,
					designationAr	: response.data.designationAr,
					designationEn 	: response.data.designationEn,
					designationFr  	: response.data.designationFr,
					_links          : {
						room       		:{
							href            : response.data._links.room.href
						},
						self            :{
							href            : response.data._links.self.href
						},
						bloc   			:{
							href            : response.data._links.bloc.href
						},
						floor     		:{
							href            : response.data._links.floor.href
						},
						structure   	:{
							href            : response.data._links.structure.href
						}
					}
				})
				getUrl(formatURL(response.data._links.bloc.href)).then((bloc) => {
					setBloc(bloc.data !== undefined ? bloc.data._links.self.href : "" )
				});
				getUrl(formatURL(response.data._links.floor.href)).then((floor) => {
					setFloor(floor.data !== undefined ? floor.data._links.self.href : "" )
				});
				getUrl(formatURL(response.data._links.structure.href)).then((structure) => {
					setStructure(structure.data !== undefined ? structure.data : null )
				}).catch(()=>{
				});
			});
		}else{
			setRoom({
				code            : "",
				designationAr   : "",
				designationEn   : "",
				designationFr   : "",
				_links          : {
					room            :{
						href            : ""
					},
					self            :{
						href            : ""
					},
					bloc            :{
						href            : ""
					},
					floor           :{
						href            : ""
					},
					structure       :{
						href            : ""
					}
				}
			})
			setBloc("");
			setFloor("");
			setStructure( null );
		}
	}

	const filterBy = (e : any) =>{
		getBasedUrl("structure/search/filterBy?filter=" + e.target.value).then((up) => {
			setStructures(up.data._embedded.structure);
		})
	}

	const patchData = ()=>{
		if(location !== null && location.state !== null && location.state.modelId !== null){
			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				code   			: room.code,
				designationAr	: room.designationAr,
				designationEn 	: room.designationEn,
				designationFr   : room.designationFr,
				bloc  			: bloc,
				floor			: floor,
				structure  		: structure?._links.self.href
			})).then((response) => {
				enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
			})
		}else{

			postBasedUrl("room", JSON.stringify({
				code   			: room.code,
				designationAr	: room.designationAr,
				designationEn 	: room.designationEn,
				designationFr   : room.designationFr,
				bloc  			: bloc,
				floor			: floor,
				structure  		: structure?._links.self.href
			})).then((response) => {
				enqueueSnackbar('Entity created successfully!', {variant: 'success'});
			})
		}
	}

	useEffect(() => {
		getBasedUrl("bloc").then((blocs) => {
			setBlocs(blocs.data._embedded.bloc);
		});

		getBasedUrl("floor").then((floors) => {
			setFloors(floors.data._embedded.floor);
		});

		if(location !== null && location.state !== null && location.state.modelId !== null){
			fetchData();
		}
    },[])

	return (
		<Container maxWidth="lg">
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h6" >
						Room Details
					</Typography>
					<Box>
						
						<Tooltip title="Save" arrow>
							<Button color="primary" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => patchData()}>
								<Save />
							</Button>
						</Tooltip>
						<Tooltip title="Reset" arrow>
							<Button color="success" variant="outlined" size="small" sx={{ marginRight:'5px' }}  onClick={e => { fetchData();}}>
								<Replay />
							</Button>
						</Tooltip>
						
					</Box>
				</Box>
				<Grid container spacing={1}>
					
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="blocLabel">Bloc</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="blocLabel"
								id="bloc"
								variant="outlined"
								value={bloc}
								label="Bloc"
								
								onChange={(e) => setBloc(e.target.value)}
							>
								{
									blocs.length > 0 && blocs.map(bloc => {
										return(
											<MenuItem key={bloc._links.self.href} value={bloc._links.self.href}>{bloc.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="floorLabel">Floor</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="floorLabel"
								id="floor"
								variant="outlined"
								value={floor}
								label="Floor"
								
								onChange={(e) => setFloor(e.target.value)}
							>
								{
									floors.length > 0 && floors.map(floor => {
										return(
											<MenuItem key={floor._links.self.href} value={floor._links.self.href}>{floor.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} sm={6}>
						<Autocomplete
							id="structure"
							fullWidth
							size="small"
							options={structures}
							value={structure}
							onChange={(e, value) => setStructure(value)}
							getOptionLabel={(structure) => structure.designationFr}
							isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
							renderInput={(params) => <TextField {...params} label="Structure" onChange={debounce(filterBy, 200)}/>}
						/>
					</Grid>

					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={room.code}
								onChange={ (e) => setRoom(room => ({...room, code: e.target.value})) }
								size="small"
								id="code"
								name="code"
								label="Code"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={8} sm={8}></Grid>

					<Grid item xs={12} sm={12}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={room.designationAr}
								onChange={ (e) => setRoom(room => ({...room, designationAr: e.target.value})) }
								size="small"
								id="designationAr"
								name="designationAr"
								label="Designation (Ar)"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly, 
									dir:"rtl"
								}}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={12}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={room.designationEn}
								onChange={ (e) => setRoom(room => ({...room, designationEn: e.target.value})) }
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

					<Grid item xs={12} sm={12}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={room.designationFr}
								onChange={ (e) => setRoom(room => ({...room, designationFr: e.target.value})) }
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
export default RoomDetails ;