import dayjs                    from "dayjs";
import { useSnackbar } 			from "notistack";

import { useEffect }            from "react";
import { useState }             from "react";
import { useLocation }          from "react-router-dom";
import { useNavigate }          from "react-router-dom";
import { useParams }            from "react-router-dom";

import { DatePicker }           from "@mui/x-date-pickers";

import { Autocomplete }         from "@mui/material";
import { Box }                  from "@mui/material";
import { Button }               from "@mui/material";
import { debounce }             from "@mui/material";
import { Dialog }               from "@mui/material";
import { DialogActions }        from "@mui/material";
import { DialogContent }        from "@mui/material";
import { DialogContentText }    from "@mui/material";
import { DialogTitle }          from "@mui/material";
import { FormControl }          from "@mui/material";
import { Grid }                 from "@mui/material";
import { InputLabel }           from "@mui/material";
import { MenuItem }             from "@mui/material";
import { Modal }                from "@mui/material";
import { Select }               from "@mui/material";
import { TextField }            from "@mui/material";
import { IconButton }           from "@mui/material";
import { Paper }                from "@mui/material";
import { Table }                from "@mui/material";
import { TableBody }            from "@mui/material";
import { TableCell }            from "@mui/material";
import { TableContainer }       from "@mui/material";
import { TableHead }            from "@mui/material";
import { TablePagination }      from "@mui/material";
import { TableRow }             from "@mui/material";
import { Tooltip }              from "@mui/material";
import { Typography }           from "@mui/material";

import { AttachEmail }          from "@mui/icons-material";
import { Save }                 from "@mui/icons-material";
import { Replay }               from "@mui/icons-material";
import { Visibility }           from "@mui/icons-material";
import { Delete }               from "@mui/icons-material";

import { useHTTP }              from "../../../../../api/request";
import Lists                    from "../../../../../api/list";
import { formatURL }            from "../../../../../api/tools";
import { getUrlFromId }         from "../../../../../api/tools";
import { getIdFromUrl }         from "../../../../../api/tools";
import { PDFViewer }            from "../../../../public/pdf.viewer";
import { Mail }                 from "../../../../../model/common/communication/mail";
import { ProviderExclusion }    from "../../../../../model/realization/provider/provider.exclusions";
import { ExclusionType } from "../../../../../model/realization/provider/exclusion.type";

