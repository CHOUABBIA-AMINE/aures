import { useEffect }            from "react";
import { useState }             from "react";
import { useNavigate, useParams }          from "react-router-dom";

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
import { Delete }               from "@mui/icons-material";
import { Edit }                 from "@mui/icons-material";
import { Search }               from "@mui/icons-material";

import { useHTTP }              from "../../api/request";
import Lists                    from "../../api/list";

function ModelList() {
    // const columns = [
    //     { id: 'id', name: 'Id', width: '5%' },
    //     { id: 'username', name: 'Username', width: '30%' },
    //     { id: 'enabled', name: 'Enabled', width: '15%' },
    //     { id: 'locked', name: 'Locked', width: '15%' },
    //     { id: 'expirationDate', name: 'Expiration Date', width: '25%' }
    // ]
    const {entity}              = useParams();
    const model                 = entity !== undefined ? entity : "";
    
    const { getBasedUrl }       = useHTTP();
    const navigate              = useNavigate();

    const [rowh, rowhChange]    = useState(-1);
    const [order, orderChange]  = useState<'asc' | 'desc'>('asc');
    const [orderBy, orderByChange]    = useState(Lists.get(model)[1].id);
    
    const [rows, rowChange]     = useState([]);
    const [page, pageChange]    = useState(0);
    const [size, sizeChange]    = useState(5);
    const [total, totalChange]  = useState(0);

    const handlePage = (event : any, newpage : number) => {
        pageChange(newpage)
        /*getBasedUrl(model+"?page="+ newpage +"&size="+size).then((response) => {
            let rows : [] = response.data._embedded.user;
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })*/
    }

    const handleSize = (event : any) => {
        sizeChange(event.target.value)
        pageChange(0);
        /*getBasedUrl(model + "?page=0&size="+event.target.value).then((response) => {
            let rows : []= response.data._embedded.user;
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })*/
    }

    const rowClickHandler = (event : React.MouseEvent<HTMLElement>, modelId: any) => {
        event.preventDefault();
        navigate("/" + model + "/edit", { state: modelId } );
    }

    const rowHoverHandler = (event : React.MouseEvent<HTMLElement>, index: number) => {
        event.preventDefault();
        rowhChange(index);
    }

    const createSortHandler = (event : React.MouseEvent<HTMLElement>, data:any) => {
        if(data === orderBy){
            orderChange(order === 'asc' ? 'desc' : 'asc');
        }else{
            orderByChange(data);
            orderChange('asc');
        }
        
    }

    useEffect(() => {
        getBasedUrl(model+"?page=" + page + "&size=" +size + "&sort=" + orderBy + "," + order).then((response) => {
            let rows : []= response.data._embedded[model];
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })

    },[ model, page, size, orderBy, order])

    const Actions = (modelId : any) =>{
        return(
            <>
            <IconButton aria-label="edit" color="success" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px'}} onClick={event => rowClickHandler(event, modelId)}>
                <Edit fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" color="error" size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => alert("DELETE!!")}>
                <Delete fontSize="inherit" />
            </IconButton>
            </>
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
            </Toolbar>
        )
    }

	return (
        
        <div style={{ width: '100%'}}>
            
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
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'10%'}} key={Lists.get(model).length}>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows
                                .map((row, i) => {
                                    return (
                                        <TableRow hover={true} key={i} 
                                                  sx={{ cursor:"pointer" }}
                                                  onMouseEnter={event => rowHoverHandler(event, i)}>
                                            {Lists.get(model) && Lists.get(model).map((column : any, j:number) => {
                                                let value;
                                                j === 0 ? value = i+1 : value = row[column.id];
                                                return (
                                                    <TableCell align={ column.align } key={j + " - "+ value}>
                                                        {value}
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