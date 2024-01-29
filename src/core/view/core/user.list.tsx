import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useHTTP } from "../../api/request";
import API from "../../api/settings";

function UserList() {
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'username', name: 'Username' },
        { id: 'enabled', name: 'Enabled' },
        { id: 'locked', name: 'Locked' },
        { id: 'expirationDate', name: 'Expiration Date' }
    ]

    const { getBasedUrl }       = useHTTP();

    const [rows, rowChange]     = useState([]);
    const [page, pageChange]    = useState(0);
    const [size, sizeChange]    = useState(2);
    const [total, totalChange]  = useState(0);

    const handlePage = (event : any, newpage : number) => {
        pageChange(newpage)
        getBasedUrl("user?page="+ newpage +"&size=2").then((response) => {
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
    const rowClickHandler = (event : React.MouseEvent<HTMLElement>) => {
        console.log(event);
    }

    useEffect(() => {
        getBasedUrl("user?page=0&size=2").then((response) => {
            let rows : []= response.data._embedded.user;
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })

    }, [])
	return (
        <div style={{ textAlign: 'center', width: '100%'}}>
            <h1>MUI Table</h1>

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
                    <Table stickyHeader>
                        <TableHead>
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
                                        <TableRow hover={true} key={i} onClick={rowClickHandler}>
                                            {columns && columns.map((column, j) => {
                                                let value;
                                                j === 0 ? value = i+1 : value = row[column.id];
                                                return (
                                                    <TableCell align="center" key={j + " - "+ value}>
                                                        {value}
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell align="center" key={columns.length + " - action"}></TableCell>
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