import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,

} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
// project import
import AuthWrapper from '../AuthWrapper';
import AuthLogin from './AuthLogin';
import { useState, forwardRef } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

// ================================|| ForgetPassword ||================================ //

const ForgetPassword = () => {
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Forget password</Typography>

                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                newpassword: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                password: Yup.string().max(255).required('old Password is required'),
                                newpassword: Yup.string().max(255).required('new Password is required')

                            })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    console.log(values)
                                    axios.put("https://inventory-back.onrender.com/users/forgetPassword/test", values).then(function (response) {
                                        console.log(response)
                                        navigate('/login')
                                    })
                                        .catch(function (error) {
                                            console.log(error)
                                            setOpen(true);
                                        })

                                    setStatus({ success: false });
                                    setSubmitting(false);

                                } catch (err) {
                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                                <OutlinedInput
                                                    id="email-login"
                                                    type="email"
                                                    value={values.email}
                                                    name="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter email address"
                                                    fullWidth
                                                    error={Boolean(touched.email && errors.email)}
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="password-login">Old Password</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.password && errors.password)}
                                                    id="-password-login"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
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
                                                    placeholder="Enter password"
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                        {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="password-login">New Password</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.newpassword && errors.newpassword)}
                                                    id="-password-login"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={values.newpassword}
                                                    name="newpassword"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
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
                                                    placeholder="Enter password"
                                                />
                                                {touched.newpassword && errors.newpassword && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                        {errors.newpassword}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
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
                                                    Reset password
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                    </Grid>
                                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                            Invalid credentials
                                        </Alert>
                                    </Snackbar>
                                </form>
                            )}
                        </Formik>
                    </>
                </Grid>
            </Grid>
        </AuthWrapper>
    )

}

export default ForgetPassword;
