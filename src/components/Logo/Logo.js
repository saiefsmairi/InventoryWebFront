// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Mantis" width="100" />
         *
         */
        <>
           <img src="https://e7.pngegg.com/pngimages/695/463/png-clipart-inventory-management-software-zoho-office-suite-inventory-turnover-others-miscellaneous-angle.png" alt="Mantis" width="100" />
        </>
    );
};

export default Logo;