function ProviderExclusions() {

    const location 				                = useLocation();
    const navigate                              = useNavigate();
	const params 					            = useParams();
    let readOnly 					            = params.action === 'edit' ? false : true;

	const { enqueueSnackbar } 		            = useSnackbar();

    const initialData : ProviderExclusion = {
        startDate               : dayjs(),
		endDate                 : dayjs(),
		cause                   : "",
		_links                  : {
			providerExclusion       :{
				href                    : ""
			},
			self                    :{
				href                    : ""
			},
            exclusionType           :{
                href                    : ""
            },
            provider                :{
                href                    : ""
            },
            reference               :{
                href                    : ""
            }
		}
    };

    const { getUrl }                            = useHTTP();
    const { getBasedUrl }                       = useHTTP();
    const { putUrl }                            = useHTTP();
    const { deleteUrl }                         = useHTTP();
    const { postBasedUrl }                      = useHTTP();
    
    const [rowh, setRowH]                       = useState(-1);
    const [openRD, setOpenRD]                   = useState(false);
    const [openSD, setOpenSD]                   = useState(false);
    const [url, setUrl]                         = useState("");

    const [rows, setRow]                        = useState<ProviderExclusion[]>([]);
    const [page, setPage]                       = useState(0);
    const [size, setSize]                       = useState(10);
    const [total, setTotal]                     = useState(0);

    const [ pdfFile, setPDFFile ] 			    = useState("");

    const [ exclusions, setExclusions ]	        = useState<ProviderExclusion[]>([]);
	const [ exclusion, setExclusion ]	        = useState<ProviderExclusion>(initialData);

    const [ references, setReferences ]	        = useState<Mail[]>([]);
	const [ reference, setReference ]	        = useState<Mail | null>(null);

    const [ exclusionTypes, setExclusionTypes ]	= useState<ExclusionType[]>([]);
	const [ exclusionType, setExclusionType ]	= useState<string>("");

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

    const rowHoverHandler = (event : React.MouseEvent<HTMLElement>, index: number) => {
        event.preventDefault();
        setRowH(index);
    }

    const saveExclusion = ()=>{
        
        postBasedUrl("providerExclusion", JSON.stringify({
            startDate               : exclusion.startDate,
		    endDate                 : exclusion.endDate,
		    cause                   : exclusion.cause,
            provider                : location.state._links.self.href,
            exclusionType           : exclusionType,
            reference  		        : reference?._links.self.href
        })).then(() =>{
            getUrl(formatURL(location.state._links.self.href) + "/providerExclusions?projection=providerExclusionList").then((response) => {
                let rows : []= response.data._embedded.providerExclusion;//.sort((a:any,b:any) => { return a.type > b.type;});;
                setRow(rows);
                setTotal(rows.length);
            }).then(() => {
                setExclusion(initialData);
                enqueueSnackbar('Entity created successfully !', {variant: 'success'});
            });
        });
	}

    const deleteRow = (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        /*if(url !== ""){
            setPage(0);
            deleteUrl(formatURL(location.state._links.self.href) + "/providerExclusions/" + getIdFromUrl(formatURL(url))).then((response) => {
                setUrl("");
                setTotal(total - 1 );
                setOpenRD(false);
            })
        }else{
            setOpenRD(false);
            setPage(0);
        }*/
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

        getUrl(formatURL(location.state._links.self.href) + "/providerExclusions?projection=providerExclusionList").then((response) => {
            let rows : []= response.data._embedded.providerExclusion;//.sort((a:any,b:any) => { return a.type > b.type;});;
            setRow(rows);
            setTotal(rows.length);
        })

    },[location.state, total])

    useEffect(() => {

        getBasedUrl("exclusionType").then((response) => {
            setExclusionTypes(response.data._embedded.exclusionType);
        })

    },[])

    const Actions = (entity : any) =>{
        return(
            <>
                {
                    params.action === 'edit' &&
                    (
                        <Tooltip title="Supprimer" arrow>
                            <IconButton aria-label="delete" color="error" size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => {setUrl(entity.entity._links.self.href); setOpenRD(true);}}>
                                <Delete fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    )
                }
                <Tooltip title="Visualiser" arrow>
                    <IconButton aria-label="display" color="info"  size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => {setDocIdToView(entity.entity.reference);}}>
                        <Visibility fontSize="inherit" />
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

    const setDocToView = (fileUrl : string) =>{
        getUrl(formatURL(fileUrl)).then( file =>{
            setPDFFile(file.data._links.file.href);
            setOpenSD(true);
            //console.log(file.data.path);
        })
    }

    const setDocIdToView = (fileId : number) =>{
        setPDFFile(getUrlFromId(fileId));
        setOpenSD(true);
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
		getBasedUrl("mail/search/filterBy?filter=" + e.target.value).then((mails) => {
			setReferences(mails.data._embedded.mail);
		})
	}

    const toParent = () => {
        navigate("/provider/" + params.action , {state : { modelId : location.state._links.self.href}})
    }

	return (
        
        <div style={{ width: '100%'}}>
            <RemoveDialog />
            <ViewPDF/>
            
            <Paper sx={{ width: 'calc(100% - 40px)', ml: '20px', mt: '10px' }}>
                
                <Box sx={{display : "flex", width : '100%', paddingTop: 5 , paddingBottom: 5 , paddingRight: 5 ,justifyContent: "space-between"}}>
                    <Grid container direction={"column"}>
                        <Grid container spacing={1} direction={"row"} sx={{marginBottom : "5px", marginTop : "5px"}}>	
                            <Grid item xs={4} sm={4}>
                                <Typography variant="h5" sx={{color:"#555", cursor: "pointer", marginLeft: '10px'}} align="left" onClick={toParent}>
                                    {location.state.designationLt}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                {
                                    params.action === 'edit' &&
                                    (
                                        <FormControl fullWidth size="small">
                                            <Autocomplete
                                                id="mail"
                                                fullWidth
                                                size="small"
                                                options={references}
                                                value={reference}
                                                onChange={(e, value) => setReference(value)}
                                                getOptionLabel={(parent) => parent.reference}
                                                isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
                                                renderInput={(params) => <TextField {...params} label="Reference" onChange={debounce(filterBy, 200)} />} />
                                        </FormControl>
                                    )
                                }
                            </Grid>
                            <Grid item xs={2} sm={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                {
                                    params.action === 'edit' &&
                                    (
                                        <>
                                            {
                                                reference !== null && (
                                                    <Tooltip title="Visualiser" arrow>
                                                        <Button color="error" variant="outlined" size="large" sx={{ marginRight: '5px' }} onClick={event => { setDocToView(reference._links.file.href); } }>
                                                            <Visibility />
                                                        </Button>
                                                    </Tooltip>
                                                )
                                            }
                                            <Tooltip title="Sauvegarder" arrow>
                                                <Button color="primary" variant="outlined" size="large" sx={{ marginRight: '5px' }} onClick={saveExclusion}>
                                                    <Save />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Retourner" arrow>
                                                <Button color="primary" variant="outlined" size="large" sx={{ marginRight: '5px' }} onClick={e => navigate(-1)}>
                                                    <Replay />
                                                </Button>
                                            </Tooltip>
                                        </>
                                    )
                                }
                                {
                                    params.action === 'view' &&
                                    (
                                        <Tooltip title="Retourner" arrow>
                                            <Button color="primary" variant="outlined" size="large" sx={{ marginRight: '5px' }} onClick={e => navigate(-1)}>
                                                <Replay />
                                            </Button>
                                        </Tooltip>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} direction={"row"} sx={{marginBottom : "5px", marginTop : "5px"}}>
                            <Grid item xs={4} sm={4}></Grid>
                            <Grid item xs={4} sm={4}>
                                {
                                    params.action === 'edit' &&
                                    (
                                        <>
                                            <FormControl fullWidth size="small" >
                                                <InputLabel id="exclusionTypeLabel">Exclusion Type</InputLabel>
                                                <Select
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    labelId="exclusionTypeLabel"
                                                    id="exclusionType"
                                                    variant="outlined"
                                                    value={exclusionType}
                                                    label="Exclusion Type"
                                                    
                                                    onChange={(e) => setExclusionType(e.target.value)}
                                                >
                                                    {
                                                        exclusionTypes.length > 0 && exclusionTypes.map(exclusionType => {
                                                            return(
                                                                <MenuItem key={exclusionType._links.self.href} value={exclusionType._links.exclusionType.href}>{exclusionType.designationFr}</MenuItem>
                                                            );
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </>
                                    )
                                }
                            </Grid>
                            <Grid item xs={2} sm={2}>
                                {
                                    params.action === 'edit' &&
                                    (
                                        <>
                                            <FormControl fullWidth size="small">
                                                <DatePicker 
                                                    format="DD/MM/YYYY" 
                                                    label="From" 
                                                    readOnly={readOnly} 
                                                    slotProps={{ textField: { size: 'small', required: true }}} 
                                                    value={exclusion.startDate} 
                                                    onChange={ changedDate=>setExclusion(exclusion => ({...exclusion, startDate:changedDate})) }
                                                />
                                            </FormControl>
                                        </>
                                    )
                                }
                            </Grid>
                            <Grid item xs={2} sm={2}>
                                {
                                    params.action === 'edit' &&
                                    (
                                        <>
                                            <FormControl fullWidth size="small">
                                                <DatePicker 
                                                    format="DD/MM/YYYY" 
                                                    label="Approval Date" 
                                                    readOnly={readOnly} 
                                                    slotProps={{ textField: { size: 'small', required: true }}} 
                                                    value={exclusion.endDate} 
                                                    onChange={ changedDate=>setExclusion(exclusion => ({...exclusion, endDate:changedDate})) }
                                                />
                                            </FormControl>
                                        </>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} direction={"row"} sx={{marginBottom : "5px", marginTop : "5px"}}>
                            <Grid item xs={4} sm={4}></Grid>
                            <Grid item xs={8} sm={8}>
                                {
                                    params.action === 'edit' &&
                                    (
                                        <>
                                            <TextField
                                                required
                                                fullWidth
                                                value={exclusion.cause}
                                                onChange={ (e) => setExclusion(exclusion => ({...exclusion, cause: e.target.value})) }
                                                size="small"
                                                id="cause"
                                                name="cause"
                                                label="Cause"
                                                autoComplete="off"
                                                variant="outlined"
                                                inputProps={{ 
                                                    readOnly: readOnly,
                                                }}
                                            />
                                        </>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer sx={{maxHeight:'calc(90vh - 128px)', minWidth: '100%', maxWidth: '100%'}}>
                    <Table stickyHeader onMouseLeave={event => rowHoverHandler(event, -1)}>
                        <TableHead onMouseEnter={event => rowHoverHandler(event, -1)}>
                            <TableRow sx={{ cursor:"pointer" }}>
                                {Lists.get("exclusion").map((column:any) => (
                                    <TableCell  align={ column.align }
                                                width={ column.width }
                                                style={{ backgroundColor: '#555', color: 'white' }} 
                                                key={column.id}
                                    >
                                            {column.name}
                                    </TableCell>
                                ))}
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'100px'}} key={Lists.get("exclusion").length}>&nbsp;</TableCell>
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
                                            {Lists.get("exclusion") && Lists.get("exclusion").map((column : any, j:number) => {
                                                let value;
                                                j === 0 ? value = page * size + i+1 : value = decodeId(column.id, row);
                                                return (
                                                    <TableCell align={ column.align } key={j + " - "+ value}>
                                                        { renderSwitch(column.type, value) }
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell align="center" key={Lists.get("exclusion").length + " - action"}>
                                                {i === rowh ? <Actions entity={row}/> : " "}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
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
export default ProviderExclusions;