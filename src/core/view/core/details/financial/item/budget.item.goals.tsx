import dayjs                    from "dayjs";

import { useEffect }            from "react";
import { useState }             from "react";
import { useLocation }          from "react-router-dom";
import { useNavigate }          from "react-router-dom";

import { Autocomplete, Box, Tooltip, Typography, debounce }                  from "@mui/material";
import { Button }               from "@mui/material";
import { FormControl }          from "@mui/material";
import { Grid }                 from "@mui/material";
import { TextField }            from "@mui/material";
import { Dialog }               from "@mui/material";
import { DialogActions }        from "@mui/material";
import { DialogContent }        from "@mui/material";
import { DialogContentText }    from "@mui/material";
import { DialogTitle }          from "@mui/material";
import { IconButton }           from "@mui/material";
import { Paper }                from "@mui/material";
import { Table }                from "@mui/material";
import { TableBody }            from "@mui/material";
import { TableCell }            from "@mui/material";
import { TableContainer }       from "@mui/material";
import { TableHead }            from "@mui/material";
import { TablePagination }      from "@mui/material";
import { TableRow }             from "@mui/material";

import {  Save }                from "@mui/icons-material";
import { Delete }               from "@mui/icons-material";
import { Edit }                 from "@mui/icons-material";

import { useHTTP }              from "../../../../../api/request";
import Lists                    from "../../../../../api/list";
import { formatURL }            from "../../../../../api/tools";
import { BudgetGoal }           from "../../../../../model/financial/budget.goal";
import { Structure }            from "../../../../../model/common/administration/structure";
import { NumericFormat } from "react-number-format";

