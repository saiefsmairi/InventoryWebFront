import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import AnimateButton from 'components/@extended/AnimateButton';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


// material-ui
import {

    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Snackbar
} from '@mui/material';


function AddCompanyEmployee({ companyDetails }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message, userLoggedIn } = useSelector(
        (state) => state.auth
    )

    const [open, setOpen] = useState(false);
    const [openNotifAddEmployee, setopenNotifAddEmployee] = useState(false);
    const [responseAddEmployetoCompany, setresponseAddEmployetoCompany] = useState('');

    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        userid: "",
        companyid: "",
    });


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        console.log(companyDetails)
        changePassword('');
    }, []);

    const handleClose = (event, reason) => {
        console.log("lol")
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setopenNotifAddEmployee(false)

    };


    useEffect(() => {
        console.log("++++++++")

        if (isError) {

            console.log(message)
        }

        /*    if (isSuccess || user) {
               navigate('/login')
           } */
        //   dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])


    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                role: '',
                company: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().max(255).required('First Name is required'),
                lastName: Yup.string().max(255).required('Last Name is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required'),
                phone: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits").min(8, 'Must be exactly 8 digits'),

            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    setStatus({ success: false });
                    values.role = 'ROLE_EMPLOYEE'
                    console.log(values.role)
                    setSubmitting(false);
                    setOpen(false);

                    axios.post("https://inventory-back.onrender.com/users", values).then(function (response) {
                        console.log(response.data._id)
                        data.userid = response.data._id;
                        data.companyid = companyDetails._id;
                        console.log(data)

                        axios.put("https://inventory-back.onrender.com/company/updateCompany/AddEmployees", data).then(function (response) {

                            console.log(response)
                            setresponseAddEmployetoCompany(response.data.message)
                            setopenNotifAddEmployee(true)
                        })
                            .catch(function (error) {
                                console.log(error)
                                setresponseAddEmployetoCompany(response.data.message)
                                setopenNotifAddEmployee(true)

                            })


                    })
                        .catch(function (error) {
                            setOpen(true)
                            console.log(error)

                        })


                } catch (err) {
                    console.log("+++")
                    console.log(err.message)
                    console.error(err);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="firstName-signup">First Name*</InputLabel>
                                <OutlinedInput
                                    id="firstName-login"
                                    type="firstName"
                                    value={values.firstName}
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="John"
                                    fullWidth
                                    error={Boolean(touched.firstName && errors.firstName)}
                                />
                                {touched.firstName && errors.firstName && (
                                    <FormHelperText error id="helper-text-firstName-signup">
                                        {errors.firstName}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastName-signup">Last Name*</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    id="lastName-signup"
                                    type="lastName"
                                    value={values.lastName}
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    inputProps={{}}
                                />
                                {touched.lastName && errors.lastName && (
                                    <FormHelperText error id="helper-text-lastName-signup">
                                        {errors.lastName}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="phone-signup">Phone</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.phone && errors.phone)}
                                    id="phone-signup"
                                    value={values.phone}
                                    name="phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="example : 29162035"
                                    inputProps={{}}
                                />
                                {touched.phone && errors.phone && (
                                    <FormHelperText error id="helper-text-phone-signup">
                                        {errors.phone}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    id="email-login"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="demo@phone.com"
                                    inputProps={{}}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="helper-text-email-signup">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="password-signup">Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    id="password-signup"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        changePassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="******"
                                    inputProps={{}}
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText error id="helper-text-password-signup">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </Stack>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                            {level?.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </Grid>

                        {errors.submit && (
                            <Grid item xs={12}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"

                                >
                                    Create Account
                                </Button>
                            </AnimateButton>
                        </Grid>


                    </Grid>

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            User with this email already exists
                        </Alert>
                    </Snackbar>

                    <Snackbar open={openNotifAddEmployee} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {responseAddEmployetoCompany}
                        </Alert>
                    </Snackbar>
                </form>
            )}
        </Formik>
    )
}

export default AddCompanyEmployee