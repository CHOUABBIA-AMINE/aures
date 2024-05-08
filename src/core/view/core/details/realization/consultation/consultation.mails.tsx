import dayjs                    from "dayjs";
import { useSnackbar } 			from "notistack";

import { useEffect }            from "react";
import { useState }             from "react";
import { useLocation }          from "react-router-dom";
import { useNavigate }          from "react-router-dom";
import { useParams }            from "react-router-dom";

import { Autocomplete }         from "@mui/material";
import { Box }                  from "@mui/material";
import { debounce }             from "@mui/material";
import { Button }               from "@mui/material";
import { FormControl }          from "@mui/material";
import { Dialog }               from "@mui/material";
import { DialogActions }        from "@mui/material";
import { DialogContent }        from "@mui/material";
import { DialogContentText }    from "@mui/material";
import { DialogTitle }          from "@mui/material";
import { IconButton }           from "@mui/material";
import { Grid }                 from "@mui/material";
import { Modal }                from "@mui/material";
import { Paper }                from "@mui/material";
import { Table }                from "@mui/material";
import { TableBody }            from "@mui/material";
import { TableCell }            from "@mui/material";
import { TableContainer }       from "@mui/material";
import { TableHead }            from "@mui/material";
import { TablePagination }      from "@mui/material";
import { TableRow }             from "@mui/material";
import { TextField }            from "@mui/material";
import { Tooltip }              from "@mui/material";
import { Typography }           from "@mui/material";

import { AttachEmail }          from "@mui/icons-material";
import { Save }                 from "@mui/icons-material";
import { Visibility }           from "@mui/icons-material";
import { Delete }               from "@mui/icons-material";

import { useHTTP }              from "../../../../../api/request";
import { formatURL }            from "../../../../../api/tools";
import { getIdFromUrl }         from "../../../../../api/tools";
import { PDFViewer }            from "../../../../public/pdf.viewer";
import { Mail }                 from "../../../../../model/common/communication/mail";
import Lists                    from "../../../../../api/list";

function ConsultationMails() {

    const location 				                = useLocation();
    const navigate                              = useNavigate();
	const params 					            = useParams();
	const { enqueueSnackbar } 		            = useSnackbar();

    const { getUrl }                            = useHTTP();
    const { getBasedUrl }                       = useHTTP();
    const { putUrl }                            = useHTTP();
    const { deleteUrl }                         = useHTTP();

    const [rowh, setRowH]                       = useState(-1);
    const [openRD, setOpenRD]                   = useState(false);
    const [openSD, setOpenSD]                   = useState(false);
    const [url, setUrl]                         = useState("");

    const [rows, setRow]                        = useState<Mail[]>([]);
    const [page, setPage]                       = useState(0);
    const [size, setSize]                       = useState(10);
    const [total, setTotal]                     = useState(0);

    const [ pdfFile, setPDFFile ] 			    = useState("");

    const [ references, setReferences ]	        = useState<Mail[]>([]);
	const [ reference, setReference ]	        = useState<Mail | null>(null);

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

    const saveReference = ()=>{
        let aux = rows;
        if(reference !== null){
            aux.push(reference);
            putUrl(formatURL(location.state._links.self.href) + "/referencedMails", aux.map(row => row._links.self.href).join("\n"), "text/uri-list").then(() =>{
                getUrl(formatURL(location.state._links.self.href) + "/referencedMails?projection=mailList").then((response) => {
                    let rows : []= response.data._embedded.mail;//.sort((a:any,b:any) => { return a.type > b.type;});;
                    setRow(rows);
                    setTotal(rows.length);
                    //setDoc(initialData);
                })
            });
        } 
	}

    const deleteRow = (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if(url !== ""){
            setPage(0);
            deleteUrl(formatURL(location.state._links.self.href) + "/referencedMails/" + getIdFromUrl(formatURL(url))).then((response) => {
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

        getUrl(formatURL(location.state._links.self.href) + "/referencedMails").then((response) => {
            let rows : []= response.data._embedded.mail;//.sort((a:any,b:any) => { return a.type > b.type;});;
            setRow(rows);
            setTotal(rows.length);
        })

    },[total])

    const attachedClickHandler = (event : React.MouseEvent<HTMLElement>, modelId: any) => {
        event.preventDefault();
        navigate("/mail/references/view", { state: modelId } );
    }

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
                    <IconButton aria-label="display" color="info"  size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => {setDocToView(entity.entity._links.file.href);}}>
                        <Visibility fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Références" arrow>
                    <IconButton aria-label="display" color="warning" size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => attachedClickHandler(event, entity.entity)}>
                        <AttachEmail fontSize="medium" />
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

    const renderSwitch = (param : string, value : any) => {
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
		getBasedUrl("mail/search/filterBy?filter=" + e.target.value).then((references) => {
            console.log(references)
			setReferences(references.data._embedded.mail);
		})
	}

    const toParent = () => {
        navigate("/consultation/" + params.action , {state : {modelId : location.state._links.self.href}})
    }

	return (
        
        <div style={{ width: '100%'}}>
            <RemoveDialog />
            <ViewPDF/>
            
            <Paper sx={{ width: 'calc(100% - 40px)', ml: '20px', mt: '10px' }}>
                
                <Box sx={{display : "flex", width : '100%', paddingTop: 5 , paddingBottom: 5 , justifyContent: "space-between"}}>
                    <Grid container spacing={1} direction={"row"}>	
                        <Grid item xs={4} sm={4}>
                            <Typography variant="h5" sx={{color:"#555", cursor: "pointer"}} align="center" onClick={toParent}>
                                Consultation {location.state.reference}
                            </Typography>
                        </Grid>
                        {
                            params.action === 'edit' &&
                            (<>
                                <Grid item xs={6} sm={6}>
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
                                </Grid>
                                <Grid item xs={2} sm={2} sx={{ display: "flex", justifyContent: "space-around" }}>
                                    <div>
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
                                            <Button color="primary" variant="outlined" size="large" sx={{ marginRight: '5px' }} onClick={saveReference}>
                                                <Save />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </Grid>
                            </>)
                        }
                    </Grid>
                </Box>
                <TableContainer sx={{maxHeight:'calc(90vh - 128px)', minWidth: '100%', maxWidth: '100%'}}>
                    <Table stickyHeader onMouseLeave={event => rowHoverHandler(event, -1)}>
                        <TableHead onMouseEnter={event => rowHoverHandler(event, -1)}>
                            <TableRow sx={{ cursor:"pointer" }}>
                                {Lists.get("mail").map((column:any) => (
                                    <TableCell  align={ column.align }
                                                width={ column.width }
                                                style={{ backgroundColor: '#555', color: 'white' }} 
                                                key={column.id}
                                    >
                                            {column.name}
                                    </TableCell>
                                ))}
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'160px'}} key={Lists.get("mail").length}>&nbsp;</TableCell>
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
                                            {Lists.get("mail") && Lists.get("mail").map((column : any, j:number) => {
                                                let value;
                                                j === 0 ? value = page * size + i+1 : value = decodeId(column.id, row);
                                                return (
                                                    <TableCell align={ column.align } key={j + " - "+ value}>
                                                        { renderSwitch(column.type, value) }
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell align="center" key={Lists.get("mail").length + " - action"}>
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
export default ConsultationMails;