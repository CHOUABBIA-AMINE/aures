import dayjs                    from "dayjs";
import { useSnackbar } 			from "notistack";

import { useEffect }            from "react";
import { useState }             from "react";
import { useLocation }          from "react-router-dom";
import { useNavigate }          from "react-router-dom";
import { useParams }            from "react-router-dom";

import { Autocomplete, Box, Tooltip, Typography, debounce }                  from "@mui/material";
import { Button }               from "@mui/material";
import { FormControl }          from "@mui/material";
import { Grid }                 from "@mui/material";
import { InputLabel }           from "@mui/material";
import { MenuItem }             from "@mui/material";
import { Modal }                from "@mui/material";
import { Select }               from "@mui/material";
import { TextField }            from "@mui/material";
import { Dialog }               from "@mui/material";
import { DialogActions }        from "@mui/material";
import { DialogContent }        from "@mui/material";
import { DialogContentText }    from "@mui/material";
import { DialogTitle }          from "@mui/material";
import { IconButton }           from "@mui/material";
import { Paper }                from "@mui/material";
import { TableSortLabel }       from "@mui/material";
import { Table }                from "@mui/material";
import { TableBody }            from "@mui/material";
import { TableCell }            from "@mui/material";
import { TableContainer }       from "@mui/material";
import { TableHead }            from "@mui/material";
import { TablePagination }      from "@mui/material";
import { TableRow }             from "@mui/material";

import { PictureAsPdfOutlined, Replay } from "@mui/icons-material";
import {  Save }                from "@mui/icons-material";
import { Visibility }           from "@mui/icons-material";
import { Delete }               from "@mui/icons-material";
import { Edit }                 from "@mui/icons-material";
import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";

import { useHTTP }              from "../../../../../api/request";
import Lists                    from "../../../../../api/list";
import { formatURL }            from "../../../../../api/tools";
import { Doc }                  from "../../../../../model/common/document/document";
import { DocType }              from "../../../../../model/common/document/document.type";
import { PDFViewer }            from "../../../../public/pdf.viewer";
import { Submission }           from "../../../../../model/realization/consultation/submission";
import { Provider }             from "../../../../../model/realization/provider/provider";
import { NumericFormat } from "react-number-format";

