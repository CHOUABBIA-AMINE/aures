import dayjs                    from "dayjs";

import { useEffect }            from "react";
import { useState }             from "react";
import { useNavigate }          from "react-router-dom";
import { useParams }            from "react-router-dom";

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

import { LibraryAddSharp }      from "@mui/icons-material";
import { Delete }               from "@mui/icons-material";
import { Edit }                 from "@mui/icons-material";
import { Search }               from "@mui/icons-material";

import { useHTTP }              from "../../api/request";
import Lists                    from "../../api/list";

function ModelList() {

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
    }

    const handleSize = (event : any) => {
        sizeChange(event.target.value)
        pageChange(0);
    }

    const rowClickHandler = (event : React.MouseEvent<HTMLElement>, modelId: any, action:string) => {
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
                <IconButton aria-label="edit" color="success" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px'}} onClick={event => rowClickHandler(event, modelId,'edit')}>
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
                <IconButton type="button" color="primary" sx={{ p: '10px' }} aria-label="new" onClick={event => rowClickHandler(event, null,'create')}>
                    <LibraryAddSharp />
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