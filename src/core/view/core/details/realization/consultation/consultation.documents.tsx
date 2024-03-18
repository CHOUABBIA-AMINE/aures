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
import { Doc }                  from "../../../../../model/common/document/document";
import { DocType }              from "../../../../../model/common/document/document.type";
import { SpecialZoomLevel, Viewer } from "@react-pdf-viewer/core";

function ConsultationDocuments() {

    const location 				                = useLocation();
    const navigate                              = useNavigate();
	const params 					            = useParams();
	const { enqueueSnackbar } 		            = useSnackbar();

	let readOnly 					            = false; //params.action === 'edit' ? false : true;

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
    const [orderBy, setOrderBy]                 = useState(Lists.get("document")[1].id);
    const [openRD, setOpenRD]                   = useState(false);
    const [openSD, setOpenSD]                   = useState(false);
    const [url, setUrl]                         = useState("");

    const [rows, setRow]                        = useState<Doc[]>([]);
    const [page, setPage]                       = useState(0);
    const [size, setSize]                       = useState(10);
    const [total, setTotal]                     = useState(0);

    const [ docTypes, setDocTypes ]             = useState<DocType[]>([]);
	const [ docType, setDocType ]	            = useState<string>("");
    const [ _file, setFile ] 			        = useState();
    const [ pdfFile, setPDFFile ] 			    = useState("");
    const [ doc, setDoc ]                       = useState<Doc>({
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

    const rowClickHandler = (event : React.MouseEvent<HTMLElement>, entity: any, action:string) => {
        event.preventDefault();
        //navigate("/" + model + "/edit", { state: modelId } );
        console.log(entity);
        entity.issueDate = dayjs(entity.issueDate)
        setDoc(entity);
        
        getUrl(entity._links.documentType.href).then((documentType) => {
			setDocType(documentType.data._links.self.href);
		});
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
		if(doc._links.self.href !== ""){
			patchUrl(formatURL(doc._links.self.href), JSON.stringify({
				reference       : doc.reference,
				issueDate       : doc.issueDate,
				documentType	: docType,
			})).then((doc : any) =>{
                //patchUrl(formatURL(location.state) + "/documents?", {doc.data.});
                console.log(doc);
            });
		}else{
			if(_file !== undefined){
				uploadFile(_file).then( __file => {
					postBasedUrl("document", JSON.stringify({
                        reference       : doc.reference,
				        issueDate       : doc.issueDate,
                        documentType	: docType,
						picture			: getFile(__file.data.id)
					})).then(document =>{
                        let aux = rows;
                        aux.push(document.data);
                        putUrl(formatURL(location.state) + "/documents?projection=documentList", aux.map(row => row._links.self.href).join("\n"), "text/uri-list").then((data) =>{
                            let _rows = rows;
                            _rows.push(document.data);
                            setRow(_rows);
                        });
                        //console.log(doc);
                    });;
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
			setDocTypes(documentTypes.data._embedded.documentType);
		});

        let projection = "";//proj !== undefined ? "&projection=" + proj : ""
        getUrl(formatURL(location.state) + "/documents?projection=documentList").then((response) => {
            let rows : []= response.data._embedded.document;
            setRow(rows);
            setTotal(rows.length);
        })

    },[])

    const Actions = (entity : any) =>{
        return(
            <>
                <IconButton aria-label="edit" color="success" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px'}} onClick={event => rowClickHandler(event, entity.entity,'edit')}>
                    <Edit fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" color="error" size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => {setUrl(entity._links.self.href); setOpenRD(true);}}>
                    <Delete fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" color="error" size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => {setDocToView(entity._links.file.href);}}>
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

    const setDocToView = (fileUrl : string) =>{
        getUrl(formatURL(fileUrl)).then( file =>{
            setPDFFile(file.data.path);
            setOpenSD(true);
        })
    }

    const DocumentViewer = () => {
        return (
            <div style={{
                backgroundColor: '#fff',
    
                /* Fixed position */
                left: 0,
                position: 'fixed',
                top: 0,
    
                /* Take full size */
                height: '60%',
                width: '50%',
    
                /* Displayed on top of other elements */
                zIndex: 9999,
    
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}>
                <Viewer fileUrl={pdfFile} defaultScale={SpecialZoomLevel.PageFit} />;
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
            <DocumentViewer />
            <Paper sx={{ width: 'calc(100% - 40px)', ml: '20px', mt: '10px' }}>
                
                <Box sx={{display : "flex", width : '100%', paddingTop: 5 , paddingBottom: 5 , justifyContent: "space-between"}}>
                    <Grid container spacing={1} direction={"row"}>	
                        <Grid item xs={4} sm={4}>
                            Consultation 
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <FormControl fullWidth size="small">
                                <TextField
                                    required
                                    fullWidth
                                    value={doc.reference}
                                    onChange={ (e) => setDoc(doc => ({...doc, reference: e.target.value})) }
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
                                    value={docType}
                                    label="Document Type"
                                    
                                    onChange={(e) => setDocType(e.target.value)}
                                >
                                    {
                                        docTypes.length > 0 && docTypes.map(docType => {
                                            return(
                                                <MenuItem key={docType._links.self.href} value={docType._links.documentType.href}>{docType.designationFr}</MenuItem>
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
                                    label="Issue Date" 
                                    readOnly={readOnly} 
                                    slotProps={{ textField: { size: 'small', required: true }}} 
                                    value={doc.issueDate} 
                                    onChange={ changedDate=>setDoc(doc => ({...doc, issueDate:changedDate})) }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={2} sx={{display : "flex", justifyContent: "space-around"}}>
                            <div>
                                <input type='file' hidden id="imageSelector" onChange={onSelectFile} accept=".pdf"/>
                                <Button color="error" variant="outlined" size="large" sx={{ marginRight:'5px' }} onClick={clickFileUploader}>
                                    <PictureAsPdfOutlined />
                                </Button>
                                <Button color="primary" variant="outlined" size="large" sx={{ marginRight:'5px' }} onClick={saveDoc}>
                                    <Save />
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
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
                                                {i === rowh ? <Actions entity={row}/> : " "}
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
export default ConsultationDocuments;