function ConsultationSubmissions() {

    const location 				                = useLocation();
    const navigate                              = useNavigate();
	const params 					            = useParams();
	const { enqueueSnackbar } 		            = useSnackbar();

	let readOnly 					            = false; //params.action === 'edit' ? false : true;
    const initialData                           : Submission = {
        submissionDate          : dayjs(),
		financialOffer          : 0,
		_links                  : {
			submission              :{
				href                    : ""
			},
			self                    :{
				href                    : ""
			},
			consultation            :{
				href                    : ""
			},
			tender                  :{
				href                    : ""
			},
			administrativePart      :{
				href                    : ""
			},
			technicalPart           :{
				href                    : ""
			},
			financialPart           :{
				href                    : ""
			}
		}
    };

    const { getUrl }                            = useHTTP();
    const { getBasedUrl }                       = useHTTP();
    const { postBasedUrl }                      = useHTTP();
    const { putUrl }                            = useHTTP();
    const { deleteUrl }                         = useHTTP();
    const { patchUrl }                          = useHTTP();
    const { uploadFile }                        = useHTTP();
    const { getFile }                           = useHTTP();

    const [rowh, setRowH]                       = useState(-1);
    const [order, setOrder]                     = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy]                 = useState(Lists.get("submission")[1].id);
    const [openRD, setOpenRD]                   = useState(false);
    const [openSD, setOpenSD]                   = useState(false);
    const [url, setUrl]                         = useState("");

    const [rows, setRow]                        = useState<any[]>([]);
    const [page, setPage]                       = useState(0);
    const [size, setSize]                       = useState(10);
    const [total, setTotal]                     = useState(0);

    const [ _admin, setAdmin ] 			        = useState(undefined);
    const [ _technical, setTechnical ] 			= useState(undefined);
    const [ _financial, setFinancial ]	        = useState(undefined);
    const [ pdfFile, setPDFFile ] 			    = useState("");
    const [ submission, setSubmission ]         = useState<Submission>(initialData);

    const [ tenders, setTenders ]		        = useState<Provider[]>([]);
	const [ tender, setTender ]		            = useState<Provider | null>(null);
    const [ aFlag, setAFlag ]                   = useState<string | null>("");
    const [ tFlag, setTFlag ]                   = useState<string | null>("");
    const [ fFlag, setFFlag ]                   = useState<string | null>("");

    const decodeId = (id : string, row : any) => {
        let ids : string[] = id.split(".");
        
        switch (ids.length) {
            case 1: return row[id];
            case 2: return row[ids[0]][ids[1]];
            case 3: return row[ids[0]][ids[1]][ids[2]];
            default : return row[id];
        }
    }

    const handlePage = (event : any, newpage : number) => {
        setPage(newpage)
    }

    const handleSize = (event : any) => {
        setSize(event.target.value)
        setPage(0);
    }

    const rowClickHandler = (event : React.MouseEvent<HTMLElement>, entity: any, action:string) => {
        event.preventDefault();
        //navigate("/" + model + "/edit", { state: modelId } );
        console.log(entity);
        entity.issueDate = dayjs(entity.issueDate)
        setSubmission(entity);
    }

    const rowHoverHandler = (event : React.MouseEvent<HTMLElement>, index: number) => {
        event.preventDefault();
        setRowH(index);
    }

    const reset = () => {
        console.log("reset")
        setSubmission(initialData);
        setTenders([]);
        setTender(null);
        setAdmin(undefined);
        setTechnical(undefined);
        setFinancial(undefined);
        setAFlag("");
        setTFlag("");
        setFFlag("");
    }

    const saveSubmission = ()=>{
        postBasedUrl("submission", JSON.stringify({
            submissionDate  : submission.submissionDate,
            financialOffer  : submission.financialOffer,
            consultation    : location.state._links.self.href,
            tender  		: tender?._links.self.href
        })).then(submission =>{
            setSubmission(submission.data);
            let aux = rows;
            aux.push(submission.data);
            putUrl(formatURL(location.state._links.self.href) + "/submissions", aux.map(row => row._links.self.href).join("\n"), "text/uri-list").then(() =>{ 
                console.log(_admin, _technical, _financial)
                _admin !== undefined ? uploadFile(_admin).then(file => setAFlag(getFile(file.data.id))) : setAFlag(null);
                _technical !== undefined ? uploadFile(_technical).then(file => setTFlag(getFile(file.data.id))) : setTFlag(null);
                _financial !== undefined ? uploadFile(_financial).then(file => setFFlag(getFile(file.data.id))) : setFFlag(null);
            })
        });
	}

    const onSelectAdminFile = (e : any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setAdmin(undefined);
            return;
        }
        setAdmin(e.target.files[0])
    }

    const onSelectTechnicalFile = (e : any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setTechnical(undefined);
            return;
        }
        setTechnical(e.target.files[0])
    }

    const onSelectFinancialFile = (e : any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFinancial(undefined);
            return;
        }
        setFinancial(e.target.files[0])
    }

	const clickFileUploader = (selector : string) => {
		document.getElementById(selector)?.click()
	}

    const deleteRow = (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if(url !== ""){
            setPage(0);
            deleteUrl(formatURL(url)).then((response) => {
                setUrl("");
                setTotal(total - 1 );
                setOpenRD(false);
            })
        }else{
            setOpenRD(false);
            setPage(0);
        }
        
    }

    useEffect(() => {

        getUrl(formatURL(location.state._links.self.href) + "/submissions?projection=submissionList").then((response) => {
            let rows : []= response.data._embedded.submission;//.sort((a:any,b:any) => { return a.type > b.type;});;
            setRow(rows);
            setTotal(rows.length);
        })

    },[total])

    useEffect(() => {
        if(submission._links.self.href !== "" && aFlag !== "" && tFlag !== "" && fFlag !== "" ){
            console.log(aFlag, tFlag, fFlag)
            patchUrl(formatURL(submission._links.self.href), JSON.stringify({administrativePart  : aFlag, technicalPart       : tFlag, financialPart       : fFlag})).then(() => {
                reset();
                getUrl(formatURL(location.state._links.self.href) + "/submissions?projection=submissionList").then((response) => {
                    let rows : []= response.data._embedded.submission;//.sort((a:any,b:any) => { return a.type > b.type;});;
                    setRow(rows);
                    setTotal(rows.length);
                });
            });
        }
    },[aFlag, tFlag, fFlag])

    const Actions = (entity : any) =>{
        return(
            <>
                <Tooltip title="Editer" arrow>
                    <IconButton aria-label="edit" color="success" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px'}} onClick={event => rowClickHandler(event, entity.entity,'edit')}>
                        <Edit fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer" arrow>
                    <IconButton aria-label="delete" color="error" size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => {setUrl(entity.entity._links.self.href); setOpenRD(true);}}>
                        <Delete fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </>
        )
    }

    const RemoveDialog = () => {
        return (
            <Dialog
                open={openRD}
                onClose={() => setOpenRD(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to want delete the record.
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={e => deleteRow(e)} color="warning">Confirm</Button>
                <Button onClick={() => setOpenRD(false)} autoFocus>Cancel</Button>
            </DialogActions>
          </Dialog>
        )
    }

    const ViewPDF = () => {
        return (
            <Modal
                open={openSD}
                onClose={ e => setOpenSD(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box >
                    <PDFViewer url={pdfFile}/>
                </Box>
            </Modal>
        )
    }

    const setDocToView = (file : any, item : string) =>{
        if(file !== null){
            getUrl(formatURL(item)).then( file =>{
                setPDFFile(file.data._links.file.href);
                setOpenSD(true);
                //console.log(file.data.path);
            })
        }
    }

    const renderSwitch = (param : string, value : any) => {
        //let USDollar = new Intl.NumberFormat('en-US', {style: 'currency', curr});
        switch(param) {
            case 'date':
                return dayjs(value).format('YYYY-MM-DD');
            case 'money':
                return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'DZD'}).format(value).replace("DZD", ""); //value.toLocaleString(undefined, {maximumFractionDigits:2, maximumFractionDigits:2});
            case 'number':
                return value.toLocaleString(undefined, {maximumFractionDigits:1, minimumFractionDigits:0});//value.toFixed(2);
            default:
                return value;
        }
    }

    const filterBy = (e : any) =>{
		getBasedUrl("provider/search/filterBy?filter=" + e.target.value).then((tender) => {
			setTenders(tender.data._embedded.provider);
		})
	}

    const toParent = () => {
        navigate("/consultation/edit", {state : {modelId : location.state._links.self.href}})
    }

	return (
        
        <div style={{ width: '100%'}}>
            <RemoveDialog />
            <ViewPDF/>
            
            <Paper sx={{ width: 'calc(100% - 40px)', ml: '20px', mt: '10px' }}>
                
                <Box sx={{display : "flex", width : '100%', paddingTop: 5 , paddingBottom: 5 , justifyContent: "space-between"}}>
                    <Grid container spacing={1} direction={"row"}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h5" sx={{color:"#555", cursor: "pointer"}} align="center" onClick={toParent}>
                                Consultation {location.state.reference}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>&nbsp;</Grid>
                        <Grid item xs={4} sm={4}>
                            <Autocomplete
                                sx={{ml: "15px", width: "95%"}}
                                id="tender"
                                size="small"
                                options={tenders}
                                value={tender}
                                onChange={(e, value) => setTender(value)}
                                getOptionLabel={(tender) => tender.designationLt}
                                isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
                                renderInput={(params) => <TextField {...params} label="tender" onChange={debounce(filterBy, 200)}/>}
                            />
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <FormControl fullWidth size="small">
                                <NumericFormat 
                                    required
                                    fullWidth
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    decimalScale={2}
                                    fixedDecimalScale
                                    customInput={TextField} 
                                    value={submission.financialOffer}
                                    onValueChange={ (e) => setSubmission(submission => ({...submission, financialOffer: Number(e.floatValue)})) }
                                    size="small"
                                    id="financialOffer"
                                    name="financialOffer"
                                    label="Financial Offer"
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
                                <DatePicker 
                                    format="DD/MM/YYYY" 
                                    label="Submission Date" 
                                    readOnly={readOnly} 
                                    slotProps={{ textField: { size: 'small', required: true }}} 
                                    value={submission.submissionDate} 
                                    onChange={ changedDate=>setSubmission(submission => ({...submission, submissionDate:changedDate})) }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={2} sx={{display : "flex", justifyContent: "left"}}>
                            <input type='file' hidden id="admin" onChange={onSelectAdminFile} accept=".pdf"/>
                            <input type='file' hidden id="technical" onChange={onSelectTechnicalFile} accept=".pdf"/>
                            <input type='file' hidden id="financial" onChange={onSelectFinancialFile} accept=".pdf"/>
                            <Tooltip title="Uplaoder le dossier administratif" arrow>
                                <Button color="error" variant="outlined" size="large" sx={{ marginRight:'5px', width:'40px'  }} onClick={e => clickFileUploader("admin")}>
                                    <PictureAsPdfOutlined />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Uplaoder l'offre technique" arrow>
                                <Button color="info" variant="outlined" size="large" sx={{ marginRight:'5px', width:'40px'  }} onClick={e => clickFileUploader("technical")}>
                                    <PictureAsPdfOutlined />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Uplaoder l'offre financière" arrow>
                                <Button color="success" variant="outlined" size="large" sx={{ marginRight:'5px', width:'40px' }} onClick={e => clickFileUploader("financial")}>
                                    <PictureAsPdfOutlined />
                                </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={2} sm={2} sx={{display : "flex", justifyContent: "right"}}>
                            <Tooltip title="Sauvegarder" arrow>
                                <Button color="primary" variant="outlined" size="large" sx={{ marginRight:'5px', width:'40px'  }} onClick={saveSubmission}>
                                    <Save />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Réinitialiser" arrow>
                                <Button color="success" variant="outlined" size="small" sx={{ marginRight:'5px' }}  onClick={reset}>
                                    <Replay />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer sx={{maxHeight:'calc(90vh - 128px)', minWidth: '100%', maxWidth: '100%'}}>
                    <Table stickyHeader onMouseLeave={event => rowHoverHandler(event, -1)}>
                        <TableHead onMouseEnter={event => rowHoverHandler(event, -1)}>
                            <TableRow sx={{ cursor:"pointer" }}>
                                {Lists.get("submission").map((column:any) => (
                                    <TableCell  align={ column.align }
                                                width={ column.width }
                                                style={{ backgroundColor: '#555', color: 'white' }} 
                                                key={column.id}
                                    >
                                            {column.name}
                                    </TableCell>
                                ))}
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'60px'}} key={Lists.get("submission").length-3}>A</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'60px'}} key={Lists.get("submission").length-2}>T</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'60px'}} key={Lists.get("submission").length-1}>F</TableCell>
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'100px'}} key={Lists.get("submission").length}>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows
                                .map((row, i) => {
                                    return (
                                        <TableRow 
                                            hover={true} key={i} 
                                            sx={{ cursor:"pointer" }}
                                            onMouseEnter={event => rowHoverHandler(event, i)}
                                        >
                                            {Lists.get("submission") && Lists.get("submission").map((column : any, j:number) => {
                                                let value;
                                                j === 0 ? value = page * size + i+1 : value = decodeId(column.id, row);
                                                return (
                                                    <TableCell align={ column.align } key={j + " - "+ value}>
                                                        { renderSwitch(column.type, value) }
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell align="center" key={(Lists.get("submission").length -3) + " - action"}>
                                                {
                                                    i === rowh ? 
                                                        <Tooltip title="Dossier administratif" arrow>
                                                            <span>
                                                                <IconButton aria-label="display" color="primary" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px' }} onClick={event => {setDocToView(row, row["_links"]["administrativePart"]["href"]);}} disabled={row["administrativePart"]===null}>
                                                                    <Visibility fontSize="medium" />
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    : ""
                                                }
                                            </TableCell>
                                            <TableCell align="center" key={(Lists.get("submission").length -2) + " - action"}>
                                                {
                                                    i === rowh ? 
                                                        <Tooltip title="Offre technique" arrow>
                                                            <span>
                                                                <IconButton aria-label="display" color="primary" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px' }} onClick={event => {setDocToView(row, row["_links"]["technicalPart"]["href"]);}} disabled={row["technicalPart"]===null}>
                                                                    <Visibility fontSize="medium" />
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    : ""
                                                }
                                            </TableCell>
                                            <TableCell align="center" key={(Lists.get("submission").length -1) + " - action"}>
                                                {
                                                    i === rowh ? 
                                                        <Tooltip title="Offre financière" arrow>
                                                            <span>
                                                                <IconButton aria-label="display" color="primary" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px' }} onClick={event => {setDocToView(row, row["_links"]["financialPart"]["href"]);}} disabled={row["financialPart"]===null}>
                                                                    <Visibility fontSize="medium" />
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    : ""
                                                }
                                            </TableCell>
                                            <TableCell align="center" key={Lists.get("submission").length + " - action"}>
                                                {   
                                                    i === rowh ? 
                                                        <Actions entity={row}/> 
                                                    : " "
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    rowsPerPage={size}
                    page={page}
                    count={total}
                    component="div"
                    onPageChange={handlePage}
                    onRowsPerPageChange={handleSize}
                >
                </TablePagination>
            </Paper>

        </div>
    );
}
export default ConsultationSubmissions;