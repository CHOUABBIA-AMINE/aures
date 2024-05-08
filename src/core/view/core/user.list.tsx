import { useEffect }            from "react";
import { useState }             from "react";
import { useNavigate }          from "react-router-dom";

import { Toolbar, Typography }           from "@mui/material";
import { IconButton }           from "@mui/material";
import { Paper }                from "@mui/material";
import { Table }                from "@mui/material";
import { TableBody }            from "@mui/material";
import { TableCell }            from "@mui/material";
import { TableContainer }       from "@mui/material";
import { TableHead }            from "@mui/material";
import { TablePagination }      from "@mui/material";
import { TableRow }             from "@mui/material";
import { DeleteForever, FilterList }        from "@mui/icons-material";
import { Edit }                 from "@mui/icons-material";

import { useHTTP }              from "../../api/request";

function UserList() {
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'username', name: 'Username' },
        { id: 'enabled', name: 'Enabled' },
        { id: 'locked', name: 'Locked' },
        { id: 'expirationDate', name: 'Expiration Date' }
    ]

    const { getBasedUrl }       = useHTTP();
    const navigate              = useNavigate();

    const [rowh, rowhChange]  = useState(-1);
    
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
        navigate("/user/edit", { state: { userId: userId } });
    }

    const rowHoverHandler = (event : React.MouseEvent<HTMLElement>, index: number) => {
        event.preventDefault();
        rowhChange(index);
    }

    useEffect(() => {
        getBasedUrl("user?page=0&size=2").then((response) => {
            let rows : [] = response.data._embedded.user;
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })

    },[])

    const Actions = (userId : any) =>{
        return(
            <>
            <IconButton aria-label="edit" 
                        size="small" 
                        sx={{ mt: '0px', mb: '0px', ml: '0px', mr: '10px', p:'0px' }} 
                        onClick={event => rowClickHandler(event, userId)}
                        color="info"
            >
                <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" 
                        size="small" 
                        sx={{ mt: '0px', mb: '0px', ml: '10px', mr: '0px', p:'0px' }} 
                        onClick={event => alert({userId})}
                        color="error"
            >
                <DeleteForever fontSize="small" />
            </IconButton>
            </>
        )
    }
	return (
        
        <div style={{ width: '100%'}}>
            
            <Toolbar sx={{  width: '90%', marginLeft: '5%', justifyContent: 'space-between'}}>
                <Typography color="inherit"
                            variant="subtitle1"
                            component="div"
                >
                    List
                </Typography>
                <IconButton>
                    <FilterList />
                </IconButton>
            </Toolbar>
            <Paper sx={{ width: '90%', marginLeft: '5%' }}>
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
                                    <TableCell align="center" style={{ backgroundColor: '#555', color: 'white' }} key={column.id}>{column.name}</TableCell>
                                ))}
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white' }} key={columns.length}>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows
                                .map((row, i) => {
                                    return (
                                        <TableRow hover={true} key={i} sx={{cursor:'pointer'}} onMouseEnter={event => rowHoverHandler(event, i)}>
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