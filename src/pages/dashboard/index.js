import { useState, useEffect } from 'react';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import Myprofil from './Myprofil';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import ProductsPieData from './ProductsPieData'
// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];
ChartJS.register(ArcElement, Tooltip, Legend);

// ==============================|| DASHBOARD - DEFAULT ||============================== //
var areas = []
var zonesTab = []
export default function DashboardDefault() {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    const [nbEmployee, setnbEmployee] = useState();
    const [scannedNBs, setscannedNB] = useState();
    const [nonscannedNBs, setnonscannedNB] = useState();
    const [zones, setzones] = useState([]);
    const [SelectedZone, setSelectedZone] = useState();

    const { user } = useSelector(
        (state) => state.auth
    )
    const AuthStr = 'Bearer '.concat(user.token);
    var scannedNB = 0
    var nonscannedNB = 0
    function getcompanybyadmin() {
        axios.get("http://localhost:5000/company/getCompanyByAdmin/" + user._id, { headers: { Authorization: AuthStr } }).then((res) => {
            if (typeof res.data[0] === 'undefined') {
                console.log("no company for this user")
            }
            else {
                console.log(res.data[0])
                console.log(res.data[0].employees.length)

                setnbEmployee(res.data[0].employees.length)
                // setcompanyDetails(res.data[0])
                //testrows = []
                res.data[0].areas.forEach(element => {
                    areas.push(element.area._id)
                });
                // setareaselect(areas)
                FindZoneByArea(areas)
            }

        }).catch(function (error) {
            console.log(error)
        })
    }

    //hedhi andha comme input les area w bech trajaa les zones 
    function FindZoneByArea(areastab) {
        zonesTab = []
        axios.post("http://localhost:5000/zone/getzonebyarea", { data: areastab }, { headers: { Authorization: AuthStr } }).then((res) => {
            console.log(res.data)
            res.data.forEach(element => {
                zonesTab.push(element)
                if (element.products.length > 0) {
                    scannedNB = scannedNB + 1
                    setscannedNB(scannedNB)
                }
                else if (element.products.length === 0) {
                    nonscannedNB = nonscannedNB + 1
                    setnonscannedNB(nonscannedNB)
                }
            });
            console.log(zonesTab)

            setzones(zonesTab)
            axios.post("http://localhost:5000/product/CountProductsByZone", { data: res.data }, { headers: { Authorization: AuthStr } }).then((res) => {
            }).catch(function (error) {
                console.log(error)
            })
        }).catch(function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        getcompanybyadmin()
    }, [])

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Products" count="4,42,236" extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Employees" count={nbEmployee} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Zones Scanned" count={scannedNBs} color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Zones None Scanned" count={nonscannedNBs} color="warning" extra="$20,395" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pl: 2 }}>
                        <Myprofil />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>

                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Products Stats</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={0}>
                            {zones.map((z, index) => (

                                <Button
                                    size="small"
                                    onClick={() => setSelectedZone(z)}
                                /*   color={slot === 'month' ? 'primary' : 'secondary'}
                                  variant={slot === 'month' ? 'outlined' : 'text'} */
                                >
                                    {z.name}
                                </Button>
                            ))}

                        </Stack>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    {SelectedZone && <ProductsPieData zone={SelectedZone} />}

                </MainCard>
            </Grid>


        </Grid>
    );
};

