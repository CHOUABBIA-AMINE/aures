import "../../../../../picture.css"

import dayjs 					from "dayjs";
import { useSnackbar } 			from "notistack";

import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useNavigate } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Tooltip } 				from "@mui/material";
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

import { AttachEmailOutlined} 	from "@mui/icons-material";
import { FireTruckOutlined } 	from "@mui/icons-material";
import { FolderCopyOutlined } 	from "@mui/icons-material";
import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";
import { ViewHeadlineOutlined} 	from "@mui/icons-material";

import { NumericFormat } 		from 'react-number-format';

import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";

import { useHTTP } 				from "../../../../../api/request";
import { formatURL } 			from "../../../../../api/tools";

import { BudgetType } 			from "../../../../../model/financial/budget.type";
import { Consultation } 		from "../../../../../model/realization/consultation/consultation";
import { RealizationNature } 	from "../../../../../model/realization/realization.nature";
import { AwardMethod } 			from "../../../../../model/realization/consultation/award.method";
import { RealizationStatus } 	from "../../../../../model/realization/realization.status";
import { ApprovalStatus } 		from "../../../../../model/realization/approval.status";
import { RealizationDirector } 	from "../../../../../model/realization/realization.director";
import { ConsultationStep } 	from "../../../../../model/realization/consultation/consultation.step";
import { ConsultationPhase } 	from "../../../../../model/realization/consultation/consultation.phase";

