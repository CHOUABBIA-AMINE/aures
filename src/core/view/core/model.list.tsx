import dayjs                    from "dayjs";

import { useEffect }            from "react";
import { useState }             from "react";
import { useNavigate }          from "react-router-dom";
import { useParams }            from "react-router-dom";

import { Button }               from "@mui/material";
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

import { AddBoxOutlined }       from "@mui/icons-material";
import { PrintOutlined }        from "@mui/icons-material";
import { IosShareOutlined }     from "@mui/icons-material";
import { Delete }               from "@mui/icons-material";
import { Edit }                 from "@mui/icons-material";
import { Search }               from "@mui/icons-material";

import { useHTTP }              from "../../api/request";
import { formatURL }            from "../../api/tools";
import Lists                    from "../../api/list";

function ModelList() {

    let {entity}                = useParams();
    
    const [model, setModel]     = useState(entity !== undefined ? entity : "");
    const navigate              = useNavigate();

    const { getBasedUrl }       = useHTTP();
    const { deleteUrl }         = useHTTP();

    const [rowh, setRowH]       = useState(-1);
    const [order, setOrder]     = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState(Lists.get(model)[1].id);
    const [openRD, setOpenRD]   = useState(false);
    const [url, setUrl]         = useState("");

    const [rows, setRow]        = useState([]);
    const [page, setPage]       = useState(0);
    const [size, setSize]       = useState(5);
    const [total, setTotal]     = useState(0);

    const handlePage = (event : any, newpage : number) => {
        setPage(newpage)
    }

    const handleSize = (event : any) => {
        setSize(event.target.value)
        setPage(0);
    }

    const rowClickHandler = (event : React.MouseEvent<HTMLElement>, modelId: any, action:string) => {
        event.preventDefault();
        navigate("/" + model + "/edit", { state: modelId } );
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
        if(entity !== undefined){
            setModel(entity);
            if(model !== entity){
                setSize(5);
                setPage(0);
            }
        }else{
            setModel("");
        }

        getBasedUrl(model+"?page=" + page + "&size=" +size + "&sort=" + orderBy + "," + order).then((response) => {
            let rows : []= response.data._embedded[model];
            setRow(rows);
            setTotal(response.data.page.totalElements);
        })

    },[ model, page, size, orderBy, order, entity, total])

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
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
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
            <Toolbar>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    User List
                </Typography>
                <Input placeholder="Search" sx={{ width : '340px'}} />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <Search />
                </IconButton>
                <IconButton type="button" color="primary" sx={{ p: '10px' }} aria-label="new" onClick={event => rowClickHandler(event, null,'create')}>
                    <AddBoxOutlined />
                </IconButton>
                <IconButton type="button" color="success" sx={{ p: '10px' }} aria-label="new" onClick={event => rowClickHandler(event, null,'create')}>
                    <IosShareOutlined />
                </IconButton>
                <IconButton type="button" color="info" sx={{ p: '10px' }} aria-label="new" onClick={event => rowClickHandler(event, null,'create')}>
                    <PrintOutlined />
                </IconButton>
            </Toolbar>
        )
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
                                {Lists.get(model).map((column:any) => (
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
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'100px'}} key={Lists.get(model).length}>&nbsp;</TableCell>
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
                                            {Lists.get(model) && Lists.get(model).map((column : any, j:number) => {
                                                let value;
                                                j === 0 ? value = i+1 : value = row[column.id];
                                                return (
                                                    <TableCell align={ column.align } key={j + " - "+ value}>
                                                        {column.type === "date" ? dayjs(value).format('YYYY-MM-DD') : value}
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell align="center" key={Lists.get(model).length + " - action"}>
                                                {i === rowh ? <Actions modelId={row['_links'][model]['href']}/> : " "}
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
export default ModelList;