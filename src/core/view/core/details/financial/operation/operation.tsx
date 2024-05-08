import "../../../../../picture.css"

import { useSnackbar } 			from "notistack";

import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Box, Tooltip } 					from "@mui/material";
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

import { useHTTP } 				from "../../../../../api/request";
import { formatURL } 			from "../../../../../api/tools";

import { BudgetType } 			from "../../../../../model/financial/budget.type";
import { FinancialOperation } from "../../../../../model/financial/financial.operation";

const OperationDetails = (props : any) => {

	const location 					= useLocation();
	const params 					= useParams();
	const { enqueueSnackbar } 		= useSnackbar();

	let readOnly 					= params.action === 'edit' ? false : true;
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl} = useHTTP();

	const [ budgetTypes, setBudgetTypes ]				= useState<BudgetType[]>([]);
	const [ budgetType, setBudgetType ]					= useState<string>("");

	let years : string []								= [];
	for (let i = 2020; i < 2031; i++) years.push(""+i);

	const [ financialOperation, setFinancialOperation ]	= useState<FinancialOperation>({
		operation              	: "",
		budgetYear				: "",
		_links          		: {
			financialOperation      :{
				href                    : ""
			},
			self                    :{
				href                    : ""
			},
			budgetType         		:{
				href                    : ""
			}
		}
	});

	const fetchData = ()=>{
		if(location.state != null){
			getUrl(formatURL(location.state.modelId)).then((operation : any) => {
				setFinancialOperation({
					operation           	: operation.data.operation,
					budgetYear				: operation.data.budgetYear,
					_links          		: {
						financialOperation		:{
							href            		: operation.data._links.financialOperation.href
						},
						self            		:{
							href            		: operation.data._links.self.href
						},
						budgetType				:{
							href            		: operation.data._links.budgetType.href
						}
					}
				})

				getUrl(formatURL(operation.data._links.budgetType.href)).then((type) => {
					getUrl(formatURL(type.data._links.budgetType.href)).then((budgetType) => {
						setBudgetType(budgetType.data._links.budgetType.href);
					})
				});

			});
		}
	}

	const patchData = ()=>{
		if(location.state != null){

			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				operation           	: financialOperation.operation,
				budgetYear           	: financialOperation.budgetYear,
				budgetType				: budgetType
			})).then((financialOperation) => {
				
				if(financialOperation.data !== undefined){
					setFinancialOperation(financialOperation.data);
					enqueueSnackbar('Entity updated successfully !', {variant: 'success'});
				}
			});
			
		}else{

			postBasedUrl("financialOperation", JSON.stringify({
				operation           	: financialOperation.operation,
				budgetYear           	: financialOperation.budgetYear,
				budgetType				: budgetType
			})).then((financialOperation) => {
				if(financialOperation.data !== undefined){
					setFinancialOperation(financialOperation.data);
					enqueueSnackbar('Entity created successfully !', {variant: 'success'});
				}
			})
		}
	}

	useEffect(() => {

		getBasedUrl("budgetType").then((budgetTypes) => {
			setBudgetTypes(budgetTypes.data._embedded.budgetType);
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
						Financial Operation Details
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
				<Grid container spacing={1} direction={"column"}>			
					
					<Grid item>
						<Grid container spacing={1} direction={"row"}>

							<Grid item xs={4} sm={4}>
								<FormControl fullWidth size="small" >
									<InputLabel id="budgetTypeLabel">Budget Type</InputLabel>
									<Select
										required
										fullWidth
										size="small"
										labelId="budgetTypeLabel"
										id="budgetType"
										variant="outlined"
										value={budgetType}
										label="Budget Type"
										
										onChange={(e) => setBudgetType(e.target.value)}
									>
										{
											budgetTypes.length > 0 && budgetTypes.map(budgetType => {
												return(
													<MenuItem key={budgetType._links.self.href} value={budgetType._links.budgetType.href}>{budgetType.designationFr}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={2} sm={2}>
								<FormControl fullWidth size="small" >
								<InputLabel id="budgetYearLabel">Budget Year</InputLabel>
									<Select
										required
										fullWidth
										size="small"
										labelId="budgetYearLabel"
										id="budgetYear"
										variant="outlined"
										value={financialOperation.budgetYear}
										label="Budget Year"
										
										onChange={(e) => setFinancialOperation(financialOperation => ({...financialOperation, budgetYear: e.target.value})) }
									>
										{ }
										{ years.map(year => { return (<MenuItem key={year} value={year}>{year}</MenuItem> );}) }
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={6} sm={6}></Grid>


							<Grid item xs={12} sm={12}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={financialOperation.operation}
										onChange={ (e) => setFinancialOperation(financialOperation => ({...financialOperation, operation: e.target.value})) }
										size="small"
										id="operation"
										name="operation"
										label="Operation"
										autoComplete="off"
										variant="outlined"
										
										inputProps={{ 
											readOnly: readOnly,
											dir: "rtl"
										}}
									/>
								</FormControl>
							</Grid>

						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
export default OperationDetails;

