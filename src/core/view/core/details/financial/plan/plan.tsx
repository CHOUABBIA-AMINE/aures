import "../../../../../picture.css"

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

import { useHTTP } 				from "../../../../../api/request";
import { formatURL } 			from "../../../../../api/tools";

import { BudgetPlanStatus } 	from "../../../../../model/financial/budget.plan.status";
import { BudgetType } 			from "../../../../../model/financial/budget.type";
import { BudgetPlan } 			from "../../../../../model/financial/budget.plan";

const PlanDetails = (props : any) => {

	const location 					= useLocation();
	const params 					= useParams();
	const { enqueueSnackbar } 		= useSnackbar();

	let readOnly 					= params.action === 'edit' ? false : true;
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl, uploadFile, getFile} = useHTTP();

	const [ budgetPlanStatuss, setBudgetPlanStatuss ]	= useState<BudgetPlanStatus[]>([]);
	const [ budgetPlanStatus, setBudgetPlanStatus ]		= useState<string>("");

	const [ budgetTypes, setBudgetTypes ]				= useState<BudgetType[]>([]);
	const [ budgetType, setBudgetType ]					= useState<string>("");

	const [ budgetPlan, setBudgetPlan ]					= useState<BudgetPlan>({
		designationAr           : "",
		designationEn           : "",
		designationFr           : "",
		budgetYear              : "",
		_links          		: {
			budgetPlan          	:{
				href                    : ""
			},
			self                    :{
				href                    : ""
			},
			budgetPlanStatus        :{
				href                    : ""
			},
			budgetType          	:{
				href                    : ""
			}
		}
	});

	const fetchData = ()=>{

		getUrl(formatURL(location.state.modelId)).then((plan : any) => {
			setBudgetPlan({
				designationAr           : plan.data.designationAr,
				designationEn           : plan.data.designationEn,
				designationFr           : plan.data.designationFr,
				budgetYear              : plan.data.budgetYear,
				_links          		: {
					budgetPlan    			:{
						href            		: plan.data._links.budgetPlan.href
					},
					self            		:{
						href            		: plan.data._links.self.href
					},
					budgetPlanStatus   		:{
						href            		: plan.data._links.budgetPlanStatus.href
					},
					budgetType				:{
						href            		: plan.data._links.budgetType.href
					}
				}
			})

			getUrl(formatURL(plan.data._links.budgetType.href)).then((type) => {
				getUrl(formatURL(type.data._links.budgetType.href)).then((budgetType) => {
					setBudgetType(budgetType.data._links.budgetType.href);
				})
			});

			getUrl(formatURL(plan.data._links.budgetPlanStatus.href)).then((planStatus) => {
				getUrl(formatURL(planStatus.data._links.budgetPlanStatus.href)).then((budgetPlanStatus) => {
					setBudgetPlanStatus(budgetPlanStatus.data._links.budgetPlanStatus.href);
				})
			});

		});
	}

	const patchData = ()=>{
		if(location.state != null){

			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				designationAr           : budgetPlan.designationAr,
				designationEn           : budgetPlan.designationEn,
				designationFr           : budgetPlan.designationFr,
				budgetYear              : budgetPlan.budgetYear,
				budgetType				: budgetType,
				budgetPlanStatus		: budgetPlanStatus,
			})).then((budgetPlan) => {
				
				if(budgetPlan.data !== undefined){
					setBudgetPlan(budgetPlan.data);
					enqueueSnackbar('Entity updated successfully !', {variant: 'success'});
				}
			});
			
		}else{

			postBasedUrl("budgetPlan", JSON.stringify({
				designationAr           : budgetPlan.designationAr,
				designationEn           : budgetPlan.designationEn,
				designationFr           : budgetPlan.designationFr,
				budgetYear              : budgetPlan.budgetYear,
				budgetType				: budgetType,
				budgetPlanStatus		: budgetPlanStatus,
			})).then((budgetPlan) => {
				if(budgetPlan.data !== undefined){
					setBudgetPlan(budgetPlan.data);
					enqueueSnackbar('Entity created successfully !', {variant: 'success'});
				}
			})
		}
	}

	useEffect(() => {

		getBasedUrl("budgetPlanStatus").then((budgetPlanStatuss) => {
			setBudgetPlanStatuss(budgetPlanStatuss.data._embedded.budgetPlanStatus);
		});

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
				<Grid container spacing={1} direction={"column"}>			
					
					<Grid item>
						<Grid container spacing={1} direction={"row"}>
							<Grid item xs={4} sm={4}>
								<FormControl fullWidth size="small" >
									<InputLabel id="planStatusLabel">Plan Status</InputLabel>
									<Select
										required
										fullWidth
										size="small"
										labelId="planStatusLabel"
										id="planStatus"
										variant="outlined"
										value={budgetPlanStatus}
										label="Plan Status"
										
										onChange={(e) => setBudgetPlanStatus(e.target.value)}
									>
										{
											budgetPlanStatuss.length > 0 && budgetPlanStatuss.map(budgetPlanStatus => {
												return(
													<MenuItem key={budgetPlanStatus._links.self.href} value={budgetPlanStatus._links.budgetPlanStatus.href}>{budgetPlanStatus.designationFr}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={8} sm={8}></Grid>

							<Grid item xs={4} sm={4}>
								<FormControl fullWidth size="small" >
									<InputLabel id="planTypeLabel">Plan Type</InputLabel>
									<Select
										required
										fullWidth
										size="small"
										labelId="planTypeLabel"
										id="planType"
										variant="outlined"
										value={budgetType}
										label="Plan Type"
										
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
							<Grid item xs={5} sm={5}></Grid>
							<Grid item xs={3} sm={3}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={budgetPlan.budgetYear}
										onChange={ (e) => setBudgetPlan(budgetPlan => ({...budgetPlan, budgetYear: e.target.value})) }
										size="small"
										id="budgetYear"
										name="budgetYear"
										label="Budget Year"
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
										value={budgetPlan.designationAr}
										onChange={ (e) => setBudgetPlan(budgetPlan => ({...budgetPlan, designationAr: e.target.value})) }
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
										value={budgetPlan.designationEn}
										onChange={ (e) => setBudgetPlan(budgetPlan => ({...budgetPlan, designationEn: e.target.value})) }
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
										value={budgetPlan.designationFr}
										onChange={ (e) => setBudgetPlan(budgetPlan => ({...budgetPlan, designationFr: e.target.value})) }
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
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
export default PlanDetails;

