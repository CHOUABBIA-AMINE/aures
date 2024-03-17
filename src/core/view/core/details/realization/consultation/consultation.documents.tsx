import dayjs                    from "dayjs";
import { useSnackbar } 			from "notistack";

import { useEffect }            from "react";
import { useState }             from "react";
import { useLocation }          from "react-router-dom";
import { useNavigate }          from "react-router-dom";
import { useParams }            from "react-router-dom";

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField }               from "@mui/material";
import { Dialog }               from "@mui/material";
import { DialogActions }        from "@mui/material";
import { DialogContent }        from "@mui/material";
import { DialogContentText }    from "@mui/material";
import { DialogTitle }          from "@mui/material";
import { IconButton }           from "@mui/material";
import { Input }                from "@mui/material";
import { Paper }                from "@mui/material";
import { TableSortLabel }       from "@mui/material";
import { Toolbar }              from "@mui/material";
import { Typography }           from "@mui/material";
import { Table }                from "@mui/material";
import { TableBody }            from "@mui/material";
import { TableCell }            from "@mui/material";
import { TableContainer }       from "@mui/material";
import { TableHead }            from "@mui/material";
import { TablePagination }      from "@mui/material";
import { TableRow }             from "@mui/material";

import { AddBoxOutlined, PictureAsPdfOutlined, Save }       from "@mui/icons-material";
import { PrintOutlined }        from "@mui/icons-material";
import { IosShareOutlined }     from "@mui/icons-material";
import { Delete }               from "@mui/icons-material";
import { Edit }                 from "@mui/icons-material";
import { Search }               from "@mui/icons-material";

import { useHTTP }              from "../../../../../api/request";
import Lists                    from "../../../../../api/list";
import { formatURL }            from "../../../../../api/tools";
import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";
import { AURESDocument }        from "../../../../../model/common/document/document";
import { AURESDocumentType }    from "../../../../../model/common/document/document.type";

