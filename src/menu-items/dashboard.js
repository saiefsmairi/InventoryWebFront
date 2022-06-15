// assets
import { DashboardOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { ProfileOutlined } from '@ant-design/icons';
import { BarcodeOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UsergroupAddOutlined,
    ProfileOutlined,
    BarcodeOutlined
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
        }
    ]
};

export default dashboard;
