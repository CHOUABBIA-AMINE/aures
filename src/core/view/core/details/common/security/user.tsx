import React 					from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Box, Checkbox, Divider, FormControlLabel, List, ListItemButton, ListItemIcon, ListItemText, Switch } 					from "@mui/material";
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

import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";
import { Visibility } 			from "@mui/icons-material";
import { VisibilityOff } 		from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { User } 				from "../../../../../model/user";

const UserDetails = (props : any) => {
	const location 	= useLocation();
	const params 	= useParams();
	const action 	= params.action;
    console.log(formatURL(location.state.modelId));
	const [showPassword, setShowPassword] = React.useState(false);
	const [enabled, setEnabled] = React.useState(true);
	const [locked, 	setLocked] 	= React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const enableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnabled(event.target.checked);
	};

	const lockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocked(event.target.checked);
	};

	function not(a: readonly number[], b: readonly number[]) {
		return a.filter((value) => b.indexOf(value) === -1);
	}
	
	function intersection(a: readonly number[], b: readonly number[]) {
		return a.filter((value) => b.indexOf(value) !== -1);
	}

	const [checked, setChecked] = React.useState<readonly number[]>([]);
  	const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
  	const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

  	const leftChecked = intersection(checked, left);
  	const rightChecked = intersection(checked, right);

	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	const customList = (items: readonly number[]) => (
		<Box sx={{ width: 200, height: 230, overflow: 'auto', border:"solid 1px rgba(0, 0, 0, 0.3)", borderRadius:"5px"}}>
			<Typography variant="h6" textAlign="center">
				Role
			</Typography>
			<Divider orientation="horizontal"></Divider>
			<List dense component="div" role="list">
				{
					items.map((value: number) => {
						const labelId = `transfer-list-item-${value}-label`;
				
						return (
							<ListItemButton
								key={value}
								role="listitem"
								onClick={handleToggle(value)} 
							>
								<ListItemIcon>
									<Checkbox
										size="small"
										checked={checked.indexOf(value) !== -1}
										tabIndex={-1}
										disableRipple
										inputProps={{
											'aria-labelledby': labelId,
										}}
									/>
								</ListItemIcon>
								<ListItemText id={labelId} primary={`List item ${value + 1}`} />
							</ListItemButton>
						);
					})
				}
			</List>
		</Box>
	  );
	return (
        // <h1>{action}{location.state !== null ? location.state.modelId : ""}</h1>
		<Container maxWidth="lg">
			
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h6" >
						User Details
					</Typography>
					<Box>
						<Button color="primary" variant="outlined" size="small" sx={{ marginRight:'5px' }}>
							<Save />
						</Button>
						<Button color="success" variant="outlined" size="small" sx={{ marginLeft:'5px' }}>
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
								size="small"
								id="username"
								name="username"
								label="Username"
								autoComplete="off"
								variant="outlined"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={8} sm={8} />
					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								size="small"
								id="password"
								type={showPassword ? 'text' : 'password'}
								name="password"
								label="Password"
								autoComplete="off"
								variant="outlined"
								InputProps={{
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
							<DatePicker format="DD/MM/YYYY" label="Expiration Date" slotProps={{ textField: { size: 'small', required: true }}} />
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4} sx={{display : "flex", justifyContent: "flex-end"}}>
						<FormControlLabel control={<Switch checked={enabled} onChange={enableChange}/>} label="Enabled" />
					</Grid>
					<Grid item xs={4} sm={4} sx={{display : "flex", justifyContent: "flex-end"}}>
						<FormControlLabel control={<Switch checked={locked} onChange={lockChange}/>} label="Locked" color="warning"/>
					</Grid>
					<Grid item xs={4} sm={4} />
					<Grid item xs={8} sm={8}>
						<Grid container direction="row" sx={{display : "flex", justifyContent: "center"}}>
							<Grid item xs={5} sm={5} sx={{display : "flex", justifyContent: "center"}}>{customList(left)}</Grid>
							<Grid item xs={2} sm={2} sx={{display : "flex", justifyContent: "center", alignItems: "center"}}>
								<Grid container direction="column" alignItems="center">
									<Button
										sx={{ my: 0.5 }}
										variant="outlined"
										size="small"
										onClick={handleAllRight}
										disabled={left.length === 0}
										aria-label="move all right"
									>
										≫
									</Button>
									<Button
										sx={{ my: 0.5 }}
										variant="outlined"
										size="small"
										onClick={handleCheckedRight}
										disabled={leftChecked.length === 0}
										aria-label="move selected right"
									>
										&gt;
									</Button>
									<Button
										sx={{ my: 0.5 }}
										variant="outlined"
										size="small"
										onClick={handleCheckedLeft}
										disabled={rightChecked.length === 0}
										aria-label="move selected left"
									>
										&lt;
									</Button>
									<Button
										sx={{ my: 0.5 }}
										variant="outlined"
										size="small"
										onClick={handleAllLeft}
										disabled={right.length === 0}
										aria-label="move all left"
									>
										≪
									</Button>
								</Grid>
							</Grid>
							<Grid item xs={5} sm={5} sx={{display : "flex", justifyContent: "center"}}>{customList(right)}</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
export default UserDetails ;