const ConsultationDetails = (props : any) => {

	const { getUrl, getBasedUrl, patchUrl, postBasedUrl } = useHTTP();

	const location 					= useLocation();
	const params 					= useParams();
	const { enqueueSnackbar } 		= useSnackbar();

	let readOnly 					= params.action === 'edit' ? false : true;
    const navigate          		= useNavigate();

	const [ awardMethods, setAwardMethods ]				= useState<AwardMethod[]>([]);
	const [ awardMethod, setAwardMethod ]				= useState<string>("");

	const [ realizationNatures, setRealizationNatures ]	= useState<RealizationNature[]>([]);
	const [ realizationNature, setRealizationNature ]	= useState<string>("");

	const [ budgetTypes, setBudgetTypes ]				= useState<BudgetType[]>([]);
	const [ budgetType, setBudgetType ]					= useState<string>("");

	const [ realizationStatuss, setRealizationStatuss ]	= useState<RealizationStatus[]>([]);
	const [ realizationStatus, setRealizationStatus ]	= useState<string>("");

	const [ approvalStatuss, setApprovalStatuss ]		= useState<ApprovalStatus[]>([]);
	const [ approvalStatus, setApprovalStatus ]			= useState<string>("");

	const [ realizationDirectors, setRealizationDirectors ]	= useState<RealizationDirector[]>([]);
	const [ realizationDirector, setRealizationDirector ]	= useState<string>("");

	const [ consultationPhases, setConsultationPhases ]	= useState<ConsultationPhase[]>([]);
	const [ consultationPhase, setConsultationPhase ]	= useState<string>("");

	const [ consultationSteps, setConsultationSteps ]	= useState<ConsultationStep[]>([]);
	const [ consultationStep, setConsultationStep ]		= useState<string>("");
	const [ consultation_Step, setConsultation_Step ]	= useState<string>("");

	let years : string []			= [];
	for (let i = 2010; i < 2031; i++) years.push(""+i); 

	const [ consultation, setConsultation ]	= useState<Consultation>({
		internalId              : "",
		consultationYear        : "",
		reference               : "",
		designationAr           : "",
		designationEn           : "",
		designationFr           : "",
		allocatedAmount         : 0.00,
		financialEstimation     : 0.00,
		startDate               : dayjs(),
		approvalReference       : "",
		approvalDate            : dayjs(),
		publishDate             : dayjs(),
		deadline                : dayjs(),
		observation             : "",
		_links          		: {
			consultation            :{
				href                    : ""
			},
			self                    :{
				href                    : ""
			},
			awardMethod             :{
				href                    : ""
			},
			realizationNature       :{
				href                    : ""
			},
			budgetType              :{
				href                    : ""
			},
			realizationStatus       :{
				href                    : ""
			},
			approvalStatus          :{
				href                    : ""
			},
			realizationDirector     :{
				href                    : ""
			},
			consultationStep        :{
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
			},
			submissions             :{
				href                    : ""
			}
		}
	});

	const fetchData = ()=>{
		if(location.state !== null && location.state.modelId !== null){
			getUrl(formatURL(location.state.modelId)).then((consultation : any) => {
				setConsultation({
					internalId              : consultation.data.internalId,
					consultationYear        : consultation.data.consultationYear,
					reference               : consultation.data.reference,
					designationAr           : consultation.data.designationAr,
					designationEn           : consultation.data.designationEn,
					designationFr           : consultation.data.designationFr,
					allocatedAmount         : consultation.data.allocatedAmount,
					financialEstimation     : consultation.data.financialEstimation,
					startDate               : consultation.data.startDate !== null ? dayjs(consultation.data.startDate) : dayjs(),
					approvalReference       : consultation.data.approvalReference,
					approvalDate            : consultation.data.approvalDate !== null ? dayjs(consultation.data.approvalDate) : dayjs(),
					publishDate             : consultation.data.publishDate !== null ? dayjs(consultation.data.publishDate) : dayjs(),
					deadline                : consultation.data.deadline !== null ? dayjs(consultation.data.deadline) : dayjs(),
					observation             : consultation.data.observation,
					_links          		: {
						consultation       		:{
							href            		: consultation.data._links.consultation.href
						},
						self            		:{
							href            		: consultation.data._links.self.href
						},
						awardMethod             :{
							href                    : consultation.data._links.awardMethod.href
						},
						realizationNature       :{
							href                    : consultation.data._links.realizationNature.href
						},
						budgetType              :{
							href                    : consultation.data._links.budgetType.href
						},
						realizationStatus       :{
							href                    : consultation.data._links.realizationStatus.href
						},
						approvalStatus          :{
							href                    : consultation.data._links.approvalStatus.href
						},
						realizationDirector     :{
							href                    : consultation.data._links.realizationDirector.href
						},
						consultationStep        :{
							href                    : consultation.data._links.consultationStep.href
						},
						documents               :{
							href                    : consultation.data._links.documents.href
						},
						referencedMails         :{
							href                    : consultation.data._links.referencedMails.href
						},
						budgetItems             :{
							href                    : consultation.data._links.budgetItems.href
						},
						submissions             :{
							href                    : consultation.data._links.submissions.href
						}
					}
				})

				getUrl(formatURL(consultation.data._links.awardMethod.href)).then((awardMethod) => {
					setAwardMethod(awardMethod.data._links.self.href);
				}).catch(e => {});
				
				getUrl(formatURL(consultation.data._links.realizationNature.href)).then((realizationNature) => {
					setRealizationNature(realizationNature.data._links.self.href);
				}).catch(e => {});
				
				getUrl(formatURL(consultation.data._links.budgetType.href)).then((budgetType) => {
					setBudgetType(budgetType.data._links.self.href);
				}).catch(e => {});
				
				getUrl(formatURL(consultation.data._links.realizationStatus.href)).then((realizationStatus) => {
					setRealizationStatus(realizationStatus.data._links.self.href);
				}).catch(e => {});
				
				getUrl(formatURL(consultation.data._links.approvalStatus.href)).then((approvalStatus) => {
					setApprovalStatus(approvalStatus.data._links.self.href);
				}).catch(e => {});
				
				getUrl(formatURL(consultation.data._links.realizationDirector.href)).then((realizationDirector) => {
					setRealizationDirector(realizationDirector.data._links.self.href);
				}).catch(e => {});
				
				getUrl(formatURL(consultation.data._links.consultationStep.href)).then((consultationStep) => {
					getUrl(formatURL(consultationStep.data._links.consultationPhase.href)).then((consultationPhase) => {
						setConsultationPhase(consultationPhase.data._links.self.href);
						//getUrl(consultationPhase.data._links.consultationSteps.href).then((consultationSteps) => {
							//setConsultationSteps(consultationSteps.data._embedded.consultationStep);
							setConsultation_Step(consultationStep.data._links.self.href);
						//})
					})
				}).catch(e => {});
				
			});
		}
	}

	const patchData = ()=>{
		if(location.state != null){
			
			patchUrl(formatURL(location.state.modelId), JSON.stringify({
				internalId              : consultation.internalId,
				consultationYear        : consultation.consultationYear,
				reference               : consultation.reference,
				designationAr           : consultation.designationAr,
				designationEn           : consultation.designationEn,
				designationFr           : consultation.designationFr,
				allocatedAmount         : consultation.allocatedAmount,
				financialEstimation     : consultation.financialEstimation,
				startDate               : consultation.startDate !== null ? dayjs(consultation.startDate) : dayjs(),
				approvalReference       : consultation.approvalReference,
				approvalDate            : consultation.approvalDate !== null ? dayjs(consultation.approvalDate) : dayjs(),
				publishDate             : consultation.publishDate !== null ? dayjs(consultation.publishDate) : dayjs(),
				deadline                : consultation.deadline !== null ? dayjs(consultation.deadline) : dayjs(),
				observation             : consultation.observation,
				awardMethod             : awardMethod,
				realizationNature       : realizationNature,
				budgetType              : budgetType,
				realizationStatus       : realizationStatus,
				approvalStatus          : approvalStatus,
				realizationDirector     : realizationDirector,
				consultationStep        : consultationStep
			})).then((consultation) => {
				if(consultation.data !== undefined){
					setConsultation(consultation.data);
					enqueueSnackbar('Entity created successfully !', {variant: 'success'});
				}
			})
		}else{
			postBasedUrl("consultation", JSON.stringify({
				internalId              : consultation.internalId,
				consultationYear        : consultation.consultationYear,
				reference               : consultation.reference,
				designationAr           : consultation.designationAr,
				designationEn           : consultation.designationEn,
				designationFr           : consultation.designationFr,
				allocatedAmount         : consultation.allocatedAmount,
				financialEstimation     : consultation.financialEstimation,
				startDate               : consultation.startDate !== null ? dayjs(consultation.startDate) : dayjs(),
				approvalReference       : consultation.approvalReference,
				approvalDate            : consultation.approvalDate !== null ? dayjs(consultation.approvalDate) : dayjs(),
				publishDate             : consultation.publishDate !== null ? dayjs(consultation.publishDate) : dayjs(),
				deadline                : consultation.deadline !== null ? dayjs(consultation.deadline) : dayjs(),
				observation             : consultation.observation,
				awardMethod             : awardMethod,
				realizationNature       : realizationNature,
				budgetType              : budgetType,
				realizationStatus       : realizationStatus,
				approvalStatus          : approvalStatus,
				realizationDirector     : realizationDirector,
				consultationStep        : consultationStep
			})).then((consultation) => {
				if(consultation.data !== undefined){
					setConsultation(consultation.data);
					enqueueSnackbar('Entity created successfully !', {variant: 'success'});
				}
			})
		}
	}

	useEffect(() => {
		if(consultationPhase !== ""){
			getUrl(consultationPhase).then((consultationPhase) => {
				setConsultationSteps([])
				getUrl(consultationPhase.data._links.consultationSteps.href).then((consultationSteps) => {
					setConsultationSteps(consultationSteps.data._embedded.consultationStep);
				});
			});
		}
	}, [consultationPhase]);

	useEffect(() => {
		if(consultation_Step !== "")setConsultationStep(consultation_Step);
	}, [consultationSteps]);

	
	useEffect(() => {
		setConsultation_Step("");
	}, [consultationStep]);

	useEffect(() => {

		getBasedUrl("awardMethod").then((awardMethods) => {
			setAwardMethods(awardMethods.data._embedded.awardMethod);
		});

		getBasedUrl("realizationNature").then((realizationNatures) => {
			setRealizationNatures(realizationNatures.data._embedded.realizationNature);
		});

		getBasedUrl("budgetType").then((budgetTypes) => {
			setBudgetTypes(budgetTypes.data._embedded.budgetType);
		});

		getBasedUrl("realizationStatus").then((realizationStatuss) => {
			setRealizationStatuss(realizationStatuss.data._embedded.realizationStatus);
		});

		getBasedUrl("approvalStatus").then((approvalStatuss) => {
			setApprovalStatuss(approvalStatuss.data._embedded.approvalStatus);
		});

		getBasedUrl("realizationDirector").then((realizationDirectors) => {
			setRealizationDirectors(realizationDirectors.data._embedded.realizationDirector);
		});

		getBasedUrl("consultationPhase").then((consultationPhases) => {
			setConsultationPhases(consultationPhases.data._embedded.consultationPhase);
		});

		if(location.state !== null){
			fetchData();
		}
    },[])

	return (
		<Container maxWidth="lg">
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h5" >
						Consultation Details
					</Typography>
					<Box>
						<Tooltip title="Documents" arrow>
							<Button color="secondary" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => navigate("/consultation/documents", {state:consultation})}>
								<FolderCopyOutlined />
							</Button>
						</Tooltip>
						<Tooltip title="Submissions" arrow>
							<Button color="error" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => navigate("/consultation/submissions/edit", {state:consultation})}>
								<FireTruckOutlined />
							</Button>
						</Tooltip>
						<Tooltip title="Envois" arrow>
							<Button color="warning" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => navigate("/consultation/references/edit", {state:consultation})}>
								<AttachEmailOutlined />
							</Button>
						</Tooltip>
						<Tooltip title="Imputations" arrow>
							<Button color="info" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => navigate("/consultation/budgetItems/edit", {state:consultation})}>
								<ViewHeadlineOutlined />
							</Button>
						</Tooltip>
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
				<Grid container spacing={1} direction={"row"}>

					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={consultation.internalId}
								onChange={ (e) => setConsultation(consultation => ({...consultation, internalId: e.target.value})) }
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
							<InputLabel id="consultationYear">Consultation Year</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="consultationYear"
								id="consultationYear"
								variant="outlined"
								value={consultation.consultationYear}
								label="Consultation Year"
								
								onChange={(e) => setConsultation(consultation => ({...consultation, consultationYear: e.target.value})) }
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
								value={consultation.startDate} 
								onChange={ changedDate=>setConsultation(consultation => ({...consultation, startDate:changedDate})) }
							/>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="realizationNatureLabel">Realization Nature</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="realizationNatureLabel"
								id="realizationNature"
								variant="outlined"
								value={realizationNature}
								label="Realization Nature"
								
								onChange={(e) => setRealizationNature(e.target.value)}
							>
								{
									realizationNatures.length > 0 && realizationNatures.map(realizationNature => {
										return(
											<MenuItem key={realizationNature._links.self.href} value={realizationNature._links.realizationNature.href}>{realizationNature.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="realizationDirectorLabel">Realization Director</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="realizationDirectorLabel"
								id="realizationDirector"
								variant="outlined"
								value={realizationDirector}
								label="Realization Director"
								
								onChange={(e) => setRealizationDirector(e.target.value)}
							>
								{
									realizationDirectors.length > 0 && realizationDirectors.map(realizationDirector => {
										return(
											<MenuItem key={realizationDirector._links.self.href} value={realizationDirector._links.realizationDirector.href}>{realizationDirector.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="awardMethodLabel">Award Method</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="awardMethodLabel"
								id="awardMethod"
								variant="outlined"
								value={awardMethod}
								label="Award Method"
								
								onChange={(e) => setAwardMethod(e.target.value)}
							>
								{
									awardMethods.length > 0 && awardMethods.map(awardMethod => {
										return(
											<MenuItem key={awardMethod._links.self.href} value={awardMethod._links.awardMethod.href}>{awardMethod.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
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
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<NumericFormat 
								required
								fullWidth
								thousandSeparator="."
								decimalSeparator=","
								decimalScale={2}
								fixedDecimalScale
								customInput={TextField} 
								value={consultation.allocatedAmount}
								onValueChange={ (e) => setConsultation(consultation => ({...consultation, allocatedAmount: Number(e.floatValue)})) }
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
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<NumericFormat 
								required
								fullWidth
								thousandSeparator="."
								decimalSeparator=","
								decimalScale={2}
								fixedDecimalScale
								customInput={TextField} 
								value={consultation.financialEstimation}
								onValueChange={ (e) => setConsultation(consultation => ({...consultation, financialEstimation: Number(e.floatValue)})) }
								size="small"
								id="financialEstimation"
								name="financialEstimation"
								label="Financial Estimation"
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
								value={consultation.designationAr}
								onChange={ (e) => setConsultation(consultation => ({...consultation, designationAr: e.target.value})) }
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
								value={consultation.designationEn}
								onChange={ (e) => setConsultation(consultation => ({...consultation, designationEn: e.target.value})) }
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
								value={consultation.designationFr}
								onChange={ (e) => setConsultation(consultation => ({...consultation, designationFr: e.target.value})) }
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
								value={consultation.observation}
								onChange={ (e) => setConsultation(consultation => ({...consultation, observation: e.target.value})) }
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
							<InputLabel id="consultationPhaseLabel">Consultation Phase</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="consultationPhaseLabel"
								id="consultationPhase"
								variant="outlined"
								value={consultationPhase}
								label="Consultation Phase"
								
								onChange={(e) => setConsultationPhase(e.target.value)}
							>
								{
									consultationPhases.length > 0 && consultationPhases.map(consultationPhase => {
										return(
											<MenuItem key={consultationPhase._links.self.href} value={consultationPhase._links.consultationPhase.href}>{consultationPhase.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small" >
							<InputLabel id="consultationStepLabel">Consultation Step</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="consultationStepLabel"
								id="consultationStep"
								variant="outlined"
								value={consultationStep}
								label="Consultation Step"
								
								onChange={(e) => setConsultationStep(e.target.value)}
							>
								{
									consultationSteps.length > 0 && consultationSteps.map(consultationStep => {
										return(
											<MenuItem key={consultationStep._links.self.href} value={consultationStep._links.consultationStep.href}>{consultationStep.designationFr}</MenuItem>
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
								
								onChange={(e) => setConsultationStep(e.target.value)}
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
								value={consultation.approvalReference}
								onChange={ (e) => setConsultation(consultation => ({...consultation, approvalReference: e.target.value})) }
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
								value={consultation.approvalDate} 
								onChange={ changedDate=>setConsultation(consultation => ({...consultation, approvalDate:changedDate})) }
							/>
						</FormControl>
					</Grid>

					<Grid item xs={6} sm={6}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={consultation.reference}
								onChange={ (e) => setConsultation(consultation => ({...consultation, reference: e.target.value})) }
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
								label="Publication Date" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={consultation.publishDate} 
								onChange={ changedDate=>setConsultation(consultation => ({...consultation, publishDate:changedDate})) }
							/>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3}>
						<FormControl fullWidth size="small">
							<DatePicker 
								format="DD/MM/YYYY" 
								label="Deadline" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={consultation.deadline} 
								onChange={ changedDate=>setConsultation(consultation => ({...consultation, deadline:changedDate})) }
							/>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
export default ConsultationDetails;

