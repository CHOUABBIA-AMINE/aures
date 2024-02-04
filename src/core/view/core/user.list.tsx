import { useEffect }            from "react";
import { useState }             from "react";
import { useNavigate }          from "react-router-dom";

import { Fab, IconButton, Paper, TableSortLabel, Toolbar, Typography }                from "@mui/material";
import { Table }                from "@mui/material";
import { TableBody }            from "@mui/material";
import { TableCell }            from "@mui/material";
import { TableContainer }       from "@mui/material";
import { TableHead }            from "@mui/material";
import { TablePagination }      from "@mui/material";
import { TableRow }             from "@mui/material";
import { Delete }               from "@mui/icons-material";
import { Edit }                 from "@mui/icons-material";

import { useHTTP }              from "../../api/request";

function UserList() {
    const columns = [
        { id: 'id', name: 'Id', width: '5%' },
        { id: 'username', name: 'Username', width: '30%' },
        { id: 'enabled', name: 'Enabled', width: '15%' },
        { id: 'locked', name: 'Locked', width: '15%' },
        { id: 'expirationDate', name: 'Expiration Date', width: '25%' }
    ]

    const { getBasedUrl }       = useHTTP();
    const navigate              = useNavigate();

    const [rowh, rowhChange]    = useState(-1);
    const [order, orderChange]  = useState<'asc' | 'desc'>('asc');
    const [orderBy, orderByChange]    = useState(columns[1].id);
    
    const [rows, rowChange]     = useState([]);
    const [page, pageChange]    = useState(0);
    const [size, sizeChange]    = useState(2);
    const [total, totalChange]  = useState(0);

    const handlePage = (event : any, newpage : number) => {
        pageChange(newpage)
        getBasedUrl("user?page="+ newpage +"&size="+size).then((response) => {
            let rows : [] = response.data._embedded.user;
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })
    }

    const handleSize = (event : any) => {
        sizeChange(event.target.value)
        pageChange(0);
        getBasedUrl("user?page=0&size="+event.target.value).then((response) => {
            let rows : []= response.data._embedded.user;
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })
    }

    const rowClickHandler = (event : React.MouseEvent<HTMLElement>, userId: any) => {
        event.preventDefault();
        navigate("/user/edit", { state: userId } );
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
        getBasedUrl("user?page=" + page + "&size=" +size + "&sort=" + orderBy + "," + order).then((response) => {
            let rows : []= response.data._embedded.user;
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })

    },[ page, size, orderBy, order])

    const Actions = (userId : any) =>{
        return(
            <>
            <IconButton aria-label="edit" color="success" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px'}} onClick={event => rowClickHandler(event, userId)}>
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
                    MUI Table
                </Typography>
                <IconButton aria-label="edit">
                    <Edit fontSize="small" />
                </IconButton>
            </Toolbar>
        )
    }

	return (
        
        <div style={{ width: '100%'}}>
            

            <Paper sx={{ width: '90%', marginLeft: '5%' }}>
                <TableTool />
                <TablePagination
                    rowsPerPageOptions={[2, 10, 25]}
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
                                {columns.map((column) => (
                                    <TableCell  align="center" 
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
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'10%'}} key={columns.length}>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows
                                .map((row, i) => {
                                    return (
                                        <TableRow hover={true} key={i} 
                                                  sx={{ cursor:"pointer" }}
                                                  onMouseEnter={event => rowHoverHandler(event, i)}>
                                            {columns && columns.map((column, j) => {
                                                let value;
                                                j === 0 ? value = i+1 : value = row[column.id];
                                                return (
                                                    <TableCell align="center" key={j + " - "+ value}>
                                                        {value}
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell align="center" key={columns.length + " - action"}>
                                                {i === rowh ? <Actions userId={row['_links']['user']['href']}/> : " "}
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
export default UserList;