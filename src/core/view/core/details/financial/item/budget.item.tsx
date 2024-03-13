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

import { BudgetDomain } 		from "../../../../../model/financial/budget.domain";
import { BudgetItemStatus } 	from "../../../../../model/financial/budget.item.status";
import { BudgetItem } 			from "../../../../../model/financial/budget.item";
import { BudgetRubric } 		from "../../../../../model/financial/budget.rubric";
import { BudgetSubDomain } 		from "../../../../../model/financial/budget.sub.domain";
import { FinancialOperation } 	from "../../../../../model/financial/financial.operation";

const BudgetItemDetails = (props : any) => {

	const location 					= useLocation();
	const params 					= useParams();
	const { enqueueSnackbar } 		= useSnackbar();

	let readOnly 					= params.action === 'edit' ? false : true;
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl, uploadFile, getFile} = useHTTP();

	const [ budgetDomains, setBudgetDomains ]				= useState<BudgetDomain[]>([]);
	const [ budgetDomain, setBudgetDomain ]					= useState<string>("");

	const [ budgetSubDomains, setBudgetSubDomains ]			= useState<BudgetSubDomain[]>([]);
	const [ budgetSubDomain, setBudgetSubDomain ]			= useState<string>("");

	const [ budgetRubrics, setBudgetRubrics ]				= useState<BudgetRubric[]>([]);
	const [ budgetRubric, setBudgetRubric ]					= useState<string>("");

	const [ financialOperations, setFinancialOperations ]	= useState<FinancialOperation[]>([]);
	const [ financialOperation, setFinancialOperation ]		= useState<string>("");

	const [ budgetItemStatuss, setBudgetItemStatuss ]		= useState<BudgetItemStatus[]>([]);
	const [ budgetItemStatus, setBudgetItemStatus ]			= useState<string>("");

	const [ budgetItem, setBudgetItem ]						= useState<BudgetItem>({
		designationAr           : "",
		designationEn           : "",
		designationFr           : "",
		unitairCost				: 0.00,
		planedQuantity			: 0.00,
		allocatedAmount         : 0.00,
		_links          		: {
			budgetItem     			:{
				href                    : ""
			},
			self                    :{
				href                    : ""
			},
			budgetItemStatus        :{
				href                    : ""
			},
			budgetRubric          	:{
				href                    : ""
			},
			financialOperation      :{
				href                    : ""
			},
			budgetGoals          	:{
				href                    : ""
			},
		}
	});

	const fetchData = ()=>{

		getUrl(formatURL(location.state.modelId)).then((item : any) => {
			setBudgetItem({
				designationAr           : item.data.designationAr,
				designationEn           : item.data.designationEn,
				designationFr           : item.data.designationFr,
				unitairCost				: item.data.unitairCost,
				planedQuantity			: item.data.planedQuantity,
				allocatedAmount         : item.data.allocatedAmount,
				_links          		: {
					budgetItem    			:{
						href            		: item.data._links.budgetItem.href
					},
					self            		:{
						href            		: item.data._links.self.href
					},
					budgetItemStatus   		:{
						href            		: item.data._links.budgetItemStatus.href
					},
					budgetRubric				:{
						href            		: item.data._links.budgetRubric.href
					},
					financialOperation		:{
						href            		: item.data._links.financialOperation.href
					},
					budgetGoals				:{
						href            		: item.data._links.budgetGoals.href
					}
				}
			})

			getUrl(formatURL(item.data._links.budgetItemStatus.href)).then((status) => {
				getUrl(formatURL(status.data._links.budgetItemStatus.href)).then((budgetItemStatus) => {
					setBudgetItemStatus(budgetItemStatus.data._links.budgetItemStatus.href);
				})
			});

			getUrl(formatURL(item.data._links.financialOperation.href)).then((operation) => {
				getUrl(formatURL(operation.data._links.financialOperation.href)).then((financialOperation) => {
					setFinancialOperation(financialOperation.data._links.financialOperation.href);
				})
			});

			// getUrl(formatURL(plan.data._links.budgetPlanStatus.href)).then((planStatus) => {
			// 	getUrl(formatURL(planStatus.data._links.budgetPlanStatus.href)).then((budgetPlanStatus) => {
			// 		setBudgetPlanStatus(budgetPlanStatus.data._links.budgetPlanStatus.href);
			// 	})
			// });

		});
	}

	const patchData = ()=>{
		if(location.state != null){

			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				designationAr           : budgetItem.designationAr,
				designationEn           : budgetItem.designationEn,
				designationFr           : budgetItem.designationFr,
				unitairCost				: budgetItem.unitairCost,
				planedQuantity			: budgetItem.planedQuantity,
				allocatedAmount         : budgetItem.allocatedAmount,
				budgetItemStatus		: budgetItemStatus,
				budgetRubric			: budgetRubric,
				financialOperation		: financialOperation
			})).then((budgetItem) => {
				
				if(budgetItem.data !== undefined){
					setBudgetItem(budgetItem.data);
					enqueueSnackbar('Entity updated successfully !', {variant: 'success'});
				}
			});
			
		}else{

			postBasedUrl("budgetPlan", JSON.stringify({
				designationAr           : budgetItem.designationAr,
				designationEn           : budgetItem.designationEn,
				designationFr           : budgetItem.designationFr,
				unitairCost				: budgetItem.unitairCost,
				planedQuantity			: budgetItem.planedQuantity,
				allocatedAmount         : budgetItem.allocatedAmount,
				budgetItemStatus		: budgetItemStatus,
				budgetRubric			: budgetRubric,
				financialOperation		: financialOperation
			})).then((budgetItem) => {
				if(budgetItem.data !== undefined){
					setBudgetItem(budgetItem.data);
					enqueueSnackbar('Entity created successfully !', {variant: 'success'});
				}
			})
		}
	}

	/*useEffect(() => {
		getUrl(formatURL(budgetDomain)).then((domain) => {
			getUrl(formatURL(domain.data._links.budgetSubDomains)).then((subDomains) => {
				setBudgetSubDomains(subDomains.data._embedded.BudgetSubDomain);
			})
		});
	},[budgetDomain]);

	useEffect(() => {
		getUrl(formatURL(budgetSubDomain)).then((subDomain) => {
			getUrl(formatURL(subDomain.data._links.budgetRubrics)).then((rubrics) => {
				setBudgetRubrics(rubrics.data._embedded.BudgetRubric);
			})
		});
	},[budgetSubDomain]);*/

	useEffect(() => {

		getBasedUrl("budgetItemStatus").then((budgetItemStatus) => {
			setBudgetItemStatuss(budgetItemStatus.data._embedded.budgetItemStatus);
		});

		getBasedUrl("budgetDomain").then((budgetDomains) => {
			setBudgetDomains(budgetDomains.data._embedded.budgetDomain);
		});

		getBasedUrl("financialOperation").then((financialOperations) => {
			setFinancialOperations(financialOperations.data._embedded.financialOperation);
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
						Budget Item Details
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
							<Grid item xs={3} sm={3}>
								<FormControl fullWidth size="small" >
									<InputLabel id="budgetDomainLabel">Budget Domain</InputLabel>
									<Select
										required
										fullWidth
										size="small"
										labelId="budgetDomainLabel"
										id="budgetDomain"
										variant="outlined"
										value={budgetDomain}
										label="Budget Domain"
										
										onChange={(e) => setBudgetDomain(e.target.value)}
									>
										{
											budgetDomains.length > 0 && budgetDomains.map(budgetDomain => {
												return(
													<MenuItem key={budgetDomain._links.self.href} value={budgetDomain._links.budgetDomain.href}>{budgetDomain.designationFr}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={3} sm={3}>
								<FormControl fullWidth size="small" >
									<InputLabel id="budgetSubDomainLabel">Budget Sub-Domain</InputLabel>
									<Select
										required
										fullWidth
										size="small"
										labelId="budgetSubDomainLabel"
										id="budgetSubDomain"
										variant="outlined"
										value={budgetSubDomain}
										label="Budget Sub-Domain"
										
										onChange={(e) => setBudgetSubDomain(e.target.value)}
									>
										{
											budgetSubDomains.length > 0 && budgetSubDomains.map(budgetSubDomain => {
												return(
													<MenuItem key={budgetSubDomain._links.self.href} value={budgetSubDomain._links.budgetSubDomain.href}>{budgetSubDomain.designationFr}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={6} sm={6}>
								<FormControl fullWidth size="small" >
									<InputLabel id="budgetRubricLabel">Budget Rubric</InputLabel>
									<Select
										required
										fullWidth
										size="small"
										labelId="budgetRubricLabel"
										id="budgetRubric"
										variant="outlined"
										value={budgetRubric}
										label="Budget Sub-Domain"
										
										onChange={(e) => setBudgetRubric(e.target.value)}
									>
										{
											budgetRubrics.length > 0 && budgetRubrics.map(budgetRubric => {
												return(
													<MenuItem key={budgetRubric._links.self.href} value={budgetRubric._links.budgetRubric.href}>{budgetRubric.designationFr}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={4} sm={4}>
								<FormControl fullWidth size="small" >
									<InputLabel id="financialOperationLabel">Financial Operation</InputLabel>
									<Select
										required
										fullWidth
										size="small"
										labelId="financialOperationLabel"
										id="financialOperation"
										variant="outlined"
										value={financialOperation}
										label="Financial Operation"
										
										onChange={(e) => setFinancialOperation(e.target.value)}
									>
										{
											financialOperations.length > 0 && financialOperations.map(financialOperation => {
												return(
													<MenuItem key={financialOperation._links.self.href} value={financialOperation._links.financialOperation.href}>{financialOperation.operation}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={8} sm={8}></Grid>

							<Grid item xs={4} sm={4}>
								<FormControl fullWidth size="small" >
									<InputLabel id="itemStatusLabel">Item Status</InputLabel>
									<Select
										required
										fullWidth
										size="small"
										labelId="itemStatusLabel"
										id="itemStatus"
										variant="outlined"
										value={budgetItemStatus}
										label="Item Status"
										
										onChange={(e) => setBudgetItemStatus(e.target.value)}
									>
										{
											budgetItemStatuss.length > 0 && budgetItemStatuss.map(budgetItemStatus => {
												return(
													<MenuItem key={budgetItemStatus._links.self.href} value={budgetItemStatus._links.budgetItemStatus.href}>{budgetItemStatus.designationFr}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={8} sm={8}></Grid>

							<Grid item xs={12} sm={12}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={budgetItem.designationAr}
										onChange={ (e) => setBudgetItem(budgetItem => ({...budgetItem, designationAr: e.target.value})) }
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
										value={budgetItem.designationEn}
										onChange={ (e) => setBudgetItem(budgetItem => ({...budgetItem, designationEn: e.target.value})) }
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
										value={budgetItem.designationFr}
										onChange={ (e) => setBudgetItem(budgetItem => ({...budgetItem, designationFr: e.target.value})) }
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

							<Grid item xs={4} sm={4}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={budgetItem.unitairCost}
										onChange={ (e) => setBudgetItem(budgetItem => ({...budgetItem, unitairCost: Number(e.target.value)})) }
										size="small"
										id="unitairCost"
										name="unitairCost"
										label="Unitair Cost"
										autoComplete="off"
										variant="outlined"
										
										inputProps={{ 
											readOnly: readOnly,
											dir: "rtl"
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={2} sm={2}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={budgetItem.planedQuantity}
										onChange={ (e) => setBudgetItem(budgetItem => ({...budgetItem, planedQuantity: Number(e.target.value)})) }
										size="small"
										id="planedQuantity"
										name="planedQuantity"
										label="Planed Quantity"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly, 
											dir: "rtl"
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6} sm={6}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={budgetItem.allocatedAmount}
										onChange={ (e) => setBudgetItem(budgetItem => ({...budgetItem, allocatedAmount: Number(e.target.value)})) }
										size="small"
										id="allocatedAmount"
										name="allocatedAmount"
										label="Allocated Amount"
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
export default BudgetItemDetails;

