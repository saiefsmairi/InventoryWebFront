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
export default function Myprofil() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>

                <Grid item xs={12} md={8} sm container>
                    <Grid item xs container direction="column" spacing={2}>

                        <Grid item xs container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <h4>USER INFORMATION</h4>
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

                        <Grid item xs container spacing={2}>

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

                        <Grid item xs container spacing={2}>
                            <Grid item xs={12} md={10}>
                                <hr style={{

                                    height: .5,
                                    borderColor: 'rgb(239 238 238)'
                                }} />
                            </Grid>

                        </Grid>
                        <Grid item xs container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <h4>CONTACT INFORMATION</h4>
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <InputLabel style={{
                                    fontWeight: 'bold'
                                }} >Adress</InputLabel>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />
                            </Grid>
                            <Grid item xs={6} md={"auto"}>
                            </Grid>

                        </Grid>

                        <Grid item xs container spacing={2}>

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

                        <Grid item xs container spacing={2}>
                            <Grid item xs={12} md={10}>
                                <hr style={{

                                    height: .5,
                                    borderColor: 'rgb(239 238 238)'
                                }} />
                            </Grid>

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


        </Box>
    );
    ;

}