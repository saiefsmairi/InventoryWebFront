// assets
import { DashboardOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { ProfileOutlined } from '@ant-design/icons';
import { BarcodeOutlined } from '@ant-design/icons';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { ReconciliationOutlined } from '@ant-design/icons';
import { UserSwitchOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UsergroupAddOutlined,
    ProfileOutlined,
    BarcodeOutlined,
    AppstoreAddOutlined,
    ReconciliationOutlined,
    UserSwitchOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'myprofil',
            title: 'My profil',
            type: 'item',
            url: '/myprofil',
            icon: icons.ProfileOutlined,
            breadcrumbs: true
        },
        {
            id: 'usersAdmin',
            title: 'Manage users (admin)',
            type: 'item',
            url: '/users',
            icon: icons.UsergroupAddOutlined,
            breadcrumbs: true
        },
        {
            id: 'companyusers',
            title: 'Manage Company employees ',
            type: 'item',
            url: '/companyemployees',
            icon: icons.UsergroupAddOutlined,
            breadcrumbs: true
        },
        {
            id: 'products',
            title: 'Products',
            type: 'item',
            url: '/products',
            icon: icons.BarcodeOutlined,
            breadcrumbs: true
        },
        
        {
            id: 'affectuserszone',
            title: 'Assign Employees to Zone',
            type: 'item',
            url: '/affectuserszone',
            icon: icons.UserSwitchOutlined,
            breadcrumbs: true
        },
        {
            id: 'area',
            title: 'Area',
            type: 'item',
            url: '/area',
            icon: icons.AppstoreAddOutlined,
            breadcrumbs: true
        },
        {
            id: 'zone',
            title: 'Zone',
            type: 'item',
            url: '/zone',
            icon: icons.ReconciliationOutlined,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
