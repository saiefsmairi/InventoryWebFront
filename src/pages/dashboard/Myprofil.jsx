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

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { havePermission, isError } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        dispatch(getMe())
        if (isError) {
            setOpen(true);
        }

    }, [isError, dispatch, havePermission])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
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
                                <TextField fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>

                            <Grid item xs={6} md={5}>
                                <InputLabel style={{
                                    fontWeight: 'bold'
                                }} >Last Name</InputLabel>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>
                        </Grid>

                        <Grid item xs container spacing={2} sx={{ px: 1 }}>

                            <Grid item xs={6} md={5}>
                                <InputLabel style={{
                                    fontWeight: 'bold'
                                }} >Phone Number</InputLabel>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>

                            <Grid item xs={6} md={5}>
                                <InputLabel style={{
                                    fontWeight: 'bold'
                                }} >Email Adress</InputLabel>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />
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
                        <Grid item xs container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <h4>Company INFORMATIONS</h4>
                            </Grid>
                            <Grid item xs={6} md={5} sx={{ px: 1 }}>
                                <InputLabel style={{
                                    fontWeight: 'bold'
                                }} >Name</InputLabel>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>

                            <Grid item xs={6} md={5} sx={{ px: 1 }}>
                                <InputLabel style={{
                                    fontWeight: 'bold'
                                }} >Adress</InputLabel>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>

                            <Grid item xs={6} md={"auto"}>
                            </Grid>

                        </Grid>

                        <Grid item xs container spacing={2} sx={{ px: 1 }}>

                            <Grid item xs={4} md={3.3}>
                                <InputLabel style={{
                                    fontWeight: 'bold'
                                }} >City</InputLabel>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />

                            </Grid>
                            <Grid item xs={4} md={3.3}>
                                <InputLabel style={{
                                    fontWeight: 'bold'
                                }} >Country</InputLabel>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />

                            </Grid>
                            <Grid item xs={4} md={3.3}>
                                <InputLabel style={{
                                    fontWeight: 'bold'
                                }} >Postal code</InputLabel>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid item xs container justifyContent="center" alignItems="center" >

                        </Grid>
                        <Grid item xs container justifyContent="center" alignItems="center" >

                        </Grid>
                        <Grid item xs container justifyContent="center" alignItems="center" >
                            <Button variant="contained">Add Company</Button>
                        </Grid>
                        <Grid item xs container justifyContent="center" alignItems="center" >

                        </Grid>

                    </Grid>
                </Grid>
                <Grid item md={4}>
                    <Box sx={{ p: 3, pb: 0 }}>

                        <Typography variant="h6" color="textSecondary">
                            This Week Statistics
                        </Typography>
                        <Typography variant="h4">$7,650</Typography>

                    </Box>
                    <MonthlyBarChart />
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    You dont have the permission
                </Alert>
            </Snackbar>

        </Box>
    );
    ;

}