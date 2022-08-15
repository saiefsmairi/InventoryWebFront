import { useRef, useState, useEffect } from 'react';
import { io } from "socket.io-client";

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from 'store/reducers/authslice';
import axios from 'axios'

import { deepOrange, deepPurple } from '@mui/material/colors';
// sx styles
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [nbNotif, setnbNotif] = useState(0);
    const [invisible, setInvisible] = useState(false);

    const { user } = useSelector(
        (state) => state.auth
    )
    const AuthStr = 'Bearer '.concat(user.token);
    useEffect(() => {

        axios.get("http://localhost:5000/notification/getnotifbyUser/" + user._id, { headers: { Authorization: AuthStr } }).then((res) => {
            console.log(res.data)
            res.data.notifications.forEach(element => {
                console.log(element.notification)
                setNotifications((prev) => [element.notification, ...prev,]);
            });

        }).catch(function (error) {
            console.log(error)

        })
        const socket = io("http://localhost:4000");
        socket.emit("newUser", user._id);
        socket.on("getNotification", (data) => {
            console.log("+++++++")
            console.log(data)
            setInvisible(invisible);

            setnbNotif(nbNotif + 1)
            console.log(nbNotif)
            setNotifications((prev) => [data, ...prev,]);

        });
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };



    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    return (

        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                disableRipple
                color="secondary"
                sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Badge variant="dot" invisible={invisible} color="primary"  >
                    <BellOutlined />
                </Badge>
            </IconButton>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? -5 : 0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: theme.customShadows.z1,
                                width: '100%',
                                minWidth: 285,
                                maxWidth: 420,
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 285
                                }
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="Notification"
                                    elevation={0}
                                    border={false}
                                    content={false}
                                    secondary={
                                        <IconButton size="small" onClick={handleToggle}>
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List
                                        component="nav"
                                        sx={{
                                            p: 0,
                                            '& .MuiListItemButton-root': {
                                                py: 0.5,
                                                '& .MuiAvatar-root': avatarSX,
                                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                            }
                                        }}
                                    >
                                
                                        {notifications.map((notif, index) => (
                                          notif.state==='new'
                                                ? 
                                            <ListItemButton sx={{backgroundColor:"lightcyan"}} >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        sx={{
                                                            color: 'success.main',
                                                            bgcolor: 'success.lighter'
                                                        }}
                                                    >
                                                        <GiftOutlined />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="h6">
                                                            {notif.text} 
                                                            <Typography component="span" variant="subtitle1">
                                                                {notif.zonename}
                                                            </Typography>{' '}
                                                            by {notif.senderFirstName}  {notif.senderLastName}
                                                        </Typography>
                                                    }
                                                    secondary="2 min ago"
                                                  
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography variant="caption" noWrap>
                                                        3:00 AM
                                                    </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItemButton>
                                                :
                                            <ListItemButton>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        sx={{
                                                            color: 'success.main',
                                                            bgcolor: 'success.lighter'
                                                        }}
                                                    >
                                                        <GiftOutlined />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="h6">
                                                            {notif.text}
                                                            <Typography component="span" variant="subtitle1">
                                                                {notif.zonename}
                                                            </Typography>{' '}
                                                            by {notif.senderFirstName}  {notif.senderLastName}
                                                        </Typography>
                                                    }
                                                    secondary="2 min ago"
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography variant="caption" noWrap>
                                                        3:00 AM
                                                    </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItemButton>
                                        ))}
                                        <Divider />

                                        <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6" color="primary">
                                                        View All
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Notification;
