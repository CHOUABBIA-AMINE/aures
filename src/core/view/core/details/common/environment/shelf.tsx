import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { useSnackbar } 			from "notistack";

import { Autocomplete } 		from "@mui/material";
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

import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { getIdFromUrl } 		from "../../../../../api/tools";

import { useHTTP } 				from "../../../../../api/request";

import { Bloc } 				from "../../../../../model/common/environment/bloc";
import { Floor } 				from "../../../../../model/common/environment/floor";
import { Structure } 			from "../../../../../model/common/administration/structure";
import { Room } 				from "../../../../../model/common/environment/room";
import { Shelf } 				from "../../../../../model/common/environment/shelf";

const ShelfDetails = (props : any) => {

	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();

	const location 							= useLocation();
	const params 							= useParams();
	const { enqueueSnackbar } 				= useSnackbar();

	let readOnly 							= params.action === 'view' ? true : false;


	const [ blocs, setBlocs ]				= useState<Bloc[]>([]);
	const [ bloc, setBloc ]					= useState<string>("");

	const [ floors, setFloors ]				= useState<Floor[]>([]);
	const [ floor, setFloor ]				= useState<string>("");
	
	const [ structures, setStructures ]		= useState<Structure[]>([]);
	const [ structure, setStructure ]		= useState<Structure | null>(null);
	
	const [ rooms, setRooms ]				= useState<Room[]>([]);
	const [ room, setRoom ]					= useState<string>("");
	const [ _room, set_Room ]				= useState<string>("");

	const [ shelf, setShelf ]	= useState<Shelf>({
		code            : "",
		_links          : {
			shelf           :{
				href            : ""
			},
			self            :{
				href            : ""
			},
			room       		:{
				href            : ""
			}
		}
	});

	const fetchData = ()=>{
		if(location !== null && location.state !== null && location.state.modelId !== null ){
			getUrl(formatURL(location.state.modelId)).then((response : any) => {
				setShelf({
					code   			: response.data.code,
					_links          : {
						shelf       	:{
							href            : response.data._links.shelf.href
						},
						self            :{
							href            : response.data._links.self.href
						},
						room   			:{
							href            : response.data._links.room.href
						}
					}
				})
				getUrl(formatURL(response.data._links.room.href)).then((room) => {
					set_Room(room.data._links.self.href);
					getUrl(formatURL(room.data._links.bloc.href)).then((bloc) => {
						setBloc(bloc.data !== undefined ? bloc.data._links.self.href : "" );
					});
					getUrl(formatURL(room.data._links.floor.href)).then((floor) => {
						setFloor(floor.data !== undefined ? floor.data._links.self.href : "" )
					});
					getUrl(formatURL(room.data._links.structure.href)).then((structure) => {
						setStructure(structure.data !== undefined ? structure.data : null )
					}).catch(()=>{
					});
					
				});
			});
		}else{
			setShelf({
				code            : "",
				_links          : {
					shelf           :{
						href            : ""
					},
					self            :{
						href            : ""
					},
					room            :{
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
		getBasedUrl("structure/search/filterBy?filter=" + e.target.value).then((structure) => {
			setStructures(structure.data._embedded.structure);
		})
	}

	const patchData = ()=>{
		if(location !== null && location.state !== null && location.state.modelId !== null){
			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				code   			: shelf.code,
				room  			: room
			})).then((response) => {
				enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
			})
		}else{

			postBasedUrl("shelf", JSON.stringify({
				code   			: shelf.code,
				room  			: room
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

	useEffect(() => {
		if(bloc !== "" && floor !== "" && structure !== null){
			getBasedUrl("room/search/get?bloc=" + getIdFromUrl(bloc) + "&floor=" + getIdFromUrl(floor) + "&structure=" + getIdFromUrl(structure._links.self.href)).then((rooms) => {
				setRooms(rooms.data._embedded.room);
			})
		}else{
			setRoom("");
			set_Room("");
			setRooms([]);
		}
    },[bloc, floor, structure])

	useEffect(() => {
		if(rooms.length !== 0 && _room !== ""){
			setRoom(_room);
			set_Room("");
		}
    },[rooms])

	return (
		<Container maxWidth="lg">
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h6" >
						Shelf Details
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
						<FormControl fullWidth size="small" >
							<InputLabel id="roomLabel">Room</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="roomLabel"
								id="room"
								variant="outlined"
								value={room}
								label="Room"
								
								onChange={(e) => setRoom(e.target.value)}
							>
								{
									rooms.length > 0 && rooms.map(room => {
										return(
											<MenuItem key={room._links.self.href} value={room._links.self.href}>{room.code}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={9} sm={9}></Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={shelf.code}
								onChange={ (e) => setShelf(shelf => ({...shelf, code: e.target.value})) }
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
					<Grid item xs={9} sm={9}></Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
export default ShelfDetails ;