function ConsultationDocuments() {

    const location 				                = useLocation();
    const navigate                              = useNavigate();
	const params 					            = useParams();
	const { enqueueSnackbar } 		            = useSnackbar();

	let readOnly 					            = false; //params.action === 'edit' ? false : true;

    const { getUrl }                            = useHTTP();
    const { getBasedUrl }                       = useHTTP();
    const { postBasedUrl }                      = useHTTP();
    const { deleteUrl }                         = useHTTP();
    const { patchUrl }                          = useHTTP();
    const { uploadFile }                        = useHTTP();
    const { getFile }                           = useHTTP();

    const [rowh, setRowH]                       = useState(-1);
    const [order, setOrder]                     = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy]                 = useState(Lists.get("document")[1].id);
    const [openRD, setOpenRD]                   = useState(false);
    const [url, setUrl]                         = useState("");

    const [rows, setRow]                        = useState([]);
    const [page, setPage]                       = useState(0);
    const [size, setSize]                       = useState(10);
    const [total, setTotal]                     = useState(0);

    const [ documentTypes, setDocumentTypes ]   = useState<AURESDocumentType[]>([]);
	const [ documentType, setDocumentType ]	    = useState<string>("");
    const [ _file, setFile ] 			        = useState()
    const [ _document, setDocument ]             = useState<AURESDocument>({
		reference               : "",
		issueDate               : dayjs(),
		_links                  : {
			document                :{
				href                    : ""
			},
			self                    :{
				href                    : ""
			},
			documentType            :{
				href                    : ""
			},
			file                    :{
				href                    : ""
			}
		}
	});

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

    const rowClickHandler = (event : React.MouseEvent<HTMLElement>, modelId: any, action:string) => {
        event.preventDefault();
        //navigate("/" + model + "/edit", { state: modelId } );
    }

    const rowHoverHandler = (event : React.MouseEvent<HTMLElement>, index: number) => {
        event.preventDefault();
        setRowH(index);
    }

    const createSortHandler = (event : React.MouseEvent<HTMLElement>, data:any) => {
        if(data === orderBy){
            setOrder(order === 'asc' ? 'desc' : 'asc');
        }else{
            setOrderBy(data);
            setOrder('asc');
        }
        
    }

    const saveDoc = ()=>{
		if(_document._links.self.href !== ""){
			patchUrl(formatURL(_document._links.self.href), JSON.stringify({
				reference       : _document.reference,
				issueDate       : _document.issueDate,
				documentType	: documentType,
			}));
		}else{
			if(_file !== undefined){
				uploadFile(_file).then( __file => {
					postBasedUrl("document", JSON.stringify({
                        reference       : _document.reference,
                        issueDate       : _document.issueDate,
                        documentType	: documentType,
						picture			: getFile(__file.data.id)
					}));
				})
			}
		}
	}

    const onSelectFile = (e : any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFile(undefined);
            return;
        }
        setFile(e.target.files[0])
    }

	const clickFileUploader = () => {
		document.getElementById("imageSelector")?.click()
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

        getBasedUrl("documentType").then((documentTypes) => {
			setDocumentTypes(documentTypes.data._embedded.documentType);
		});

        let projection = "";//proj !== undefined ? "&projection=" + proj : ""
        getUrl(formatURL(location.state) + "/documents?" + projection).then((response) => {
            let rows : []= response.data._embedded.document;
            setRow(rows);
            setTotal(rows.length);
        })

    },[])

    const Actions = (modelId : any) =>{
        return(
            <>
                <IconButton aria-label="edit" color="success" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px'}} onClick={event => rowClickHandler(event, modelId,'edit')}>
                    <Edit fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" color="error" size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => {setUrl(modelId.modelId); setOpenRD(true);}}>
                    <Delete fontSize="inherit" />
                </IconButton>
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

    const TableTool = () =>{
        return(
            <div style={{ width: '100%'}}>
                <Box sx={{display : "flex", paddingTop: 5 , justifyContent: "space-between"}}>
                    <Grid container spacing={1} direction={"row"}>	
                        <Grid item xs={4} sm={4}>
                            Consultation 
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <FormControl fullWidth size="small">
                                <TextField
                                    required
                                    fullWidth
                                    value={_document.reference}
                                    onChange={ (e) => setDocument(doc => ({...doc, reference: e.target.value})) }
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
                        <Grid item xs={2} sm={2}>
                            <FormControl fullWidth size="small" >
                                <InputLabel id="documentTypeLabel">Document Type</InputLabel>
                                <Select
                                    required
                                    fullWidth
                                    size="small"
                                    labelId="documentTypeLabel"
                                    id="documentType"
                                    variant="outlined"
                                    value={documentType}
                                    label="Document Type"
                                    
                                    onChange={(e) => setDocumentType(e.target.value)}
                                >
                                    {
                                        documentTypes.length > 0 && documentTypes.map(documentType => {
                                            return(
                                                <MenuItem key={documentType._links.self.href} value={documentType._links.documentType.href}>{documentType.designationFr}</MenuItem>
                                            );
                                        })
                                    }
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
                                    value={_document.issueDate} 
                                    onChange={ changedDate=>setDocument(doc => ({...doc, issueDate:changedDate})) }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={2} alignContent="center">
                            <input type='file' hidden id="imageSelector" onChange={onSelectFile} accept=".pdf"/>
                            <Button color="error" variant="outlined" size="large" sx={{ marginRight:'5px' }} onClick={clickFileUploader}>
                                <PictureAsPdfOutlined />
                            </Button>
                            <Button color="primary" variant="outlined" size="large" sx={{ marginRight:'5px' }} onClick={saveDoc}>
                                <Save />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )
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
	return (
        
        <div style={{ width: '100%'}}>
            <RemoveDialog />
            <Paper sx={{ width: 'calc(100% - 40px)', ml: '20px', mt: '10px' }}>
                <TableTool />
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
                <TableContainer sx={{maxHeight:'calc(90vh - 128px)', minWidth: '100%', maxWidth: '100%'}}>
                    <Table stickyHeader onMouseLeave={event => rowHoverHandler(event, -1)}>
                        <TableHead onMouseEnter={event => rowHoverHandler(event, -1)}>
                            <TableRow>
                                {Lists.get("document").map((column:any) => (
                                    <TableCell  align={ column.align }
                                                width={ column.width }
                                                style={{ backgroundColor: '#555', color: 'white' }} 
                                                key={column.id}
                                                sortDirection={orderBy === column.id ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={event => createSortHandler(event, column.id)}
                                        >
                                            {column.name}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'100px'}} key={Lists.get("document").length}>&nbsp;</TableCell>
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
                                            {Lists.get("document") && Lists.get("document").map((column : any, j:number) => {
                                                let value;
                                                j === 0 ? value = page * size + i+1 : value = decodeId(column.id, row);
                                                return (
                                                    <TableCell align={ column.align } key={j + " - "+ value}>
                                                        { renderSwitch(column.type, value) }
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell align="center" key={Lists.get("document").length + " - action"}>
                                                {i === rowh ? <Actions modelId={row['_links']["document"]['href']}/> : " "}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </div>
    );
}
export default ConsultationDocuments;