import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { InputLabel } from '@mui/material';
import './DashboardStyle/Myprofil.css';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import MonthlyBarChart from './MonthlyBarChart';
import Button from '@mui/material/Button';
import { getMe, login, reset } from 'store/reducers/authslice';
import { useState, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useRef } from 'react';


// material-ui
import {
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Link,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    Snackbar,

} from '@mui/material';
import { createRef } from 'react';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function Myprofil() {
    const [open, setOpen] = useState(false);
    const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
    const [openEmptyFieldsAlert, setopenEmptyFieldsAlert] = useState(false);

    const [Havecompany, setHavecompany] = useState(true);

    const [companyDetails, setcompanyDetails] = useState();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userLoggedIn, user } = useSelector(
        (state) => state.auth
    )
    const AuthStr = 'Bearer '.concat(user.token);
    const [formData, setFormData] = useState({
        companyname: "",
        companyadress: "",
        city: "",
        country: "",
        postalcode: "",
    });

    function getcompanybyadmin() {
        axios.get("http://localhost:5000/company/getCompanyByAdmin/" + user._id, { headers: { Authorization: AuthStr } }).then((res) => {

            if (typeof res.data[0] === 'undefined') {

                console.log('fi west undefined')
                setHavecompany(false)
            }
            else {
                setHavecompany(true)

                setcompanyDetails(res.data[0])
                console.log(res.data[0])
                setFormData({
                    companyname: res.data[0].companyname,
                    companyadress: res.data[0].companyadress,
                    city: res.data[0].city,
                    country: res.data[0].country,
                    postalcode: res.data[0].postalcode
                });
            }

        }).catch(function (error) {
            console.log(error)

        })
    }

    useEffect(() => {
        console.log(userLoggedIn)
        // dispatch(getMe())
        getcompanybyadmin()

    }, [])



    const { companyname, companyadress, city, country, postalcode, idcompanyadmin } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {

        e.preventDefault();
        if (Havecompany === false) {
            if (!city || !companyadress || !companyname || !country || !postalcode) {
                setopenEmptyFieldsAlert(true)
            }
            else {
                console.log("clicked on add")
                console.log(formData)
                formData.idcompanyadmin = userLoggedIn._id
                axios.post("http://localhost:5000/company", formData).then(function (response) {
                    setOpen(true)

                    console.log(response)
                })
                    .catch(function (error) {
                        console.log(error)
                    })
                getcompanybyadmin()
            }


        }

        if (Havecompany) {
            console.log("clicked on updated")
            console.log(formData)
            console.log(companyDetails)
            axios.put("http://localhost:5000/company/" + companyDetails._id, formData).then(function (response) {
                setOpenUpdateAlert(true)

                console.log(response)
            })
                .catch(function (error) {
                    console.log(error)
                })
        }

    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setOpenUpdateAlert(false);
        setopenEmptyFieldsAlert(false)

    };



    return (
        <Box sx={{ flexGrow: 1 }}>

            {companyDetails || Havecompany === false ?
                <Grid container spacing={2}  >

                    <Grid item xs={12} md={8} sm container>
                        <Grid item xs container direction="column" spacing={2} sx={{
                            boxShadow: 5,
                            borderRadius: '8px',
                            borderColor: '#e6ebf1'
                        }}>

                            <Grid item xs container spacing={2} sx={{ px: 1 }}>
                                <Grid item xs={12} md={12}>
                                    <h4>USER INFORMATIONS</h4>
                                </Grid>
                                <Grid item xs={6} md={5}>
                                    <InputLabel style={{
                                        fontWeight: 'bold'
                                    }} >First Name</InputLabel>
                                    <TextField fullWidth id="outlined-basic" variant="outlined" value={userLoggedIn?.firstName} />
                                </Grid>

                                <Grid item xs={6} md={5}>
                                    <InputLabel style={{
                                        fontWeight: 'bold'
                                    }} >Last Name </InputLabel>
                                    <TextField fullWidth id="outlined-basic" variant="outlined" value={userLoggedIn?.lastName} />
                                </Grid>
                            </Grid>

                            <Grid item xs container spacing={2} sx={{ px: 1 }}>

                                <Grid item xs={6} md={5}>
                                    <InputLabel style={{
                                        fontWeight: 'bold'
                                    }} >Phone Number</InputLabel>
                                    <TextField fullWidth id="outlined-basic" variant="outlined" value={userLoggedIn?.phone} />
                                </Grid>

                                <Grid item xs={6} md={5}>
                                    <InputLabel style={{
                                        fontWeight: 'bold'
                                    }} >Email Adress</InputLabel>
                                    <TextField fullWidth id="outlined-basic" variant="outlined" value={userLoggedIn?.email} />
                                </Grid>




                            </Grid>

                            <Grid item xs container justifyContent="center" alignItems="center" >
                                <Button variant="contained">Update</Button>
                            </Grid>

                            <Grid item xs container spacing={2} sx={{ px: 1 }}>
                                <Grid item xs={12} md={10}>
                                    <hr style={{

                                        height: .5,
                                        borderColor: 'rgb(239 238 238)'
                                    }} />
                                </Grid>
                            </Grid>

                            <form onSubmit={onSubmit}>

                                <Grid xs item container spacing={2} sx={{ px: 1 }}>
                                    <Grid item xs={12} md={12}>
                                        <h4>Company INFORMATIONS</h4>
                                    </Grid>
                                    <Grid item xs={6} md={5} sx={{ px: 1 }}>
                                        <InputLabel style={{
                                            fontWeight: 'bold'
                                        }} >Name</InputLabel>
                                        <TextField fullWidth id="outlined-basic" variant="outlined" name="companyname"
                                            placeholder="companyname"

                                            defaultValue={companyDetails?.companyname}

                                            onChange={(e) => onChange(e)} />
                                    </Grid>

                                    <Grid item xs={6} md={5} sx={{ px: 1 }}>
                                        <InputLabel style={{
                                            fontWeight: 'bold'
                                        }} >Adress</InputLabel>
                                        <TextField fullWidth id="outlined-basic" variant="outlined" name="companyadress"
                                            placeholder="companyadress"
                                            defaultValue={companyDetails?.companyadress}
                                            onChange={(e) => onChange(e)} />
                                    </Grid>

                                    <Grid item xs={6} md={"auto"}>
                                    </Grid>

                                </Grid>

                                <Grid item xs container spacing={2} sx={{ px: 1 }}>

                                    <Grid item xs={4} md={3.3}>
                                        <InputLabel style={{
                                            fontWeight: 'bold'
                                        }} >City</InputLabel>
                                        <TextField fullWidth id="outlined-basic" variant="outlined" name="city"
                                            placeholder="city"
                                            defaultValue={companyDetails?.city}
                                            onChange={(e) => onChange(e)} />

                                    </Grid>
                                    <Grid item xs={4} md={3.3}>
                                        <InputLabel style={{
                                            fontWeight: 'bold'
                                        }} >Country</InputLabel>
                                        <TextField fullWidth id="outlined-basic" variant="outlined" name="country"
                                            placeholder="country"
                                            defaultValue={companyDetails?.country}
                                            onChange={(e) => onChange(e)} />

                                    </Grid>
                                    <Grid item xs={4} md={3.3}>
                                        <InputLabel style={{
                                            fontWeight: 'bold'
                                        }} >Postal code</InputLabel>
                                        <TextField fullWidth id="outlined-basic" variant="outlined" name="postalcode"
                                            placeholder="postalcode"
                                            defaultValue={companyDetails?.postalcode}
                                            onChange={(e) => onChange(e)} />
                                    </Grid>
                                </Grid>
                                <Grid item xs container justifyContent="center" alignItems="center" >

                                </Grid>
                                <Grid item xs container justifyContent="center" alignItems="center" >

                                </Grid>
                                <Grid item xs container justifyContent="center" alignItems="center" sx={{ margin: '20px' }}  >

                                    {Havecompany === false ?
                                        <Button variant="contained" type="submit" >Add Company</Button>
                                        : <Button variant="contained" type="submit" >Update Company</Button>
                                    }

                                </Grid>
                                <Grid item xs container justifyContent="center" alignItems="center" >

                                </Grid>
                            </form>

                        </Grid>
                    </Grid>
                    <Grid item md={4}>
                        <Box sx={{ p: 3, pb: 0 }}>

                            <Typography variant="h6" color="textSecondary">
                                weekly revenue
                            </Typography>
                            <Typography variant="h4">$7,650</Typography>

                        </Box>
                        <MonthlyBarChart />
                    </Grid>
                </Grid>

                : <CircularProgress />
            }


            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    company added successfully
                </Alert>
            </Snackbar>
            <Snackbar open={openUpdateAlert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    company updated successfully
                </Alert>
            </Snackbar>
            <Snackbar open={openEmptyFieldsAlert} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    You have to complete empty fields
                </Alert>
            </Snackbar>

        </Box>
    );
    ;

}