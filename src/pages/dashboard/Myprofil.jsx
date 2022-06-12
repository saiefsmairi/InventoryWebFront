import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { InputLabel } from '@mui/material';
import './DashboardStyle/Myprofil.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Myprofil() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} direction="column">
                <Grid item xs={12} md={12}>
                    <h3>User information</h3>
                </Grid>

                <Grid item xs container spacing={2}>

                    <Grid item xs={6} md={3}>
                        <InputLabel style={{
                            fontWeight: 'bold'
                        }} >First Name</InputLabel>
                        <TextField fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                    <Grid item xs={6} md={"auto"}>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <InputLabel style={{
                            fontWeight: 'bold'
                        }} >Last Name</InputLabel>
                        <TextField fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                </Grid>

                <Grid item xs container spacing={2}>

                    <Grid item xs={6} md={3}>
                        <InputLabel style={{
                            fontWeight: 'bold'
                        }} >Phone Number</InputLabel>
                        <TextField fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid item xs={6} md={"auto"}>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <InputLabel style={{
                            fontWeight: 'bold'
                        }} >Email Adress</InputLabel>
                        <TextField fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                </Grid>

                <Grid item xs container spacing={2}>

                    <Grid item xs={6} md={6}>

                        <hr style={{

                            height: .5,
                            borderColor: 'rgb(239 238 238)'
                        }} />


                    </Grid>

                </Grid>


            </Grid>

            <Grid container spacing={2} direction="column">
                <Grid item xs={12} md={12}>
                    <h3>Contact information</h3>
                </Grid>

                <Grid item xs container spacing={2}>

                
                
                    <Grid item xs={6} md={6}>
                        <InputLabel style={{
                            fontWeight: 'bold'
                        }} >Adress</InputLabel>
                        <TextField fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                </Grid>

                <Grid item xs container spacing={2}>

                    <Grid item xs={2} md={2}>
                        <InputLabel style={{
                            fontWeight: 'bold'
                        }} >City</InputLabel>
                        <TextField fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid item xs={2} md={2}>
                        <InputLabel style={{
                            fontWeight: 'bold'
                        }} >Country</InputLabel>
                        <TextField fullWidth id="outlined-basic" variant="outlined" />

                    </Grid>
                    <Grid item xs={2} md={2}>
                        <InputLabel style={{
                            fontWeight: 'bold'
                        }} >Postal code</InputLabel>
                        <TextField fullWidth id="outlined-basic" variant="outlined" />
                    </Grid>
                </Grid>

                <Grid item xs container spacing={2}>

                    <Grid item xs={6} md={6}>

                        <hr style={{

                            height: .5,
                            borderColor: 'rgb(239 238 238)'
                        }} />


                    </Grid>

                </Grid>


            </Grid>


        </Box>
    );
    ;

}