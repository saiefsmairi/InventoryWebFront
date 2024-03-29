import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import userService from '../../../services/userService'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

var testrows = []
var areas = []
var employeesTab = []

const headCells = [
    {
        id: 'employee',
        numeric: false,
        disablePadding: true,
        label: 'Employee',
    },
    {
        id: 'zone',
        numeric: true,
        disablePadding: false,
        label: 'Zone (name)',
    },
    {
        id: 'datedebut',
        numeric: true,
        disablePadding: false,
        label: 'Starting Date ',
    },
    {
        id: 'datefin',
        numeric: true,
        disablePadding: false,
        label: 'Ending Date',
    },
    {
        id: 'etat',
        numeric: true,
        disablePadding: false,
        label: 'Action',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function AffectUsersZone() {
    const userlogged = JSON.parse(localStorage.getItem("user"))
    const AuthStr = 'Bearer '.concat(userlogged.token);
    const [rows, setRows] = React.useState([])
    const [areaselect, setareaselect] = React.useState([])
    const [zonebyArea, setzonebyArea] = React.useState([])
    const [employeesarray, setemployeesarray] = React.useState([])

    const { user } = useSelector(
        (state) => state.auth
    )

    const [data, setData] = useState({
        areaid: "",
        companyid: "",
    });

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('firstName');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openupdateemployee, setopenupdateemployee] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        console.log("wiw1")
        FindZoneByArea()
    }
    const handleClose = () => {
        testrows = []
        setOpen(false);
        getcompanybyadmin()
    };

    const [formData, setFormData] = useState({
        zone: "",
        employee: "",
        Datedebut: "",
        Datefin: "",
        company: ""
    });


    const [companyDetails, setcompanyDetails] = useState([]);
    const [clickedArea, setclickedArea] = React.useState('');


    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        testrows = []
        areas = []
        employeesTab = []
        getcompanybyadmin()
        // findAffectationByCompany() 
    }, [])

    function getcompanybyadmin() {
        axios.get("http://localhost:5000/company/getCompanyByAdmin/" + user._id, { headers: { Authorization: AuthStr } }).then((res) => {
            if (typeof res.data[0] === 'undefined') {
                console.log("no company for this user")
            }
            else {
                console.log(res.data[0])
                setcompanyDetails(res.data[0])
                employeesTab = []

                testrows = []
                res.data[0].employees.forEach(element => {
                    employeesTab.push(element)
                });
                res.data[0].areas.forEach(element => {
                    areas.push(element.area._id)
                });
                setareaselect(areas)
                setemployeesarray(employeesTab)
                FindAreaAndTheirZonesByCompany(res.data[0])
                findAffectationByCompany(res.data[0])

            }

        }).catch(function (error) {
            console.log(error)
        })
    }

    function FindZoneByArea() {
        axios.post("http://localhost:5000/zone/getzonebyarea", { data: areaselect }, { headers: { Authorization: AuthStr } }).then((res) => {
            setzonebyArea(res.data)

        }).catch(function (error) {
            console.log(error)
        })
    }


    function FindAreaAndTheirZonesByCompany(data) {
        axios.get("http://localhost:5000/area/getareaandTheirZoneByCompany/" + data._id, { headers: { Authorization: AuthStr } }).then((res) => {
            res.data.forEach(element => {
            });
            // setareaselect(areas)
        }).catch(function (error) {
            console.log(error)
        })
    }

    function findAffectationByCompany(company) {
        axios.get("http://localhost:5000/affectation/" + company._id, { headers: { Authorization: AuthStr } }).then((res) => {
            console.log(res.data)

            res.data.forEach(element => {
                testrows.push(element)
            });
            setRows(testrows)

        }).catch(function (error) {
            console.log(error)
        })
    }

    const clickaddbutton = async (e) => {
        e.preventDefault();
        formData.Datedebut = Datedebut
        formData.Datefin = Datefin
        formData.zone = zone
        formData.employee = employees
        formData.company = companyDetails._id

        console.log(formData)
        axios.post("http://localhost:5000/affectation/", formData, { headers: { Authorization: AuthStr } }).then(function (res) {
            console.log(res)
            getcompanybyadmin()
            setOpen(false)

        })
            .catch(function (error) {
                console.log(error)

            })

    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    ////////////////////////////////////////////////////////////

    //open update dialog on button click
    const handleCloseupdateemployee = () => {
        setopenupdateemployee(false);

    };

    const handleClickUpdateOpen = (row) => {
        setclickedArea(row)
        setFormData({
            zone: row.zone._id,
            employee: row.employee._id,
            Datedebut: row.Datedebut,
            Datefin: row.Datefin,

        });
        setopenupdateemployee(true);
        FindZoneByArea()
    };


    const clickupdatebutton = async (e) => {
        e.preventDefault();
        if (zone !== 1) {
            formData.zone = zone
        }
        if (employees !== 1) {
            formData.employee = employees
        }
        console.log(formData)


        axios.put("http://localhost:5000/affectation/updateaffectation/" + clickedArea._id, formData, { headers: { Authorization: AuthStr } }).then(function (response) {
            toast.success('Affectation updated successfully !', {
                position: toast.POSITION.TOP_RIGHT
            });
            getcompanybyadmin()
            setopenupdateemployee(false);
        })
            .catch(function (error) {
                console.log(error)
            })
    };

    const handleClickDelete = (row) => {
        axios.delete("http://localhost:5000/affectation/" + row._id, { headers: { Authorization: AuthStr } }).then((res) => {
            console.log(res.data)
            console.log("affectation deleted")
            toast.success('Affectation deleted successfully !', {
                position: toast.POSITION.TOP_RIGHT
            });
            getcompanybyadmin()

        }).catch(function (error) {
            console.log(error)
        })
    };


    //dialogue assign new employee and zone
    const [zone, setzone] = React.useState(1);
    const [employees, setemployee] = React.useState(1);

    const handleChangezone = (event) => {
        setzone(event.target.value);
    };

    const handleChangeEmployee = (event) => {
        setemployee(event.target.value);
    };

    //prob onchange update
    const [Datedebut, setDatedebut] = React.useState(new Date());
    const [Datefin, setDatefin] = React.useState(new Date());

    const handleChangeDatedebut = (newValue) => {
        setDatedebut(newValue.format("YYYY-MM-DD"));
    };
    const handleChangeDatefin = (newValue) => {
        setDatefin(newValue.format("YYYY-MM-DD"));
    };
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>

            <Box sx={{ width: '100%' }}>
                <Button variant="contained" onClick={handleOpen} >Assign Employee to a zone</Button>

                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}

                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row._id}
                                            >
                                                <TableCell padding="checkbox">
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row?.employee.firstName}   {row?.employee.lastName}
                                                </TableCell>
                                                <TableCell align="right">{row.zone?.name}</TableCell>
                                                <TableCell align="right">{row?.Datedebut}</TableCell>
                                                <TableCell align="right">{row?.Datefin}</TableCell>


                                                <TableCell align="right">
                                                    <Button variant="contained" sx={{ mx: '10px' }} onClick={() => handleClickUpdateOpen((row))} >
                                                        Update
                                                    </Button>
                                                    <Button variant="contained" onClick={() => handleClickDelete(row)}>Delete</Button>
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Assign Employee to a zone</DialogTitle>
                    <DialogContent>

                        <InputLabel id="demo-simple-select-label">Zone</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={zone}
                            label="Area"
                            name="zone"
                            onChange={handleChangezone}
                            fullWidth
                        >
                            <MenuItem value={1}> ---</MenuItem>
                            {zonebyArea.map((zone, index) => (
                                <MenuItem value={zone._id}> {zone.name}</MenuItem>
                            ))}
                        </Select>


                        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={employees}
                            name="employee"
                            label="Employee"
                            onChange={handleChangeEmployee}
                            fullWidth
                        >
                            <MenuItem value={1}> ---</MenuItem>
                            {employeesarray.map((e, index) => (
                                <MenuItem value={e.employee._id}> {e.employee.firstName} {e.employee.lastName}</MenuItem>
                            ))}

                        </Select>
                        <br />
                        <br />

                        <DesktopDatePicker
                            label="Date debut"
                            inputFormat="MM/dd/yyyy"
                            value={Datedebut}
                            onChange={handleChangeDatedebut}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <DesktopDatePicker
                            label="Date fin"
                            inputFormat="MM/dd/yyyy"
                            value={Datefin}
                            onChange={handleChangeDatefin}
                            renderInput={(params) => <TextField {...params} />}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={clickaddbutton}>Add</Button>
                    </DialogActions>
                </Dialog>

                <form >
                    <Dialog open={openupdateemployee} onClose={handleCloseupdateemployee}>
                        <DialogTitle>Update employee informations</DialogTitle>
                        <DialogContent>
                            <InputLabel id="demo-simple-select-label">Zone</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={zone}
                                label="Area"
                                onChange={handleChangezone}
                                fullWidth
                            >
                                <MenuItem value={1}> ---</MenuItem>
                                {zonebyArea.map((zone, index) => (
                                    <MenuItem value={zone._id}> {zone.name}</MenuItem>
                                ))}
                            </Select>


                            <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={employees}
                                label="Employee"
                                onChange={handleChangeEmployee}
                                fullWidth
                            >
                                <MenuItem value={1}> ---</MenuItem>
                                {employeesarray.map((e, index) => (
                                    <MenuItem value={e.employee._id}> {e.employee.firstName} {e.employee.lastName}</MenuItem>
                                ))}

                            </Select>
                            <br />
                            <br />

                            <TextField
                                type="date"
                                margin="dense"
                                id="name"
                                name="Datedebut"
                                label="Date debut"
                                variant="standard"
                                onChange={(e) => onChange(e)}
                                defaultValue={clickedArea?.Datedebut}

                            />
                            <TextField
                                type="date"
                                margin="dense"
                                id="name"
                                name="Datefin"
                                label="Date fin"
                                variant="standard"
                                onChange={(e) => onChange(e)}
                                defaultValue={clickedArea?.Datefin}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseupdateemployee}>Cancel</Button>
                            <Button onClick={clickupdatebutton} type="submit" >Update</Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </Box>
            <ToastContainer />
        </LocalizationProvider>

    );
}
