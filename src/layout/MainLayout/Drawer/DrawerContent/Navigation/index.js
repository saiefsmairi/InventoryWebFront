// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
    let role = JSON.parse(localStorage.getItem("user"))?.role[0]
    console.log(menuItem.items)


    const navGroups = menuItem.items.map((item) => {
        if (role === 'ROLE_ADMIN') {
            switch (item.type) {
                case 'ROLE_ADMIN':
                    return <NavGroup key={item.id} item={item} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">

                        </Typography>
                    );
            }
        }
        else if (role === 'ROLE_ADMIN_COMPANY') {
            switch (item.type) {
                case 'ROLE_ADMIN_COMPANY':
                    return <NavGroup key={item.id} item={item} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">

                        </Typography>
                    );
            }
        }
    });



    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
