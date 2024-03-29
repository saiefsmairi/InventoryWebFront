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

const headCells = [
    {
        id: 'firstName',
        numeric: false,
        disablePadding: true,
        label: 'Code',
    },
    {
        id: 'lastName',
        numeric: true,
        disablePadding: false,
        label: 'Name',
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

export default function Area() {
    const userlogged = JSON.parse(localStorage.getItem("user"))
    const AuthStr = 'Bearer '.concat(userlogged.token);
    const [rows, setRows] = React.useState([])
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        testrows = []
        setOpen(false);
        getcompanybyadmin()
    };

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        companyid: ""
    });
    const [companyDetails, setcompanyDetails] = useState([]);
    const [clickedArea, setclickedArea] = React.useState('');

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        testrows = []
        getcompanybyadmin()

    }, [])

    function getcompanybyadmin() {
        axios.get("http://localhost:5000/company/getCompanyByAdmin/" + user._id, { headers: { Authorization: AuthStr } }).then((res) => {
            if (typeof res.data[0] === 'undefined') {
                console.log("no company for this user")
            }
            else {
                console.log(res.data[0])
                setcompanyDetails(res.data[0])
                res.data[0].areas?.forEach(element => {
                    testrows.push(element.area)
                });
                setRows(testrows)
            }

        }).catch(function (error) {
            console.log(error)
        })
    }


    const clickaddbutton = async (e) => {
        e.preventDefault();
        // getcompanybyadmin()
        formData.companyid = companyDetails._id
        console.log(formData)
        axios.put("http://localhost:5000/area/", formData, { headers: { Authorization: AuthStr } }).then(function (response) {
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
        axios.put("http://localhost:5000/area/updatearea/" + clickedArea._id, formData, { headers: { Authorization: AuthStr } }).then(function (response) {
            testrows = []
            getcompanybyadmin()
            setopenupdateemployee(false);


        })
            .catch(function (error) {
                console.log(error)


            })

    };

    const handleClickDelete = (row) => {
        data.areaid = row._id;
        data.companyid = companyDetails._id;
        console.log(data)

        axios.put("http://localhost:5000/area/updateCompany/RemoveAreaFromCompany", data, { headers: { Authorization: AuthStr } }).then(function (response) {
            if (response) {
                console.log(response)
                testrows = []
                getcompanybyadmin()

                axios.delete("http://localhost:5000/area/deletearea/" + row._id, { headers: { Authorization: AuthStr } }).then((res) => {
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


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Button variant="contained" onClick={handleOpen} >Add new Area</Button>

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
                                            key={row?._id}
                                        >
                                            <TableCell padding="checkbox">
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row?.code}
                                            </TableCell>
                                            <TableCell align="right">{row?.name}</TableCell>


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
                <DialogTitle>Add new Area</DialogTitle>
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
                        label="Area name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => onChange(e)}

                    />




                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={clickaddbutton}>Add</Button>
                </DialogActions>
            </Dialog>

            <form >
                <Dialog open={openupdateemployee} onClose={handleCloseupdateemployee}>
                    <DialogTitle>Update Area informations</DialogTitle>
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
        </Box>
    );
}
