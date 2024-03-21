import "../../../../../picture.css"

import dayjs 					from "dayjs";
import { useSnackbar } 			from "notistack";

import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Autocomplete } 		from "@mui/material";
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

import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";

import { useHTTP } 				from "../../../../../api/request";
import { formatURL } 			from "../../../../../api/tools";

import { ApprovalStatus } 		from "../../../../../model/realization/approval.status";
import { Contract } 			from "../../../../../model/realization/contract/contract";
import { Consultation } 		from "../../../../../model/realization/consultation/consultation";
import { Currency } 			from "../../../../../model/common/currency";
import { ContractStep } 		from "../../../../../model/realization/contract/contract.step";
import { ContractPhase } 		from "../../../../../model/realization/contract/contract.phase";
import { ContractType } 		from "../../../../../model/realization/contract/contract.type";
import { Provider } 			from "../../../../../model/realization/provider/provider";
import { RealizationStatus } 	from "../../../../../model/realization/realization.status";

const ContractDetails = (props : any) => {

	const location 					= useLocation();
	const params 					= useParams();
	const { enqueueSnackbar } 		= useSnackbar();

	let readOnly 					= params.action === 'edit' ? false : true;
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl } = useHTTP();

	const [ contractTypes, setContractTypes ]			= useState<ContractType[]>([]);
	const [ contractType, setContractType ]				= useState<string>("");

	const [ providers, setProviders ]					= useState<Provider[]>([]);
	const [ provider, setProvider ]						= useState<Provider | null>(null);

	const [ realizationStatuss, setRealizationStatuss ]	= useState<RealizationStatus[]>([]);
	const [ realizationStatus, setRealizationStatus ]	= useState<string>("");

	const [ contractPhases, setContractPhases ]			= useState<ContractPhase[]>([]);
	const [ contractPhase, setContractPhase ]			= useState<string>("");

	const [ contractSteps, setContractSteps ]			= useState<ContractStep[]>([]);
	const [ contractStep, setContractStep ]				= useState<string>("");

	const [ approvalStatuss, setApprovalStatuss ]		= useState<ApprovalStatus[]>([]);
	const [ approvalStatus, setApprovalStatus ]			= useState<string>("");

	const [ currencies, setCurrencies ]					= useState<Currency[]>([]);
	const [ currency, setCurrency ]						= useState<string>("");

	const [ consultations, setConsultations ]			= useState<Consultation[]>([]);
	const [ consultation, setConsultation ]				= useState<Consultation | null>(null);

	let years : string []			= [];
	for (let i = 2010; i < 2031; i++) years.push(""+i); 

	const [ contract, setContract ]	= useState<Contract>({
		internalId              : "",
		contractYear            : "",
		reference            	: "",
		designationAr           : "",
		designationEn           : "",
		designationFr           : "",
		amount         			: 0.00,
		transferableAmount	    : 0.00,
		startDate               : dayjs(),
		approvalReference       : "",
		approvalDate            : dayjs(),
		notifyDate              : dayjs(),
		contractDuration        : 0,
		observation             : "",
		_links          		: {
			contract            	:{
				href                    : ""
			},
			self                    :{
				href                    : ""
			},
			contractType            :{
				href                    : ""
			},
			provider       			:{
				href                    : ""
			},
			realizationStatus       :{
				href                    : ""
			},
			contractStep       		:{
				href                    : ""
			},
			approvalStatus          :{
				href                    : ""
			},
			currency     			:{
				href                    : ""
			},
			consultation            :{
				href                    : ""
			},
			documents               :{
				href                    : ""
			},
			referencedMails         :{
				href                    : ""
			},
			budgetItems             :{
				href                    : ""
			}
		}
	});

	const filterConsultationBy = (e : any) =>{
		getBasedUrl("consultation/search/filterBy?filter=" + e.target.value).then((consultations) => {
			setConsultations(consultations.data._embedded.consultation);
		})
	}

	const filterProviderBy = (e : any) =>{
		getBasedUrl("provider/search/filterBy?filter=" + e.target.value).then((providers) => {
			setProviders(providers.data._embedded.provider);
		})
	}

	const fetchData = ()=>{

		getUrl(formatURL(location.state.modelId)).then((contract : any) => {
			setContract({
				internalId              : contract.data.internalId,
				contractYear        	: contract.data.contractYear,
				reference        		: contract.data.reference,
				designationAr           : contract.data.designationAr,
				designationEn           : contract.data.designationEn,
				designationFr           : contract.data.designationFr,
				amount         			: contract.data.amount,
				transferableAmount    	: contract.data.transferableAmount,
				startDate               : contract.data.startDate,
				approvalReference       : contract.data.approvalReference,
				approvalDate            : contract.data.approvalDate,
				notifyDate             	: contract.data.notifyDate,
				contractDuration        : contract.data.contractDuration,
				observation             : contract.data.observation,
				_links          		: {
					contract       			:{
						href            		: contract.data._links.contract.href
					},
					self            		:{
						href            		: contract.data._links.self.href
					},
					contractType            :{
						href                    : contract.data._links.contractType.href
					},
					provider       			:{
						href                    : contract.data._links.provider.href
					},
					realizationStatus       :{
						href                    : contract.data._links.realizationStatus.href
					},
					contractStep        	:{
						href                    : contract.data._links.contractStep.href
					},
					approvalStatus          :{
						href                    : contract.data._links.approvalStatus.href
					},
					currency                :{
						href                    : contract.data._links.currency.href
					},
					consultation            :{
						href                    : contract.data._links.consultation.href
					},
					documents               :{
						href                    : contract.data._links.documents.href
					},
					referencedMails         :{
						href                    : contract.data._links.referencedMails.href
					},
					budgetItems             :{
						href                    : contract.data._links.budgetGoals.href
					}
				}
			})
			
			getUrl(formatURL(contract.data._links.contractType.href)).then((contractType) => {
				setContractType(contractType.data._links.self.href);
			}).catch(e => {});
			
			getUrl(formatURL(contract.data._links.provider.href)).then((provider) => {
				setProvider(provider.data);
			}).catch(e => {});
			
			getUrl(formatURL(contract.data._links.realizationStatus.href)).then((realizationStatus) => {
				setRealizationStatus(realizationStatus.data._links.self.href);
			}).catch(e => {});
			
			getUrl(formatURL(contract.data._links.contractStep.href)).then((contractStep) => {
				getUrl(formatURL(contract.data._links.contractPhase.href)).then((contractPhase) => {
					setContractPhase(contractPhase.data._links.self.href);
					getUrl(contractPhase.data._links.contractSteps.href).then((contractSteps) => {
						setContractSteps(contractSteps.data._embedded.contractStep);
						setContractStep(contractStep.data._links.self.href);
					})
				})
				
			}).catch(e => {});

			getUrl(formatURL(contract.data._links.approvalStatus.href)).then((approvalStatus) => {
				setApprovalStatus(approvalStatus.data._links.self.href);
			}).catch(e => {});
			
			getUrl(formatURL(contract.data._links.currency.href)).then((currency) => {
				setCurrency(currency.data._links.self.href);
			}).catch(e => {});
			
			getUrl(formatURL(contract.data._links.consultation.href)).then((consultation) => {
				setConsultation(consultation.data);
			}).catch(e => {});
		});
	}

	const patchData = ()=>{
		let data = {
			internalId              : contract.internalId,
			contractYear        	: contract.contractYear,
			referenc        		: contract.reference,
			designationAr           : contract.designationAr,
			designationEn           : contract.designationEn,
			designationFr           : contract.designationFr,
			amount         			: contract.amount,
			transferableAmount     	: contract.transferableAmount,
			startDate               : contract.startDate,
			approvalReference       : contract.approvalReference,
			approvalDate            : contract.approvalDate,
			notifyDate             	: contract.notifyDate,
			contractDuration        : contract.contractDuration,
			observation             : contract.observation,
			contractType            : contractType,
			provider       			: provider?._links.self.href,
			realizationStatus       : realizationStatus,
			contractStep        	: contractStep,
			approvalStatus          : approvalStatus,
			currency     			: currency,
			consultation            : consultation?._links.self.href
		};
		if(location.state != null){
			patchUrl(formatURL(location.state.modelId), JSON.stringify({data})).then((contract) => {
				if(contract.data !== undefined){
					setContract(contract.data);
					enqueueSnackbar('Entity created successfully !', {variant: 'success'});
				}
			})
		}else{
			postBasedUrl("provider", JSON.stringify({data})).then((contract) => {
				if(contract.data !== undefined){
					setContract(contract.data);
					enqueueSnackbar('Entity created successfully !', {variant: 'success'});
				}
			})
		}
	}

	useEffect(() => {
		if(contractPhase !== ""){
			getUrl(contractPhase).then((contractPhase) => {
				setContractSteps([])
				getUrl(contractPhase.data._links.contractSteps.href).then((contractSteps) => {
					setContractSteps(contractSteps.data._embedded.contractStep);
				});
			});
		}
	}, [contractPhase]);

	useEffect(() => {

		getBasedUrl("contractType").then((contractTypes) => {
			setContractTypes(contractTypes.data._embedded.contractType);
		});

		getBasedUrl("realizationStatus").then((realizationStatuss) => {
			setRealizationStatuss(realizationStatuss.data._embedded.realizationStatus);
		});

		getBasedUrl("approvalStatus").then((approvalStatuss) => {
			setApprovalStatuss(approvalStatuss.data._embedded.approvalStatus);
		});

		getBasedUrl("currency").then((currencies) => {
			setCurrencies(currencies.data._embedded.currency);
		});

		getBasedUrl("contractPhase").then((contractPhases) => {
			setContractPhases(contractPhases.data._embedded.contractPhase);
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
						Contract Details
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
				<Grid container spacing={1} direction={"row"}>	
					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={contract.internalId}
								onChange={ (e) => setContract(contract => ({...contract, internalId: e.target.value})) }
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
							<InputLabel id="ContractYear">Contract Year</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="contractYear"
								id="contractYear"
								variant="outlined"
								value={contract.contractYear}
								label="Project Year"
								
								onChange={(e) => setContract(contract => ({...contract, contractYear: e.target.value})) }
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
								value={contract.startDate} 
								onChange={ changedDate=>setContract(contract => ({...contract, startDate:changedDate})) }
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}></Grid>

					<Grid item xs={6} sm={6}>
						<Autocomplete
							id="consultation"
							fullWidth
							size="small"
							options={consultations}
							value={consultation}
							onChange={(e, value) => setConsultation(value)}
							getOptionLabel={(consultation) => consultation.designationFr}
							isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
							renderInput={(params) => <TextField {...params} label="Consultation" onChange={debounce(filterConsultationBy, 200)}/>}
						/>
					</Grid>
					<Grid item xs={6} sm={6}></Grid>

					<Grid item xs={6} sm={6}>
						<Autocomplete
							id="provider"
							fullWidth
							size="small"
							options={providers}
							value={provider}
							onChange={(e, value) => setProvider(value)}
							getOptionLabel={(provider) => provider.designationLt}
							isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
							renderInput={(params) => <TextField {...params} label="Provider" onChange={debounce(filterProviderBy, 200)}/>}
						/>
					</Grid>
					<Grid item xs={6} sm={6}></Grid>

					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="contractTypeLabel">Contract Type</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="contractTypeLabel"
								id="contractType"
								variant="outlined"
								value={contractType}
								label="Contract Type"
								
								onChange={(e) => setContractType(e.target.value)}
							>
								{
									contractTypes.length > 0 && contractTypes.map(contractType => {
										return(
											<MenuItem key={contractType._links.self.href} value={contractType._links.contractType.href}>{contractType.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={contract.amount}
								onChange={ (e) => setContract(contract => ({...contract, amount: Number(e.target.value)})) }
								size="small"
								id="amount"
								name="amount"
								label="Amount"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly,
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={contract.transferableAmount}
								onChange={ (e) => setContract(contract => ({...contract, transferableAmount: Number(e.target.value)})) }
								size="small"
								id="transferableAmount"
								name="transferableAmount"
								label="Transferable Amount"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly,
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="currencyLabel">Currency</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="currencyLabel"
								id="currency"
								variant="outlined"
								value={currency}
								label="Currency"
								
								onChange={(e) => setCurrency(e.target.value)}
							>
								{
									currencies.length > 0 && currencies.map(currency => {
										return(
											<MenuItem key={currency._links.self.href} value={currency._links.currency.href}>{currency.codeLt}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={12}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={contract.designationAr}
								onChange={ (e) => setContract(contract => ({...contract, designationAr: e.target.value})) }
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
								value={contract.designationEn}
								onChange={ (e) => setContract(contract => ({...contract, designationEn: e.target.value})) }
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
								value={contract.designationFr}
								onChange={ (e) => setContract(contract => ({...contract, designationFr: e.target.value})) }
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
								value={contract.observation}
								onChange={ (e) => setContract(contract => ({...contract, observation: e.target.value})) }
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

					<Grid item xs={6} sm={6}>
						<FormControl fullWidth size="small" >
							<InputLabel id="realizationStatusLabel">Realization Status</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="realizationStatusLabel"
								id="realizationStatus"
								variant="outlined"
								value={realizationStatus}
								label="Realization Status"
								
								onChange={(e) => setRealizationStatus(e.target.value)}
							>
								{
									realizationStatuss.length > 0 && realizationStatuss.map(realizationStatus => {
										return(
											<MenuItem key={realizationStatus._links.self.href} value={realizationStatus._links.realizationStatus.href}>{realizationStatus.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="contractPhaseLabel">Contract Phase</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="contractPhaseLabel"
								id="contractPhase"
								variant="outlined"
								value={contractPhase}
								label="Contract Phase"
								
								onChange={(e) => setContractPhase(e.target.value)}
							>
								{
									contractPhases.length > 0 && contractPhases.map(contractPhase => {
										return(
											<MenuItem key={contractPhase._links.self.href} value={contractPhase._links.contractPhase.href}>{contractPhase.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="contractStepLabel">Contract Step</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="contractStepLabel"
								id="contractStep"
								variant="outlined"
								value={contractStep}
								label="Contract Step"
								
								onChange={(e) => setContractStep(e.target.value)}
							>
								{
									contractSteps.length > 0 && contractSteps.map(contractStep => {
										return(
											<MenuItem key={contractStep._links.self.href} value={contractStep._links.contractStep.href}>{contractStep.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="approvalStatusLabel">Approval Status</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="approvalStatusLabel"
								id="approvalStatus"
								variant="outlined"
								value={approvalStatus}
								label="Approval Status"
								
								onChange={(e) => setContractStep(e.target.value)}
							>
								{
									approvalStatuss.length > 0 && approvalStatuss.map(approvalStatus => {
										return(
											<MenuItem key={approvalStatus._links.self.href} value={approvalStatus._links.approvalStatus.href}>{approvalStatus.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} sm={6}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={contract.approvalReference}
								onChange={ (e) => setContract(contract => ({...contract, approvalReference: e.target.value})) }
								size="small"
								id="approvalReference"
								name="approvalReference"
								label="Approval Reference"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly,
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<DatePicker 
								format="DD/MM/YYYY" 
								label="Approval Date" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={contract.approvalDate} 
								onChange={ changedDate=>setContract(contract => ({...contract, approvalDate:changedDate})) }
							/>
						</FormControl>
					</Grid>

					<Grid item xs={3} sm={3}></Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={contract.reference}
								onChange={ (e) => setContract(contract => ({...contract, reference: e.target.value})) }
								size="small"
								id="reference"
								name="reference"
								label="Reference"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly,
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<DatePicker 
								format="DD/MM/YYYY" 
								label="Notification Date" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={contract.notifyDate} 
								onChange={ changedDate=>setContract(contract => ({...contract, notifyDate:changedDate})) }
							/>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={contract.contractDuration}
								onChange={ (e) => setContract(contract => ({...contract, contractDuration: Number(e.target.value)})) }
								size="small"
								id="contractDuration"
								name="contractDuration"
								label="Contract Duration"
								autoComplete="off"
								variant="outlined"
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
export default ContractDetails;

