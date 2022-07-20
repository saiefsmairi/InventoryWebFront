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
import { ArrowUpOutlined } from '@ant-design/icons';
import { ArrowDownOutlined } from '@ant-design/icons';
import Collapse from '@mui/material/Collapse';

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

const headCells = [
    {
        id: 'firstName',
        numeric: false,
        disablePadding: true,
        label: 'Code',
    },
    {
        id: 'lastName',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },

    {
        id: 'area',
        numeric: true,
        disablePadding: false,
        label: 'Area',
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

export default function Zone() {
    const userlogged = JSON.parse(localStorage.getItem("user"))
    const AuthStr = 'Bearer '.concat(userlogged.token);
    const [rows, setRows] = React.useState([])
    const [areaRows, setareaRows] = React.useState([])


    const { user } = useSelector(
        (state) => state.auth
    )

    const [dataToDelete, setdataToDelete] = useState({
        zoneid: "",
        companyid: "",
        areaid:""
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
    }
    const handleClose = () => {
        testrows = []

        setOpen(false);
        getcompanybyadmin()
    };

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        areaid: ""
    });
    const [companyDetails, setcompanyDetails] = useState([]);
    const [clickedArea, setclickedArea] = React.useState('');

    const [area, setarea] = React.useState('');
    const handleChange = (event) => {
        setarea(event.target.value);
    };

    const { code, name } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        testrows = []
        getcompanybyadmin()
    }, [])

    async function getcompanybyadmin() {
        axios.get("http://localhost:5000/company/getCompanyByAdmin/" + user._id, { headers: { Authorization: AuthStr } }).then((res) => {
            if (typeof res.data[0] === 'undefined') {
                console.log("no company for this user")
            }
            else {
                console.log(res.data[0])
                setcompanyDetails(res.data[0])
                res.data[0].areas.forEach(element => {
                    areas.push(element.area)
                });
                setareaRows(area)
                FindAreaAndTheirZonesByCompany(res.data[0])
            }

        }).catch(function (error) {
            console.log(error)
        })
    }

    function FindAreaAndTheirZonesByCompany(data) {
        axios.get("http://localhost:5000/area/getareaandTheirZoneByCompany/" + data._id, { headers: { Authorization: AuthStr } }).then((res) => {
            console.log(res.data)
            res.data.forEach(element => {

                testrows.push(element)
            });
            setRows(testrows)
            /*      res.data.forEach(element => {
                   element.zones.forEach(x => {
                    console.log(x)
                    testrows.push(x)
    
                 }); 
                });  */

        }).catch(function (error) {
            console.log(error)
        })
    }



    const clickaddbutton = async (e) => {
        e.preventDefault();
        formData.areaid = area
        axios.put("http://localhost:5000/zone/", formData, { headers: { Authorization: AuthStr } }).then(function (response) {
            testrows = []
            getcompanybyadmin()
            setOpen(false);

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
            code: row.code,
            name: row.name,
        }); 
        setopenupdateemployee(true);


    };


    const clickupdatebutton = async (e) => {
        e.preventDefault();
        console.log(formData)

        console.log("clicked on update")
         axios.put("http://localhost:5000/zone/updatezone/" + clickedArea._id, formData, { headers: { Authorization: AuthStr } }).then(function (response) {
            testrows = []
            getcompanybyadmin()
            setopenupdateemployee(false);
        })
            .catch(function (error) {
                console.log(error)
            })
 
    };

    const handleClickDelete = (row) => {
        console.log(row)
        dataToDelete.zoneid = row._id;
        dataToDelete.companyid = companyDetails._id;
        dataToDelete.areaid = row.area;

        axios.put("http://localhost:5000/zone/updateZone/RemoveZoneFromArea", dataToDelete, { headers: { Authorization: AuthStr } }).then(function (response) {
            if (response) {
                console.log(response)
                testrows = []
                getcompanybyadmin()

                axios.delete("http://localhost:5000/zone/deletezone/" + row._id, { headers: { Authorization: AuthStr } }).then((res) => {
                    console.log(res.data)
                    console.log("area deleted")
                    getcompanybyadmin()

                }).catch(function (error) {
                    console.log(error.response.data)

                }) 
            }

        })
            .catch(function (error) {
                console.log(error)

            })
    };


    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        return (

            <React.Fragment>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.code}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Zones
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Zone code</TableCell>
                                            <TableCell>Zone name</TableCell>
                                            <TableCell>Actions</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.zones?.map((historyRow) => (
                                            <TableRow key={historyRow._id}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.zone?.code}
                                                </TableCell>
                                                <TableCell>{historyRow.zone?.name}</TableCell>
                                                <TableCell><Button variant="contained" sx={{ mx: '10px' }} onClick={() => handleClickUpdateOpen((historyRow.zone))}>Update</Button>
                                                    <Button variant="contained" onClick={() => handleClickDelete(historyRow.zone)}>Delete</Button>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            calories: PropTypes.number.isRequired,
            carbs: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                    amount: PropTypes.number.isRequired,
                    customerId: PropTypes.string.isRequired,
                    date: PropTypes.string.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            protein: PropTypes.number.isRequired,
        }).isRequired,
    };



    return (
        <TableContainer component={Paper}>
            <Button variant="contained" onClick={handleOpen} >Add new Zone</Button>

            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Area code</TableCell>
                        <TableCell align="right">Area name</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new Zone</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="code"
                        name="code"
                        fullWidth
                        variant="standard"
                        onChange={(e) => onChange(e)}

                    />
                    <TextField
                        margin="dense"
                        id="name"
                        name="name"
                        label="Zone name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => onChange(e)}

                    />

                    <InputLabel id="demo-simple-select-label">Area</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={area}
                        label="Area"
                        onChange={handleChange}
                        fullWidth
                    >
                        {areas.map((area, index) => (

                            <MenuItem value={area._id}> {area.name}</MenuItem>
                        ))}
                    </Select>


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
                        <TextField
                            margin="dense"
                            id="name"
                            label="code"
                            name="code"
                            fullWidth
                            variant="standard"
                            onChange={(e) => onChange(e)}
                            defaultValue={clickedArea?.code}

                        />
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Area name"
                            fullWidth
                            variant="standard"
                            onChange={(e) => onChange(e)}
                            defaultValue={clickedArea?.name}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseupdateemployee}>Cancel</Button>
                        <Button onClick={clickupdatebutton} type="submit" >Update</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </TableContainer>
    );
}
