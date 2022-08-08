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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import { DeleteOutlined } from '@ant-design/icons';
import AddCompanyEmployee from './AddCompanyEmployee';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import {
    Alert,
    Snackbar
} from '@mui/material';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import { array } from 'yup';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfListProducts from './PdfListProducts';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,

    p: 4,
};

var testrows = []
var areas = []
var wiw = []

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
const headCells = [
    {
        id: 'code',
        numeric: false,
        disablePadding: true,
        label: 'Code',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Quantity',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Unit Price ',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Zone',
    },
    {
        id: 'employee',
        numeric: true,
        disablePadding: false,
        label: 'Employee',
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

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography

                    variant="h6"
                    id="tableTitle"
                    component="div"
                >

                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteOutlined />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>

                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


//delete dialog



//////////////////

export default function ProductsListe() {
    const [rows, setRows] = useState([])
    const [openNotifUpdateEmployee, setopenNotifUpdateEmployee] = useState(false);
    const [areaselect, setareaselect] = React.useState([])

    const [data, setData] = useState({
        userid: "",
        companyid: "",
    });

    function getcompanybyadmin() {
        axios.get("http://localhost:5000/company/getCompanyByAdmin/" + user._id, { headers: { Authorization: AuthStr } }).then((res) => {
            if (typeof res.data[0] === 'undefined') {
                console.log("no company for this user")
            }
            else {
                console.log(res.data[0])
                setcompanyDetails(res.data[0])
                testrows = []

                res.data[0].areas.forEach(element => {
                    areas.push(element.area._id)
                });
                setareaselect(areas)
                FindZoneByArea(areas)
            }

        }).catch(function (error) {
            console.log(error)
        })
    }

    //hedhi andha comme input les area w bech trajaa les zones 
    function FindZoneByArea(areastab) {
        console.log(areastab)
        axios.post("http://localhost:5000/zone/getzonebyarea", { data: areastab }, { headers: { Authorization: AuthStr } }).then((res) => {
            FindZoneByArea2(res.data)
        }).catch(function (error) {
            console.log(error)
        })
    }

    //hedhi andha comme input les zones w bech trajaa les id des produits 
    function FindZoneByArea2(zones) {
        console.log(zones)
        axios.post("http://localhost:5000/zone/getzonebyarea2", { data: zones }, { headers: { Authorization: AuthStr } }).then((res) => {
            console.log(res.data)
            res.data.forEach(element => {
                element.forEach(x => {
                    FindProductsById(x)
                });
            });

        }).catch(function (error) {
            console.log(error)
        })
    }

    function FindProductsById(x) {
        console.log(x)

        axios.post("http://localhost:5000/product/FindProductsById", { data: x }, { headers: { Authorization: AuthStr } }).then((res) => {
            console.log(res.data)
            wiw.push(res.data[0])
            console.log('wiw', wiw)
            setRows([...wiw])
        }).catch(function (error) {
            console.log(error)
        })

    }

    const [Havecompany, setHavecompany] = useState(true);
    const [companyDetails, setcompanyDetails] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const { user } = useSelector(
        (state) => state.auth
    )
    const AuthStr = 'Bearer '.concat(user.token);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        console.log(property)
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

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        testrows = []
        setOpen(false);
        getcompanybyadmin()
    }

    const handleCloseupdateAlert = () => {
        setopenNotifUpdateEmployee(false)

    }

    useEffect(() => {
        getcompanybyadmin()

    }, [])


    //delete employee section
    const [opendelete, setopendelete] = React.useState(false);
    const [clickedemployee, setclickedemployee] = React.useState('');

    const handleClickOpen1 = (row) => {
        setopendelete(true);
        setclickedemployee(row)
    };

    const handleCloseDelete = (value) => {
        setopendelete(false);

    };

    const handleDeleteMethod = (row) => {
        console.log(clickedemployee)

        data.userid = clickedemployee._id;
        data.companyid = companyDetails._id;
        console.log(data)

        axios.put("http://localhost:5000/company/updateCompany/RemoveEmployeeFromCompany", data, { headers: { Authorization: AuthStr } }).then(function (response) {
            console.log(response)
            testrows = []
            setopendelete(false);

            getcompanybyadmin()

        })
            .catch(function (error) {
                console.log(error)

            })


        axios.delete("http://localhost:5000/users/" + clickedemployee._id, { headers: { Authorization: AuthStr } }).then((res) => {
            console.log(res.data)
            console.log("user deleted")



        }).catch(function (error) {
            console.log(error.response.data)

        })
    };

    //update employee

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        showPassword: false,

    });

    const { firstName, lastName, email, phone, password } = formData;

    const [openupdateemployee, setopenupdateemployee] = React.useState(false);
    const [responseAddEmployetoCompany, setresponseAddEmployetoCompany] = useState('');

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const handleClickopenupdateemployee = (row) => {
        console.log(row)
        setclickedemployee(row)
        setFormData({
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            phone: row.phone,
        });
        setopenupdateemployee(true);
    };

    const handleCloseupdateemployee = () => {
        setopenupdateemployee(false);

    };

    const clickupdatebutton = async (e) => {
        e.preventDefault();
        axios.put("http://localhost:5000/users/updateuser/" + clickedemployee._id, formData, { headers: { Authorization: AuthStr } }).then(function (response) {
            testrows = []
            getcompanybyadmin()
            setopenupdateemployee(false);
            setresponseAddEmployetoCompany("update done")
            setopenNotifUpdateEmployee(true)

        })
            .catch(function (error) {
                console.log(error.response.data.message)
                setresponseAddEmployetoCompany(error.response.data.message)
                setopenNotifUpdateEmployee(true)

            })

    };

    //password EyeOutlined
    const handleClickShowPassword = () => {
        setFormData({
            ...formData,
            showPassword: !formData.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddCompanyEmployee companyDetails={companyDetails}
                    />

                </Box>
            </Modal>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer >
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

                                    const isItemSelected = isSelected(row.firstName);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">

                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.code}
                                            </TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                            <TableCell align="right">{row.price} DT</TableCell>
                                            <TableCell align="right">{row.zone.name}</TableCell>
                                            <TableCell align="right">{row.employee.firstName} {row.employee.lastName}</TableCell>

                                            <TableCell align="right">
                                                <Button variant="contained" onClick={() => handleClickopenupdateemployee(row)} sx={{ mx: '10px' }} >
                                                    Update
                                                </Button>
                                                <Button variant="contained" onClick={() => handleClickOpen1(row)}  >
                                                    Delete
                                                </Button>

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
            <PDFDownloadLink document={<PdfListProducts prods={wiw}/>} fileName="Products">
                <Button variant="contained" sx={{ mx: '10px' }} >
                    Download Products as PDF
                </Button>

            </PDFDownloadLink>
            <Dialog
                open={opendelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this employee ?"}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={handleDeleteMethod} >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <form >
                <Dialog open={openupdateemployee} onClose={handleCloseupdateemployee}>
                    <DialogTitle>Update employee informations</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            name="firstName"
                            fullWidth
                            variant="standard"
                            defaultValue={clickedemployee?.firstName}
                            onChange={(e) => onChange(e)}
                        />
                        <TextField
                            margin="dense"
                            id="lastname"
                            name="lastName"
                            label="LastName"
                            fullWidth
                            variant="standard"
                            defaultValue={clickedemployee?.lastName}
                            onChange={(e) => onChange(e)}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            name="email"
                            fullWidth
                            variant="standard"
                            defaultValue={clickedemployee?.email}
                            onChange={(e) => onChange(e)}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Phone"
                            name="phone"
                            fullWidth
                            variant="standard"
                            defaultValue={clickedemployee?.phone}
                            onChange={(e) => onChange(e)}
                        />


                        <label htmlFor="password">Password</label>
                        <Input
                            id="standard-adornment-password"
                            type={formData.showPassword ? 'text' : 'password'}
                            label="Password"
                            name="password"
                            onChange={(e) => onChange(e)}
                            margin="dense"
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password EyeOutlined"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {formData.showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseupdateemployee}>Cancel</Button>
                        <Button onClick={clickupdatebutton} type="submit" >Update</Button>
                    </DialogActions>
                </Dialog>
            </form>

            <Snackbar open={openNotifUpdateEmployee} autoHideDuration={6000} onClose={handleCloseupdateAlert}>
                <Alert onClose={handleCloseupdateAlert} severity="info" sx={{ width: '100%' }}>
                    {responseAddEmployetoCompany}
                </Alert>
            </Snackbar>

        </Box>
    );
}
