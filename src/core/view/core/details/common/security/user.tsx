import { UploadFile } from "@mui/icons-material";
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useLocation, useParams } 			from "react-router-dom";

const UserDetails = (props : any) => {
	const location 	= useLocation();
	const params 	= useParams();
	const action 	= params.action;
	//console.log(location.state.modelId)
	const [age, setAge] = React.useState<string>("");
	const handleChange = (event:any) => {
		setAge(event.target.value);
	  };
	
	  const categories = [
		"science",
		"sports",
		"business",
		"politics",
		"entertainment",
		"technology",
		"world",
		"all"
	  ];

	return (
        // <h1>{action}{location.state !== null ? location.state.modelId : ""}</h1>
		<Container maxWidth="lg">
			
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
					Krunch Media
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={6} sm={6}>
						<FormControl fullWidth size="small">
							<TextField
								required
								id="title"
								name="title"
								label="Title"
								fullWidth
								size="small"
								autoComplete="off"
								variant="outlined"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={6} sm={6} />
					<Grid item xs={6} sm={6}>
						<FormControl fullWidth size="small">
							<TextField
								id="outlined-multiline-static"
								label="Content"
								fullWidth
								size="small"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={10}>
						<TextField
							required
							id="url"
							name="url"
							label="URL"
							fullWidth
							size="small"
							autoComplete="off"
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<FormControl fullWidth size="small">
							<InputLabel id="demo-simple-select-label">Age</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={age}
								label="Age"
								onChange={handleChange}
							>
								{categories.map((item) => (
									<MenuItem value={item}>{item}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							required
							id="author"
							name="author"
							label="Author"
							fullWidth
							size="small"
							autoComplete="off"
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Button>
							<UploadFile />
						</Button>
					</Grid>
					<Grid item xs={12} sm={6} />
					<Grid item xs={12} sm={5} />
					<Grid item xs={12} sm={4}>
						<Button variant="contained" sx={{ color: "#ff781f" }}>
							Save
						</Button>
					</Grid>
					<Grid item xs={12} sm={5} />
				</Grid>
			</Paper>
		</Container>
	);
}
export default UserDetails ;