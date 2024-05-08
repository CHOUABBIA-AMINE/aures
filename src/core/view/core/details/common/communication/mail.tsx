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

import { AttachEmail, PictureAsPdfOutlined } from "@mui/icons-material";
import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";
import { Visibility } 			from "@mui/icons-material";

import { formatURL } 			from "../../../../../api/tools";
import { useHTTP } 				from "../../../../../api/request";
import { Structure } 			from "../../../../../model/common/administration/structure";
import { Mail } 				from "../../../../../model/common/communication/mail";
import { MailType } 			from "../../../../../model/common/communication/mail.type";
import { MailNature } 			from "../../../../../model/common/communication/mail.nature";
import { PDFViewer }            from "../../../../public/pdf.viewer";

const MailDetails = (props : any) => {

	const { getUrl, getBasedUrl, patchUrl, postBasedUrl, uploadFile, getFile, deleteUrl} = useHTTP();

	const location 							= useLocation();
	const params 							= useParams();
	const { enqueueSnackbar } 				= useSnackbar();
	const navigate          				= useNavigate();

	let readOnly 							= params.action === 'view' ? true : false;

	const [ mailTypes, setMailTypes ]		= useState<MailType[]>([]);
	const [ mailType, setMailType ]			= useState<string>("");

	const [ mailNatures, setMailNatures ]	= useState<MailNature[]>([]);
	const [ mailNature, setMailNature ]		= useState<string>("");

	const [ structures, setStructures ]		= useState<Structure[]>([]);
	const [ structure, setStructure ]		= useState<Structure | null>(null);

	const [ file, setFile ] 			    = useState(undefined);
	const [ dbFile, setDBFile ] 			= useState(undefined);
    const [ openSD, setOpenSD ]       		= useState(false);

	const [ mail, setMail ]	= useState<Mail>({
		reference   	: "",
		mailDate   		: dayjs(),
		subject       	: "",
		recordNumber   	: "",
		recordDate      : dayjs(),
		_links          : {
			mail       		:{
				href            : ""
			},
			self            :{
				href            : ""
			},
			mailType   		:{
				href            : ""
			},
			mailNature     	:{
				href            : ""
			},
			structure     	:{
				href            : ""
			},
			file     		:{
				href            : ""
			}
		}
	});

	const fetchData = ()=>{
		if(location.state){
			getUrl(formatURL(location.state)).then((response : any) => {
				setMail({
					reference   	: response.data.reference,
					mailDate   		: dayjs(response.data.mailDate),
					subject       	: response.data.subject,
					recordNumber   	: response.data.recordNumber,
					recordDate      : dayjs(response.data.recordDate),
					_links          : {
						mail       		:{
							href            : response.data._links.mail.href
						},
						self            :{
							href            : response.data._links.self.href
						},
						mailType   		:{
							href            : response.data._links.mailType.href
						},
						mailNature     	:{
							href            : response.data._links.mailNature.href
						},
						structure   	:{
							href            : response.data._links.structure.href
						},
						file     		:{
							href            : response.data._links.file.href
						}
					}
				})
				getUrl(formatURL(response.data._links.mailType.href)).then((type) => {
					setMailType(type.data !== undefined ? type.data._links.self.href : "" )
				});
				getUrl(formatURL(response.data._links.mailNature.href)).then((nature) => {
					setMailNature(nature.data !== undefined ? nature.data._links.self.href : "" )
				});
				getUrl(formatURL(response.data._links.structure.href)).then((parent) => {
					setStructure(parent.data !== undefined ? parent.data : null )
				}).catch(()=>{
				});
				getUrl(formatURL(response.data._links.file.href)).then((_dbFile) => {
					setDBFile(_dbFile.data !== undefined ? _dbFile.data._links.file.href : "" )
				}).catch(()=>{
				});
			});
		}else{
			setMail({
				reference   	: "",
				mailDate   		: dayjs(),
				subject       	: "",
				recordNumber   	: "",
				recordDate      : dayjs(),
				_links          : {
					mail       		:{
						href            : ""
					},
					self            :{
						href            : ""
					},
					mailType   		:{
						href            : ""
					},
					mailNature     	:{
						href            : ""
					},
					structure     	:{
						href            : ""
					},
					file     		:{
						href            : ""
					}
				}
			})
			setMailType( "" );
			setMailNature( "" );
			setStructure( null );
		}
	}

	const clickFileUploader = () => {
		document.getElementById("imageSelector")?.click()
	}

	const onSelectFile = (e : any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFile(undefined);
            return;
        }
        setFile(e.target.files[0])
    }

	const filterBy = (e : any) =>{
		getBasedUrl("structure/search/filterBy?filter=" + e.target.value).then((up) => {
			setStructures(up.data._embedded.structure);
		})
	}

	const patchData = ()=>{
		if(location.state !== null){
			if(file === undefined){
				patchUrl(formatURL(location.state), JSON.stringify({
					reference   	: mail.reference,
					mailDate   		: mail.mailDate,
					subject       	: mail.subject,
					recordNumber   	: mail.recordNumber,
					recordDate      : mail.recordDate,
					mailType  		: mailType,
					mailNature		: mailNature,
					structure  		: structure?._links.self.href
				})).then((response) => {
					enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
				})
			}else{
				getUrl(location.state).then(_mail =>{
					getUrl(_mail.data._links.file.href).then(_file =>{
						uploadFile(file).then( __file => {
							patchUrl(formatURL(location.state), JSON.stringify({
								reference   	: mail.reference,
								mailDate   		: mail.mailDate,
								subject       	: mail.subject,
								recordNumber   	: mail.recordNumber,
								recordDate      : mail.recordDate,
								mailType  		: mailType,
								mailNature		: mailNature,
								structure  		: structure?._links.self.href,
								file			: getFile(__file.data.id)
							})).then((response) => {
								deleteUrl(_file.data._links.self.href).then( () =>{
									enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
								})
							})
						})
					})
				})
			}
		}else{
			if(file !== undefined){
				uploadFile(file).then( _file => {
					postBasedUrl("mail", JSON.stringify({
						reference   	: mail.reference,
						mailDate   		: mail.mailDate,
						subject       	: mail.subject,
						recordNumber   	: mail.recordNumber,
						recordDate      : mail.recordDate,
						mailType  		: mailType,
						mailNature		: mailNature,
						structure  		: structure?._links.self.href,
						file			: getFile(_file.data.id)
					})).then((response) => {
						enqueueSnackbar('Entity updated successfully!', {variant: 'success'});
					})
				})
			}else{
				enqueueSnackbar('Upload mail pdf format First!', {variant: 'error'});
			}
		}
	}

    const ViewPDF = () => {
		let link : string = dbFile !== undefined? dbFile : file !== undefined ? URL.createObjectURL(file) : "";
        return (
            <Modal
                open={openSD}
                onClose={ e => setOpenSD(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box >
                    <PDFViewer url={ link }/>
                </Box>
            </Modal>
        )
    }

	useEffect(() => {
		getBasedUrl("mailType").then((mailTypes) => {
			setMailTypes(mailTypes.data._embedded.mailType);
		});

		getBasedUrl("mailNature").then((mailNatures) => {
			setMailNatures(mailNatures.data._embedded.mailNature);
		});

		if(location.state !== null){
			fetchData();
		}
    },[])

	return (
		<Container maxWidth="lg">
			<ViewPDF/>
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h6" >
						Mail Details
					</Typography>
					<Box>
						<input type='file' hidden id="imageSelector" onChange={onSelectFile} accept=".pdf"/>
						{ (mail !== undefined ) &&(
							<Tooltip title="Reference" arrow>
								<Button color="info" 	variant="outlined" size="small" sx={{ marginRight:'5px' }}  onClick={e => {navigate("/mail/references/" + params.action, {state:mail}) }}>
									<AttachEmail />
								</Button>
						  	</Tooltip>
						)}
						{ (file !== undefined || dbFile !== undefined) &&(
							<Tooltip title="Display Mail" arrow>
								<Button color="info" 	variant="outlined" size="small" sx={{ marginRight:'5px' }}  onClick={e => {ViewPDF(); setOpenSD(true); }}>
									<Visibility />
								</Button>
						  	</Tooltip>
						)}
						{
							params.action !== 'view' &&
							(
								<>
									<Tooltip title="Select a File" arrow>
										<Button color="error" 	variant="outlined" size="small" sx={{ marginRight:'5px' }}  onClick={clickFileUploader}>
											<PictureAsPdfOutlined />
										</Button>
									</Tooltip>
									<Tooltip title="Save" arrow>
										<Button color="primary" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => patchData()}>
											<Save />
										</Button>
									</Tooltip>
									<Tooltip title="Reset" arrow>
										<Button color="success" variant="outlined" size="small" sx={{ marginRight:'5px' }}  onClick={e => { setFile(undefined); fetchData();}}>
											<Replay />
										</Button>
									</Tooltip>
								</>
							)
						}
						
					</Box>
				</Box>
				<Grid container spacing={1}>
					
					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small" >
							<InputLabel id="mailTypeLabel">Mail Type</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="mailTypeLabel"
								id="mailType"
								variant="outlined"
								value={mailType}
								label="Mail Type"
								
								onChange={(e) => setMailType(e.target.value)}
							>
								{
									mailTypes.length > 0 && mailTypes.map(mailType => {
										return(
											<MenuItem key={mailType._links.self.href} value={mailType._links.self.href}>{mailType.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small" >
							<InputLabel id="mailNatureLabel">Mail Nature</InputLabel>
							<Select
								required
								fullWidth
								size="small"
								labelId="mailNatureLabel"
								id="mailNature"
								variant="outlined"
								value={mailNature}
								label="Mail Nature"
								
								onChange={(e) => setMailNature(e.target.value)}
							>
								{
									mailNatures.length > 0 && mailNatures.map(mailNature => {
										return(
											<MenuItem key={mailNature._links.self.href} value={mailNature._links.self.href}>{mailNature.designationFr}</MenuItem>
										);
									})
								}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={8} sm={8}></Grid>

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
							renderInput={(params) => <TextField {...params} label="Source/Destination" onChange={debounce(filterBy, 200)}/>}
						/>
					</Grid>
					<Grid item xs={6} sm={6}></Grid>

					<Grid item xs={4} sm={4}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={mail.reference}
								onChange={ (e) => setMail(mail => ({...mail, reference: e.target.value})) }
								size="small"
								id="reference"
								name="reference"
								label="Reference"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small">
							<DatePicker 
								format="DD/MM/YYYY" 
								label="Mail Date" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={mail.mailDate} 
								onChange={ changedDate => setMail(mail => ({...mail, mailDate:changedDate})) }
							/>
						</FormControl>
					</Grid>

					<Grid item xs={2} sm={2}></Grid>
					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={mail.recordNumber}
								onChange={ (e) => setMail(mail => ({...mail, recordNumber: e.target.value})) }
								size="small"
								id="recordNumber"
								name="recordNumber"
								label="Record Number"
								autoComplete="off"
								variant="outlined"
								inputProps={{ 
									readOnly: readOnly 
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={2} sm={2}>
						<FormControl fullWidth size="small">
							<DatePicker 
								format="DD/MM/YYYY" 
								label="Record Date" 
								readOnly={readOnly} 
								slotProps={{ textField: { size: 'small', required: true }}} 
								value={mail.recordDate} 
								onChange={ changedDate => setMail(mail => ({...mail, recordDate:changedDate})) }
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={12}>
						<FormControl fullWidth size="small">
							<TextField
								required
								fullWidth
								value={mail.subject}
								onChange={ (e) => setMail(mail => ({...mail, subject: e.target.value})) }
								size="small"
								id="subject"
								name="subject"
								label="Subject"
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
export default MailDetails ;