function BudgetItemGoals() {

    const location 				                = useLocation();
    const navigate                              = useNavigate();

	let readOnly 					            = false; //params.action === 'edit' ? false : true;
    const initialData : BudgetGoal = {
        quantity                : 0,
        _links                  : {
            budgetGoal              :{
                href                    : ""
            },
            self                    :{
                href                    : ""
            },
            budgetItem              :{
                href                    : ""
            },
            structure               :{
                href                    : ""
            }
        }
    };

    const { getUrl }                            = useHTTP();
    const { getBasedUrl }                       = useHTTP();
    const { postBasedUrl }                      = useHTTP();
    const { putUrl }                            = useHTTP();
    const { deleteUrl }                         = useHTTP();
    const { patchUrl }                          = useHTTP();

    const [rowh, setRowH]                       = useState(-1);
    const [openRD, setOpenRD]                   = useState(false);
    const [url, setUrl]                         = useState("");

    const [rows, setRow]                        = useState<BudgetGoal[]>([]);
    const [page, setPage]                       = useState(0);
    const [size, setSize]                       = useState(10);
    const [total, setTotal]                     = useState(0);

	const [ structures, setStructures ]	        = useState<Structure[]>([]);
	const [ structure, setStructure ]	        = useState<Structure | null>(null);
    const [ goal, setGoal ]                     = useState<BudgetGoal>(initialData);

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
        setGoal(entity);

        getUrl(formatURL(entity._links.self.href)).then((goal) => {
			setGoal(goal.data);
		});

        getUrl(formatURL(entity._links.structure.href)).then((element) => {
			setStructure(element.data);
            let data = structure !== null ? [structure] : [];
            setStructures(data);
		});
    }

    const rowHoverHandler = (event : React.MouseEvent<HTMLElement>, index: number) => {
        event.preventDefault();
        setRowH(index);
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

    const Actions = (entity : any) =>{
        return(
            <>
                <Tooltip title="Editer" arrow>
                    <IconButton aria-label="edit" color="success" size="small" sx={{ p: '0px', ml: '0%', mr: '5%', b: '0px'}} onClick={event => rowClickHandler(event, entity.entity,'edit')}>
                        <Edit fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer" arrow>
                    <IconButton aria-label="delete" color="error" size="small" sx={{ p: '0px', ml: '5%', mr: '0%', b: '0px' }} onClick={event => {setUrl(entity.entity._links.self.href); setOpenRD(true);}}>
                        <Delete fontSize="inherit" />
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
    
    const filterBy = (e : any) =>{
		getBasedUrl("structure/search/filterBy?filter=" + e.target.value).then((structure) => {
			setStructures(structure.data._embedded.structure);
		})
	}

    const toParent = () => {
        navigate("/budgetItem/edit", {state : {modelId : location.state._links.self.href}})
    }    
    
    const saveGoal = ()=>{
		if(goal._links.self.href !== ""){
			patchUrl(formatURL(goal._links.self.href), JSON.stringify({
				quantity        : goal.quantity,
				structure	    : structure?._links.self.href,
                budgetItem	    : location.state._links.self.href
			})).then((goal : any) =>{
                getUrl(formatURL(location.state._links.self.href) + "/budgetGoals?projection=budgetGoalList").then((response) => {
                    let rows : []= response.data._embedded.budgetGoal;//.sort((a:any,b:any) => { return a.type > b.type;});
                    setRow(rows);
                    setTotal(rows.length);
                    setGoal(initialData);
                    setStructure(null);
                    setStructures([]);
                })
            });
		}else{

            postBasedUrl("budgetGoal", JSON.stringify({
                quantity        : goal.quantity,
                structure	    : structure?._links.self.href,
                budgetItem	    : location.state._links.self.href
            })).then(goal =>{
                let aux = rows;
                aux.push(goal.data);
                putUrl(formatURL(location.state._links.self.href) + "/budgetGoals", aux.map(row => row._links.self.href).join("\n"), "text/uri-list").then(() =>{
                    getUrl(formatURL(location.state._links.self.href) + "/budgetGoals?projection=budgetGoalList").then((response) => {
                        let rows : []= response.data._embedded.budgetGoal;//.sort((a:any,b:any) => { return a.type > b.type;});;
                        setRow(rows);
                        setTotal(rows.length);
                        setGoal(initialData);
                        setStructure(null);
                        setStructures([]);
                    })
                });
            });
		}
	}

    useEffect(() => {
        getUrl(formatURL(location.state._links.self.href) + "/budgetGoals?projection=budgetGoalList").then((response) => {
            setRow(response.data._embedded.budgetGoal);
            setTotal(response.data._embedded.budgetGoal.length);
        })

    },[page, size, total])

	return (
        
        <div style={{ width: '100%'}}>
            <RemoveDialog />
            
            <Paper sx={{ width: 'calc(100% - 40px)', ml: '20px', mt: '10px' }}>
                
                <Box sx={{display : "flex", width : '100%', paddingTop: 5 , paddingBottom: 5 , justifyContent: "space-between"}}>
                    <Grid container spacing={1} direction={"row"}>	
                        <Grid item xs={4} sm={4}>
                            <Typography variant="h5" sx={{color:"#555", cursor: "pointer"}} align="left" onClick={toParent}>
                                {location.state.designationFr}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <Autocomplete
                                id="structure"
                                fullWidth
                                size="small"
                                options={structures}
                                value={structure}
                                onChange={(e, value) => setStructure(value)}
                                getOptionLabel={(parent) => parent.designationFr}
                                isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
                                renderInput={(params) => <TextField {...params} label="Structure" onChange={debounce(filterBy, 200)} />} />
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <FormControl fullWidth size="small">
                                <NumericFormat 
										required
										fullWidth
										thousandSeparator="."
										decimalSeparator=","
										decimalScale={0}
										fixedDecimalScale
										customInput={TextField} 
										value={goal.quantity}
										onValueChange={(values) => {setGoal(goal => ({...goal, quantity: Number(values.floatValue)}))}}
										size="small"
										id="planedQuantity"
										name="planedQuantity"
										label="Planed Quantity"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly,
											dir:'rtl'
										}}
									/>
                            </FormControl>
                        </Grid>                        
                        <Grid item xs={2} sm={2} >
                            <Tooltip title="Sauvegarder" arrow>
                                <Button color="primary" variant="outlined" size="large" sx={{ marginRight:'5px' }} onClick={saveGoal}>
                                    <Save />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer sx={{maxHeight:'calc(90vh - 128px)', minWidth: '100%', maxWidth: '100%'}}>
                    <Table stickyHeader onMouseLeave={event => rowHoverHandler(event, -1)}>
                        <TableHead onMouseEnter={event => rowHoverHandler(event, -1)}>
                            <TableRow sx={{ cursor:"pointer" }}>
                                {Lists.get("budgetGoal").map((column:any) => (
                                    <TableCell  align={ column.align }
                                                width={ column.width }
                                                style={{ backgroundColor: '#555', color: 'white' }} 
                                                key={column.id}
                                    >
                                            {column.name}
                                    </TableCell>
                                ))}
                                <TableCell align="center" style={{ backgroundColor: '#555', color: 'white', width:'100px'}} key={Lists.get("budgetGoal").length}>&nbsp;</TableCell>
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
                                            {Lists.get("budgetGoal") && Lists.get("budgetGoal").map((column : any, j:number) => {
                                                let value;
                                                j === 0 ? value = page * size + i+1 : value = decodeId(column.id, row);
                                                return (
                                                    <TableCell align={ column.align } key={j + " - "+ value}>
                                                        { renderSwitch(column.type, value) }
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell align="center" key={Lists.get("budgetGoal").length + " - action"}>
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
export default BudgetItemGoals;