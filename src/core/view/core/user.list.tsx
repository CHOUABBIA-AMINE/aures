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
        console.log(event.target);
        sizeChange(event.target.value)
        pageChange(0);
        console.log(size);
        getBasedUrl("user?page=0&size="+size).then((response) => {
            let rows : []= response.data._embedded.user;
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })
        console.log(size);
    }

    useEffect(() => {
        getBasedUrl("user?page=0&size=2").then((response) => {
            let rows : []= response.data._embedded.user;
            rowChange(rows);
            totalChange(response.data.page.totalElements);
        })

    }, [])
	return (
        <div style={{ textAlign: 'center' }}>
            <h1>MUI Table</h1>

            <Paper sx={{ width: '90%', marginLeft: '5%' }}>
                <TableContainer sx={{maxHeight:450}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows
                                .map((row, i) => {
                                    return (
                                        <TableRow key={i}>
                                            {columns && columns.map((column, j) => {
                                                let value;
                                                j == 0 ? value = i+1 : value = row[column.id];
                                                return (
                                                    <TableCell key={j + " - "+ value}>
                                                        {value}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
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
            </Paper>

        </div>
    );
}
export default UserList;